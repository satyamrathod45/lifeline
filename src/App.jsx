import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SearchDonor from "./pages/SearchDonor"
import BecomeDonor from "./pages/BecomeDonor"
import RequestDonor from "./components/RequestDonor"
import RequestInfo from "./pages/RequestInfo"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Footer from "./components/Footer"
import RequestsDashboard from "./components/EmergencyRequest"

/* =========================
   PAGE WRAPPER (INLINE)
========================= */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  )
}

function App() {

  const location = useLocation()

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register"

  return (

    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Navbar */}
      {!hideLayout && <Navbar />}

      {/* 🔥 ANIMATED ROUTES */}
      <AnimatePresence mode="wait">

        <Routes location={location} key={location.pathname}>

          {/* Public Routes */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />

          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />

          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />

          <Route path="/search" element={<PageWrapper><SearchDonor /></PageWrapper>} />

          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />

          {/* Protected Routes */}
          <Route
            path="/become-donor"
            element={
              <ProtectedRoute>
                <PageWrapper><BecomeDonor /></PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <PageWrapper><RequestsDashboard /></PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/request/:id"
            element={
              <ProtectedRoute>
                <PageWrapper><RequestInfo /></PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/request"
            element={
              <ProtectedRoute>
                <PageWrapper><RequestDonor /></PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageWrapper><Dashboard /></PageWrapper>
              </ProtectedRoute>
            }
          />

        </Routes>

      </AnimatePresence>

      {/* Footer */}
      {!hideLayout && <Footer />}

    </div>
  )
}

export default App