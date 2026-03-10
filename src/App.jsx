import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SearchDonor from "./pages/SearchDonor"
// import RequestBlood from "./pages/RequestBlood"
import RequestDonor from "./components/RequestDonor"
import EmergencyRequests from "./components/EmergencyRequest"
// import Dashboard from "./pages/Dashboard"
// import About from "./pages/About"

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

         <Route path="/search" element={<SearchDonor />} />
         <Route path="/requests" element={<EmergencyRequests/>}/>

       {/* <Route path="/about" element={<About />} /> */}


        {/* Protected Routes */}

        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <RequestDonor />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}

      </Routes>

    </div>

  )
}

export default App