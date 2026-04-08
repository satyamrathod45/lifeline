import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/profile")

      setUser(res.data.user)
      localStorage.setItem("user", JSON.stringify(res.data.user))

    } catch {
      setUser(null)
      localStorage.removeItem("user")
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  // 🚀 ADMIN REDIRECT LOGIC
  useEffect(() => {
    if (!loading && user?.role === "Admin") {
      navigate("/admin")
    }
  }, [user, loading, navigate])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)