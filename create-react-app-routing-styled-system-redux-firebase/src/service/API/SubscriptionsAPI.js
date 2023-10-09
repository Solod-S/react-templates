import { fsbase } from 'fBase/fBase'
import { collection, getDocs } from 'firebase/firestore'

async function fetchSubscription() {
  try {
    const querySnapshot = await getDocs(collection(fsbase, 'subscriptions'))
    const subscriptionData = querySnapshot.docs.map(doc => doc.data())

    return subscriptionData
  } catch (error) {
    throw new Error('Failed to fetch subscription')
  }
}

export { fetchSubscription }
