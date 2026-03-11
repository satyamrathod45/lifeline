import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"

export default function Login() {

  const { setUser } = useAuth()
  const navigate = useNavigate()

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {

    e.preventDefault()
    setLoading(true)

    try {

      const res = await api.post("/auth/login", {
        phone,
        password,
        role
      })

      setUser(res.data.user)

      localStorage.setItem("user", JSON.stringify(res.data.user))

      // redirect based on role
      if(res.data.user.role === "hospital"){
        navigate("/hospital-dashboard")
      }else{
        navigate("/")
      }

    } catch (error) {

      alert(error.response?.data?.message || "Login failed")

    } finally {
      setLoading(false)
    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {/* ROLE SELECT */}

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          className="w-full border p-3 mb-4 rounded"
        >
          <option value="user">User</option>
          <option value="hospital">Hospital</option>
        </select>


        <input
          type="text"
          placeholder="Phone"
          value={phone}
          required
          className="w-full border p-3 mb-4 rounded"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          className="w-full border p-3 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </motion.form>

    </div>
  )
}