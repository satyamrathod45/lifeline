import { createContext, useContext, useEffect, useState } from "react"
import api from "../services/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)



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



  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}



export const useAuth = () => useContext(AuthContext)