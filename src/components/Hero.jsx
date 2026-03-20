import { motion } from "framer-motion"
import hero from "../assets/hero.png"
import { useNavigate } from "react-router-dom"

export default function Hero() {

  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 sm:gap-40 items-center h-screen overflow-hidden">

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Find Blood Donors <br />
          During Emergencies
        </h1>

        <p className="mt-6 text-gray-600 text-lg max-w-lg">
          A digital platform connecting blood donors and patients instantly.
          Search nearby donors and manage emergency blood requests efficiently.
        </p>

        <div className="flex flex-wrap gap-6 mt-8">

          {/* FIND DONOR BUTTON */}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>navigate("/search")}
            className="bg-red-600 text-white px-8 py-3 rounded-lg shadow-md"
          >
            Find Donor
          </motion.button>


          {/* REQUEST BLOOD BUTTON */}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>navigate("/request")}
            className="border border-red-600 text-red-600 px-8 py-3 rounded-lg"
          >
            Request Blood
          </motion.button>

        </div>

      </motion.div>



      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >

        <motion.img
          src={hero}
          alt="Blood Donation Platform"
          className="w-[450px] sm:w-[600px] md:w-[750px] lg:w-[800px] xl:w-[900px] max-w-[70vw]"
          
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

      </motion.div>

    </section>
  )
}