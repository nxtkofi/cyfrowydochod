import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccessPage from "./pages/AccessPage";
import OfferPage from "./pages/OfferPage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";
import BillingPage from "./pages/Profile/BillingPage";
import OrdersPage from "./pages/Profile/OrdersPage";
import SupportPage from "./pages/Profile/SupportPage";
import SettingsPage from "./pages/Profile/SettingsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./helpers/requireAuth";
import AdminPage from "./pages/Profile/AdminPage";
import UnauthPage from "./pages/UnauthPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/access" element={<AccessPage />} />
          <Route path="/offer" element={<OfferPage />} />
          <Route
            element={<RequireAuth allowedRoles={["commonUser", "admin"]} />}
          >
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/billing" element={<BillingPage />} />
            <Route path="/profile/orders" element={<OrdersPage />} />
            <Route path="/profile/settings" element={<SettingsPage />} />
            <Route path="/profile/support" element={<SupportPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/profile/adminpanel" element={<AdminPage />} />
          </Route>
          <Route path="/unauthorized" element={<UnauthPage/> }/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
