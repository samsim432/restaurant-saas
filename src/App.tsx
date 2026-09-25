import { BrowserRouter, Routes, Route } from "react-router-dom";

// Marketing
import Home from "./pages/marketing/Home";
import Features from "./pages/marketing/Features";
import Pricing from "./pages/marketing/Pricing";
import About from "./pages/marketing/About";
import Contact from "./pages/marketing/Contact";
import GetStarted from "./pages/marketing/GetStarted";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Onboarding
import Onboarding from "./pages/onboarding/Onboarding";

// Owner pages
import Dashboard from "./pages/owner/Dashboard";
import Orders from "./pages/owner/Orders";
import Tables from "./pages/owner/Tables";
import Menu from "./pages/owner/Menu";
import Payments from "./pages/owner/Payments";
import Staff from "./pages/owner/Staff";
import Reports from "./pages/owner/Reports";

// Application layout
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
          RestaurantOS
        </p>

        <h1 className="mt-3 text-4xl font-bold text-[#17211D]">
          {title}
        </h1>

        <p className="mt-3 text-gray-600">
          This page is coming in the next phase.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================================
            MARKETING
        ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/features"
          element={<Features />}
        />

        <Route
          path="/pricing"
          element={<Pricing />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/get-started"
          element={<GetStarted />}
        />

        {/* =========================================
            AUTHENTICATION
        ========================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={
            <Placeholder title="Forgot Password" />
          }
        />

        {/* =========================================
            ONBOARDING
        ========================================= */}

        <Route
          path="/onboarding"
          element={<Onboarding />}
        />

        {/* =========================================
            OWNER APPLICATION
        ========================================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/dashboard/orders"
          element={<Orders />}
        />

        <Route
          path="/dashboard/tables"
          element={<Tables />}
        />

        <Route
          path="/dashboard/menu"
          element={<Menu />}
        />

        <Route
          path="/dashboard/payments"
          element={<Payments />}
        />
        <Route
    path="/dashboard/settings"
    element={
      <AppLayout>
        <Placeholder title="Settings" />
      </AppLayout>
    }
  />

        <Route
          path="/dashboard/staff"
          element={<Staff />}
        />

        <Route
          path="/dashboard/reports"
          element={<Reports />}
        />

        <Route
          path="/dashboard/settings"
          element={
            <AppLayout>
              <Placeholder title="Settings" />
            </AppLayout>
          }
        />

        {/* =========================================
            404
        ========================================= */}

        <Route
          path="*"
          element={
            <Placeholder title="404 — Page Not Found" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;