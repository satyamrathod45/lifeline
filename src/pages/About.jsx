import { motion } from "framer-motion"
import { HeartPulse, Users, MapPin, Clock } from "lucide-react"

export default function About() {

const steps = [
{
title:"Search Donors",
desc:"Find nearby blood donors instantly using location-based search.",
icon:<MapPin size={28}/>
},
{
title:"Create Request",
desc:"Post emergency blood requests with hospital and patient details.",
icon:<HeartPulse size={28}/>
},
{
title:"Donor Response",
desc:"Available donors accept requests and help save lives quickly.",
icon:<Users size={28}/>
}
]

const stats = [
{label:"Lives Saved",value:"500+"},
{label:"Active Donors",value:"1200+"},
{label:"Cities Connected",value:"35+"},
{label:"Average Response",value:"15 min"}
]

return(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="min-h-screen bg-[#F7EFEA] px-6 py-16 relative overflow-hidden"
>

{/* background blobs */}

<div className="absolute top-20 left-20 w-72 h-72 bg-red-200 blur-3xl opacity-40 rounded-full"/>
<div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-200 blur-3xl opacity-40 rounded-full"/>


{/* Hero */}

<section className="max-w-5xl mx-auto text-center mb-20">

<motion.h1
initial={{y:-20,opacity:0}}
animate={{y:0,opacity:1}}
className="text-5xl font-bold text-gray-800 mb-6"
>

About Lifeline

</motion.h1>

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.3}}
className="text-gray-600 text-lg"
>

Aayuvani is a smart blood donation platform that connects donors and patients
in real time. Our mission is to make blood availability faster,
easier, and life-saving during emergencies.

</motion.p>

</section>



{/* Mission Cards */}

<section className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-24">

<motion.div
whileHover={{scale:1.05}}
className="bg-white p-8 rounded-3xl shadow-lg text-center"
>

<div className="flex justify-center mb-4 text-red-500">

<HeartPulse size={32}/>

</div>

<h3 className="text-xl font-semibold mb-3">

Save Lives

</h3>

<p className="text-gray-600">

Connecting patients with nearby donors during emergencies.

</p>

</motion.div>


<motion.div
whileHover={{scale:1.05}}
className="bg-white p-8 rounded-3xl shadow-lg text-center"
>

<div className="flex justify-center mb-4 text-red-500">

<Users size={32}/>

</div>

<h3 className="text-xl font-semibold mb-3">

Community

</h3>

<p className="text-gray-600">

Building a strong network of voluntary blood donors.

</p>

</motion.div>


<motion.div
whileHover={{scale:1.05}}
className="bg-white p-8 rounded-3xl shadow-lg text-center"
>

<div className="flex justify-center mb-4 text-red-500">

<Clock size={32}/>

</div>

<h3 className="text-xl font-semibold mb-3">

Faster Response

</h3>

<p className="text-gray-600">

Reducing response time for critical medical emergencies.

</p>

</motion.div>

</section>



{/* How it works */}

<section className="max-w-6xl mx-auto mb-24">

<h2 className="text-4xl font-bold text-center mb-12">

How Aayuvani Works

</h2>

<div className="grid md:grid-cols-3 gap-10">

{steps.map((step,i)=>(
<motion.div
key={i}
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
whileHover={{scale:1.05}}
className="bg-white p-8 rounded-3xl shadow-lg text-center"
>

<div className="flex justify-center mb-4 text-red-500">

{step.icon}

</div>

<h3 className="text-xl font-semibold mb-3">

{step.title}

</h3>

<p className="text-gray-600">

{step.desc}

</p>

</motion.div>
))}

</div>

</section>



{/* Stats */}

<section className="max-w-6xl mx-auto">

<div className="grid md:grid-cols-4 gap-10 text-center">

{stats.map((stat,i)=>(
<motion.div
key={i}
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
whileHover={{scale:1.1}}
className="bg-white p-6 rounded-2xl shadow"
>

<h3 className="text-3xl font-bold text-red-600">

{stat.value}

</h3>

<p className="text-gray-600 mt-2">

{stat.label}

</p>

</motion.div>
))}

</div>

</section>



</motion.div>

)

}