import { motion } from "framer-motion"
import { HeartPulse, Users, Droplet } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E6485A] to-[#c81d3a] text-white py-24 px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-red-900 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Save Lives <br />
            <span className="text-yellow-300">Together</span>
          </h2>

          <p className="text-lg opacity-90 mb-8 max-w-lg">
            Join a powerful network of donors and volunteers helping people
            during medical emergencies. One drop of blood can write a new
            chapter of someone's life.
          </p>

          <div className="flex gap-6 mb-10">

            <div className="flex items-center gap-2">
              <Droplet className="text-yellow-300" size={24} />
              <span>Donate Blood</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="text-yellow-300" size={24} />
              <span>Community</span>
            </div>

            <div className="flex items-center gap-2">
              <HeartPulse className="text-yellow-300" size={24} />
              <span>Save Lives</span>
            </div>

          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black px-10 py-4 rounded-full font-semibold shadow-2xl hover:shadow-yellow-300/50 transition"
          >
            Join The Network
          </motion.button>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <motion.img
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4"
            alt="blood donation"
            className="rounded-3xl shadow-2xl"
            whileHover={{ scale: 1.05 }}
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-white text-red-500 p-4 rounded-full shadow-xl"
          >
            <Droplet size={28} />
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}