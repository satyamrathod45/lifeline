import { motion } from "framer-motion"
import { Heart, Droplet, Github, Linkedin, Instagram } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#1f1f1f] to-[#111] text-gray-300 py-16 px-6 overflow-hidden">

      <div className="absolute top-0 left-0 w-72 h-72 bg-red-500 blur-3xl opacity-20 rounded-full"/>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400 blur-3xl opacity-20 rounded-full"/>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Logo Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
            <Droplet className="text-red-400"/>
            Lifeline
          </div>

          <p className="text-gray-400 text-sm max-w-xs">
            Connecting donors and patients to save lives during emergencies.
            Every drop counts.
          </p>
        </motion.div>


        {/* Quick Links */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2">

            <li>
              <Link to="/" className="hover:text-red-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/search" className="hover:text-red-400 transition">
                Find Donor
              </Link>
            </li>

            <li>
              <Link to="/request" className="hover:text-red-400 transition">
                Emergency Request
              </Link>
            </li>

            <li>
              <Link to="/become-donor" className="hover:text-red-400 transition">
                Become Donor
              </Link>
            </li>

          </ul>
        </motion.div>


        {/* Social Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          <h3 className="text-white font-semibold mb-4">Connect</h3>

          <div className="flex gap-4">

            <motion.a
              href="https://github.com"
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className="p-3 bg-gray-800 rounded-full"
            >
              <Github size={18}/>
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className="p-3 bg-gray-800 rounded-full"
            >
              <Linkedin size={18}/>
            </motion.a>

            <motion.a
              href="https://instagram.com"
              target="_blank"
              whileHover={{ scale: 1.2 }}
              className="p-3 bg-gray-800 rounded-full"
            >
              <Instagram size={18}/>
            </motion.a>

          </div>
        </motion.div>

      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">

        <motion.div
          animate={{ scale: [1,1.2,1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center items-center gap-2"
        >
          Made with <Heart className="text-red-500"/> for saving lives
        </motion.div>

        <p className="mt-2 text-gray-500">
          © 2026 Lifeline — Connecting Lives Through Donation
        </p>

      </div>

    </footer>
  )
}