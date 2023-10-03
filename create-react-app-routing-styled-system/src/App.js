import { Route, Routes, Navigate } from "react-router-dom";

import { SharedLayout } from "./components";

function App() {
  return (
    <>
      <Routes>
        <Route end path="/" element={<SharedLayout />}>
          <Route index element={<div>!!!</div>} />
          {/* <Route index element={<HomePage />} /> */}
          {/* <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:portfolioId" element={<PortfolioDetails />} />
          <Route path="contacts" element={<ContactPage />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
