import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, HeartPulse, User } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {

  const [menuOpen,setMenuOpen] = useState(false)

  const { user,setUser } = useAuth()

  const location = useLocation()

  const handleLogout = () => {
    setUser(null)
  }

const navLinks = [
  {name:"Home",path:"/"},
  {name:"Find Donor",path:"/search"},
  {name:"Request Blood",path:"/request"},
  {name:"Requests",path:"/requests"},
  {name:"About",path:"/about"}
]

  return (

<header className="w-full bg-white/80 backdrop-blur-lg border-b sticky top-0 z-50">

<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">



<Link
to="/"
className="flex items-center gap-2 text-2xl font-bold text-red-600"
>

<motion.div
animate={{scale:[1,1.15,1]}}
transition={{repeat:Infinity,duration:2}}
>

<HeartPulse size={28}/>

</motion.div>

LifeLine

</Link>



{/* Desktop Navigation */}

<nav className="hidden md:flex gap-10 text-gray-700 font-medium">

{navLinks.map((link)=>{

const active = location.pathname === link.path

return(

<Link
key={link.path}
to={link.path}
className="relative group"
>

<span className={`${active ? "text-red-600" : ""}`}>

{link.name}

</span>

{/* animated underline */}

<motion.span
layoutId="nav-underline"
className={`absolute left-0 -bottom-1 h-[2px] bg-red-500 ${
active ? "w-full" : "w-0 group-hover:w-full"
} transition-all`}
/>

</Link>

)

})}

</nav>



{/* Desktop Auth */}

<div className="hidden md:flex items-center gap-4">

{user ? (

<div className="flex items-center gap-4">

<div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">

<User size={18}/>

<span className="font-medium text-sm">

{user.name}

</span>

</div>

<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={handleLogout}
className="px-5 py-2 rounded-lg bg-red-600 text-white shadow-md"
>

Logout

</motion.button>

</div>

) : (

<div className="flex gap-3">

<Link to="/login">

<motion.button
whileHover={{scale:1.05}}
className="px-5 py-2 rounded-lg border border-red-500 text-red-600"
>

Login

</motion.button>

</Link>

<Link to="/register">

<motion.button
whileHover={{scale:1.05}}
className="px-5 py-2 rounded-lg bg-red-600 text-white shadow-md"
>

Register

</motion.button>

</Link>

</div>

)}

</div>



{/* Mobile Menu Button */}

<button
onClick={()=>setMenuOpen(!menuOpen)}
className="md:hidden"
>

{menuOpen ? <X size={28}/> : <Menu size={28}/>}

</button>

</div>



{/* Mobile Menu */}

<AnimatePresence>

{menuOpen && (

<motion.div
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
exit={{opacity:0,y:-20}}
className="md:hidden bg-white border-t shadow"
>

<div className="flex flex-col gap-6 px-6 py-6 text-gray-700 font-medium">

{navLinks.map((link)=>(

<Link
key={link.path}
onClick={()=>setMenuOpen(false)}
to={link.path}
className="hover:text-red-600"
>

{link.name}

</Link>

))}


{user ? (

<button
onClick={()=>{
handleLogout()
setMenuOpen(false)
}}
className="bg-red-600 text-white py-2 rounded-lg"
>

Logout

</button>

) : (

<>

<Link onClick={()=>setMenuOpen(false)} to="/login">

Login

</Link>

<Link onClick={()=>setMenuOpen(false)} to="/register">

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