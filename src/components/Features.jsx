import { motion } from "framer-motion"
import { Search, Siren, ShieldCheck } from "lucide-react"

export default function Features() {

  const features = [
    {
      icon: <Search size={40} />,
      title: "Search Donors",
      desc: "Find nearby blood donors instantly based on blood group and location.",
      color: "from-pink-400 to-red-400"
    },
    {
      icon: <Siren size={40} />,
      title: "Emergency Requests",
      desc: "Post urgent blood requests and notify donors quickly.",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Secure Platform",
      desc: "Safe and verified donor records for reliable emergency support.",
      color: "from-purple-400 to-indigo-400"
    }
  ]

  return (
    <section className="bg-gray-50 py-24 relative overflow-hidden">

      {/* background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40"/>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-40"/>

      <div className="max-w-6xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          How BloodLink Helps ❤️
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">

          {features.map((f, i) => (

            <motion.div
              key={i}
              whileHover={{
                rotate: [-1,1,-1],
                scale: 1.08
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`relative bg-gradient-to-br ${f.color} p-[2px] rounded-2xl`}
            >

              <div className="bg-white rounded-2xl p-8 h-full text-center shadow-xl">

                {/* icon bubble */}
                <motion.div
                  animate={{ y: [0,-8,0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-gray-100 text-red-500 shadow"
                >
                  {f.icon}
                </motion.div>

                <h3 className="text-xl font-semibold mb-3">
                  {f.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {f.desc}
                </p>

                {/* playful bottom bar */}
                <motion.div
                  whileHover={{ width: "80%" }}
                  className="h-1 bg-red-400 rounded-full mt-6 mx-auto w-12"
                />

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  )
}