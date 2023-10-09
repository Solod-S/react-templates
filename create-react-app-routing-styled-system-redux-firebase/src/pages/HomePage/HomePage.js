import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSubscription } from 'redux/appData/appDataOperation'
import { getAppData } from 'redux/appData/appDataSelectors'

const HomePage = () => {
  const dispatch = useDispatch()
  const { subscriptions } = useSelector(getAppData)
  const [subscriptionTypes, setsubScriptionTypes] = useState([])

  useEffect(() => {
    dispatch(fetchSubscription())
    setsubScriptionTypes(subscriptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  useEffect(() => {
    setsubScriptionTypes(subscriptions)
  }, [subscriptions])
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          {subscriptionTypes &&
            subscriptionTypes.length > 0 &&
            subscriptionTypes.map((s, i) => <p key={i}>{s.type}</p>)}
        </div>
      </div>
    </section>
  )
}
export default HomePage
