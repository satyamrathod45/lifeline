import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SearchDonor from "./pages/SearchDonor"
import BecomeDonor from "./pages/BecomeDonor"
import RequestDonor from "./components/RequestDonor"
// import RequestInfo from "./pages/RequestInfo"
import RequestInfo from "./pages/RequestInfo"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Footer from "./components/Footer"
import RequestsDashboard from "./components/EmergencyRequest"
import { useLocation } from "react-router-dom"

function App() {

  const location = useLocation()

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register"

  return (

    <div className="min-h-screen bg-gray-50">

      {!hideLayout && <Navbar />}

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/become-donor" element={
          <ProtectedRoute><BecomeDonor/></ProtectedRoute>
        }/>

        <Route path="/search" element={<SearchDonor />} />

        <Route path="/requests" element={
          <ProtectedRoute><RequestsDashboard/></ProtectedRoute>
        }/>

        <Route path="/request/:id" element={
          <ProtectedRoute><RequestInfo/></ProtectedRoute>
        }/>

        <Route path="/about" element={<About />} />

        {/* Protected */}
        <Route path="/request" element={
          <ProtectedRoute><RequestDonor /></ProtectedRoute>
        }/>

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        }/>

      </Routes>

      {/* 🔥 Footer hidden on login/register */}
      {!hideLayout && <Footer />}

    </div>
  )
}
export default App