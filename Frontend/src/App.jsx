import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import HomepageLayout from "./Homepage/HomepageLayout.jsx";
import Navbar from "./Homepage/Navbar.jsx";
import Footer from "./Homepage/Footer.jsx";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import { useAuth } from "./context/AuthContext.jsx";

import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import Users from "./admin/Users.jsx";
import AdminEnquiries from "./admin/AdminEnquiries.jsx";

import Enquiry from "./pages/Enquiry.jsx";
import Terms from "./components/Terms.jsx";
import Privacy from "./components/Privacy.jsx";
import About from "./components/About.jsx";
import ProductCatalog from "./pages/ProductCatalog.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Services from "./pages/Services.jsx";
import SourcingSolutions from "./pages/SourcingSolutions.jsx";
import Resources from "./pages/Resources.jsx";
import Contact from "./pages/Contact.jsx";
import ScrollManager from "./components/ScrollManager.jsx";

// Shared layout
function MainLayout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app-layout">
      {!hideNavbar && <Navbar />}

      <main className="app-main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  // Return users to the page that required login.
  const redirectTo = location.state?.from?.pathname || "/";
  const redirectState = location.state?.from?.state;

  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<MainLayout />}>

          {/* Public Pages */}
          <Route path="/" element={<HomepageLayout />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sourcing-solutions" element={<SourcingSolutions />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />

          {/* Enquiry forms are viewable without an account; submitting requires login. */}
          <Route path="/enquiry" element={<Enquiry />} />

          {/* Login */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to={redirectTo} state={redirectState} replace />
              ) : (
                <Login />
              )
            }
          />

          {/* Register */}
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to={redirectTo} state={redirectState} replace />
              ) : (
                <Register />
              )
            }
          />

          {/* Forgot Password */}
          <Route
            path="/forgot-password"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <ForgotPassword />
              )
            }
          />

          {/* Reset Password (opened from the email link) */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
          </Route>

        </Route>

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}