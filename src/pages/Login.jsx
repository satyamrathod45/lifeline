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
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const res = await api.post("/auth/login", {
        phone,
        password
      })

      setUser(res.data.user)

      navigate("/")

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