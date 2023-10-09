import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'

import { signInWithPopup } from 'firebase/auth'
import { auth, provider, fsbase } from '../../fBase/fBase'

async function logIn({ email, password }) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    console.log(user)
    const userDoc = await findUserByEmail(email)
    const userData = userDoc.data()

    return userData
  } catch (error) {
    throw Error(error)
  }
}

async function registrationByEmail({ email, password }) {
  try {
    return await handleNewUser(email, password)
  } catch (error) {
    throw new Error(error)
  }
}

async function googleLogIn() {
  try {
    const { user } = await signInWithPopup(auth, provider)
    const { email, displayName, photoURL, uid } = user
    const userDoc = await findUserByEmail(email)
    if (userDoc) {
      let userData = userDoc.data()
      return userData
    } else {
      return await handleNewUser(email, '123456', photoURL, displayName, uid)
    }
  } catch (error) {
    console.error('Failed to log in:', error.message)
    throw error
  }
}

async function logOut() {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error('Failed to log out')
  }
}

async function findUserByEmail(email) {
  try {
    const usersCollection = collection(fsbase, 'users')
    const q = query(usersCollection, where('email', '==', email))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0]
    } else {
      return null
    }
  } catch (error) {
    throw new Error(error)
  }
}

async function handleNewUser(email, password, userPhotoURL, name, uid) {
  if (uid) {
    const newUser = {
      owner_uid: uid,
      email: email,
      displayName: name ? name : '',
      photoURL: userPhotoURL,
      subscription: 'Free',
      gender: 'Other',
    }

    await addDoc(collection(fsbase, 'users'), newUser)

    return newUser
  } else {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    const { user } = userCredential

    await updateProfile(user, {
      photoURL: userPhotoURL ? userPhotoURL : null,
      displayName: name ? name : '',
    })

    const { uid, displayName, photoURL } = user

    const newUser = {
      owner_uid: uid,
      email: email,
      displayName: displayName ? displayName : '',
      photoURL,
      subscription: 'Free',
      gender: 'Other',
    }

    await addDoc(collection(fsbase, 'users'), newUser)

    return newUser
  }
}
export { logIn, logOut, googleLogIn, registrationByEmail }
