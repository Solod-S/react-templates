import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import { FooterBar, AppBar } from "../index";
import { Box } from "../Box/Box";
// import Loader from 'components/FooterBar/Loader';

export default function SharedLayout() {
  return (
    <>
      <AppBar />
      <Suspense
      // fallback={<Loader />}
      >
        <Box minHeight="60vh">
          <Outlet />
        </Box>
      </Suspense>
      <FooterBar />
    </>
  );
}
