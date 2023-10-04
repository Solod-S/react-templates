import { Outlet } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import { useState } from 'react'

import { FooterBar, AppBar } from '../index'
import { Box } from '../Box/Box'
// import Loader from 'components/FooterBar/Loader';

export default function SharedLayout() {
  const [totalHeight, setTotalHeight] = useState('calc(100vh - 20%)') // Изначально установите высоту как 20%

  useEffect(() => {
    const footerBarHeight = document.querySelector('.footer-bar').clientHeight
    const appBarHeight = document.querySelector('.header').clientHeight
    const total = footerBarHeight + appBarHeight + 2
    setTotalHeight(`calc(100vh - ${total}px)`)
  }, [])

  return (
    <>
      <AppBar />
      <Suspense
      // fallback={<Loader />}
      >
        <Box style={{ minHeight: totalHeight }}>
          <Outlet />
        </Box>
      </Suspense>
      <FooterBar />
    </>
  )
}
