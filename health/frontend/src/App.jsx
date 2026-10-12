import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./Public_Layout";
import EmployeeLayout from "./Employee_Layout";
import ScrollToTop from "./ScrollTop";
import TokenVerifier from "./components/common_components/Token_verifier_Wrapper";

import LandingPage from "./components/middle/public/Landing_page";
import PrivacyPolicy from "./components/middle/public/Privacy_policy";
import TermsOfService from "./components/middle/public/Terms_of_service";
import TCPA from "./components/middle/public/TCPA";
import GeoRestriction from "./components/middle/public/GeoRestriction";

import Login from "./components/middle/employee/Login";
import Home from "./components/middle/employee/home/Home";

function App() {
  return (
    <BrowserRouter>
      {/* 🔽 Scroll reset on every route change */}
      <ScrollToTop />

      <Routes>
        {/* GEO RESTRICTED PUBLIC ROUTES */}
        {/* <Route element={<GeoRestriction />}> */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="tcpa" element={<TCPA />} />
          </Route>
        {/* </Route> */}

        {/* EMPLOYEE LOGIN (NO GEO CHECK) */}
        <Route path="/employee/login" element={<Login />} />
        {/* EMPLOYEE ROUTES (TOKEN PROTECTED) */}
        <Route path="/employee" element={<TokenVerifier />}>
          <Route element={<EmployeeLayout />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
