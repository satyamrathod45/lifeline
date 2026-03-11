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

function App() {

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Navbar always visible */}
      <Navbar />

      {/* Routes */}

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/become-donor" element={<ProtectedRoute><BecomeDonor/></ProtectedRoute>}/>

         <Route path="/search" element={<SearchDonor />} />
         <Route path="/requests" element={<RequestsDashboard/>}/>
         <Route path="/request/:id" element={<RequestInfo/>}/>

       <Route path="/about" element={<About />} />


        {/* Protected Routes */}

        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <RequestDonor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
      <Footer  />

    </div>

  )
}

export default App