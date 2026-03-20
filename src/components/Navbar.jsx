import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, HeartPulse, User } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)
  const { user, setUser } = useAuth()
  const location = useLocation()

  const handleLogout = () => setUser(null)

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Donor", path: "/search" },
     {name: "Find Hospital" , path: "/find-hospital"},
    { name: "Request Blood", path: "/request" },
    { name: "Requests", path: "/requests" },
    { name: "About", path: "/about" },
   
  ]

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/20 shadow-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">

          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-red-500"
          >
            <HeartPulse size={30} />
          </motion.div>

          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            LifeLine
          </span>

        </Link>


        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-10 font-medium">

          {navLinks.map((link) => {
            const active = location.pathname === link.path

            return (
              <Link key={link.path} to={link.path} className="relative group">

                <motion.span
                  whileHover={{ y: -2 }}
                  className={`transition ${active ? "text-red-500" : "text-gray-700"}`}
                >
                  {link.name}
                </motion.span>

                {/* UNDERLINE */}
                <motion.div
                  layoutId="nav-pill"
                  className={`absolute left-0 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-red-500 to-pink-500 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  } transition-all duration-300`}
                />

              </Link>
            )
          })}

        </nav>


        {/* AUTH */}
        <div className="hidden md:flex items-center gap-4">

          {user ? (
            <div className="flex items-center gap-4">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full shadow"
              >
                <User size={18} />
                <Link to="/dashboard" className="text-sm font-medium">
                  {user.name}
                </Link>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
              >
                Logout
              </motion.button>

            </div>
          ) : (
            <div className="flex gap-3">

              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-5 py-2 rounded-full border border-red-400 text-red-500"
                >
                  Login
                </motion.button>
              </Link>

              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                >
                  Register
                </motion.button>
              </Link>

            </div>
          )}

        </div>


        {/* MOBILE BUTTON */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>

      </div>


      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="md:hidden bg-white/80 backdrop-blur-xl border-t shadow-lg"
          >

            <div className="flex flex-col gap-6 px-6 py-6 font-medium">

              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ x: 10 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-red-500"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {user ? (
                <button
                  onClick={() => {
                    handleLogout()
                    setMenuOpen(false)
                  }}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-full"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link onClick={() => setMenuOpen(false)} to="/login">
                    Login
                  </Link>
                  <Link onClick={() => setMenuOpen(false)} to="/register">
                    Register
                  </Link>
                </>
              )}

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  )
}