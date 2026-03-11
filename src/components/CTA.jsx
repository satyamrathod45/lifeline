import { motion } from "framer-motion"
import { HeartPulse, Users, Droplet } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CTA() {

  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E6485A] to-[#c81d3a] text-white py-24 px-6">

      {/* Background glow */}
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

        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Become a <br />
            <span className="text-yellow-300">Life Saver</span>
          </h2>

          <p className="text-lg opacity-90 mb-8 max-w-lg">
            Every blood donation has the power to save lives. Join our
            LifeLine network of donors and help patients during medical
            emergencies when every second matters.
          </p>

          <div className="flex gap-6 mb-10">

            <div className="flex items-center gap-2">
              <Droplet className="text-yellow-300" size={24}/>
              <span>Donate Blood</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="text-yellow-300" size={24}/>
              <span>Help Community</span>
            </div>

            <div className="flex items-center gap-2">
              <HeartPulse className="text-yellow-300" size={24}/>
              <span>Save Lives</span>
            </div>

          </div>


          {/* CTA BUTTON */}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>navigate("/become-donor")}
            className="bg-yellow-400 text-black px-10 py-4 rounded-full font-semibold shadow-2xl hover:shadow-yellow-300/50 transition"
          >
            Become a Donor 🩸
          </motion.button>

        </motion.div>



        {/* RIGHT VIDEO */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <motion.video
            autoPlay
            muted
            loop
            playsInline
            className="rounded-3xl shadow-2xl"
            whileHover={{ scale: 1.05 }}
          >
            <source
              src="https://cdn.pixabay.com/video/2021/03/30/69526-531102354_large.mp4"
              type="video/mp4"
            />
          </motion.video>

          <motion.div
            animate={{ y: [0,-10,0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-white text-red-500 p-4 rounded-full shadow-xl"
          >
            <Droplet size={28}/>
          </motion.div>

        </motion.div>

      </div>

    </section>
  )
}