import { motion } from "framer-motion"
import { UserPlus, MapPin, Droplet, HeartHandshake } from "lucide-react"
import videoBg from '../assets/bg.mp4'

export default function HowItWorks() {

  const steps = [
    {
      icon: <UserPlus size={28} />,
      title: "Register Yourself",
      desc: "Create your account as a donor or a patient in seconds.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: <MapPin size={28} />,
      title: "Enable Location",
      desc: "Allow location access to connect with nearby donors instantly.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Droplet size={28} />,
      title: "Find / Request Blood",
      desc: "Search donors or send emergency requests in real-time.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <HeartHandshake size={28} />,
      title: "Save Lives",
      desc: "Connect, donate, and make a real difference in someone's life.",
      color: "from-green-400 to-emerald-500"
    }
  ]

  return (

    <section className="py-24 px-6 bg-[#f5efe8]">

      <div className="max-w-6xl mx-auto text-center">

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          How It Works ⚙️
        </motion.h2>

        <p className="text-gray-600 mb-14 max-w-xl mx-auto">
          A simple 4-step journey to connect donors and save lives seamlessly.
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-4 gap-8">

          {steps.map((step, index) => (

<motion.div
  key={index}
  initial={{ opacity: 0, y: 40, rotate: -3 }}
  whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -3 : 3 }}
  transition={{ delay: index * 0.2 }}
  whileHover={{ scale: 1.08, rotate: 0, y: -10 }}
  className="bg-[#fffaf0] shadow-lg rounded-xl p-6 cursor-pointer relative"
>

  {/* PIN DOT */}
  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full shadow-md"></div>

  {/* ICON */}
  <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-[#fce7e7] text-[#e53935]">
    {step.icon}
  </div>

  <h3 className="text-lg font-semibold mb-2 text-gray-800">
    {step.title}
  </h3>

  <p className="text-sm text-gray-600">
    {step.desc}
  </p>

</motion.div>

          ))}

        </div>


      </div>

    </section>
  )
}