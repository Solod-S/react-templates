import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const apiKey = process.env.REACT_APP_API_KEY

const firebaseConfig = {
  apiKey,
  authDomain: 'fir-login-5cb73.firebaseapp.com',
  projectId: 'fir-login-5cb73',
  storageBucket: 'fir-login-5cb73.appspot.com',
  messagingSenderId: '836565124543',
  appId: '1:836565124543:web:b5d6acfadc949a45c9cd0a',
}

const app = initializeApp(firebaseConfig)
const fsbase = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage = getStorage(app)

export { auth, provider, storage, fsbase }
