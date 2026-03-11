import { useEffect, useState } from "react"
import api from "../services/api"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { Droplet, Hospital, MapPin, User, CheckCircle } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function RequestsDashboard(){

  const [requests,setRequests] = useState([])
  const [tab,setTab] = useState("all")
  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState(null)

  const navigate = useNavigate()



  // ======================
  // FETCH USER PROFILE
  // ======================

  const fetchUser = async ()=>{

    try{

      const res = await api.get("/auth/profile")

      setUser(res.data.user)

      localStorage.setItem("user",JSON.stringify(res.data.user))

    }catch{

      toast.error("Failed to fetch user profile")

    }

  }



  // ======================
  // FETCH ALL REQUESTS
  // ======================

  const fetchAllRequests = async ()=>{

    try{

      setLoading(true)

      const res = await api.get("/requests")

      setRequests(res.data.requests)

    }catch{

      toast.error("Failed to fetch requests")

    }

    setLoading(false)

  }



  // ======================
  // FETCH MY UPLOADED
  // ======================

  const fetchMyRequests = async ()=>{

    try{

      setLoading(true)

      const res = await api.get("/requests/my")

      setRequests(res.data.requests)

    }catch{

      toast.error("Failed to fetch requests")

    }

    setLoading(false)

  }



  // ======================
  // FETCH MY ACCEPTED
  // ======================

  const fetchAccepted = async ()=>{

    try{

      setLoading(true)

      const res = await api.get("/requests/accepted")

      setRequests(res.data.requests)

    }catch{

      toast.error("Failed to fetch accepted requests")

    }

    setLoading(false)

  }



  // ======================
  // ACCEPT REQUEST
  // ======================

  const acceptRequest = async(e,id)=>{

    e.stopPropagation()

    try{

      await api.patch(`/requests/${id}/accept`)

      toast.success("Request accepted")

      fetchAllRequests()

    }catch(err){

      toast.error(err.response?.data?.message || "Error")

    }

  }



  // ======================
  // LOAD USER ON START
  // ======================

  useEffect(()=>{
    fetchUser()
  },[])



  // ======================
  // LOAD REQUESTS BASED TAB
  // ======================

  useEffect(()=>{

    if(tab==="all") fetchAllRequests()

    if(tab==="my") fetchMyRequests()

    if(tab==="accepted") fetchAccepted()

  },[tab])



  return(

<div className="min-h-screen bg-[#F7EFEA] px-6 py-10">

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-4xl font-bold text-center mb-10"
>
Blood Requests
</motion.h1>



{/* Tabs */}

<div className="flex justify-center gap-4 mb-10">

<button
onClick={()=>setTab("all")}
className={`px-5 py-2 rounded-full ${
tab==="all" ? "bg-red-500 text-white":"bg-white"
}`}
>
All Requests
</button>


<button
onClick={()=>setTab("my")}
className={`px-5 py-2 rounded-full ${
tab==="my" ? "bg-red-500 text-white":"bg-white"
}`}
>
My Uploaded
</button>


{user?.isDonor ? (

<button
onClick={()=>setTab("accepted")}
className={`px-5 py-2 rounded-full ${
tab==="accepted" ? "bg-red-500 text-white":"bg-white"
}`}
>
My Accepted
</button>

):(

<Link
to="/become-donor"
className="px-5 py-2 rounded-full bg-green-500 text-white"
>
Become Donor 🩸
</Link>

)}

</div>



{loading &&(

<p className="text-center text-gray-600">
Loading requests...
</p>

)}



<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

{requests.map((req)=>{

return(

<motion.div
key={req._id}
whileHover={{scale:1.05}}
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
onClick={()=>navigate(`/request/${req._id}`)}
className="bg-white rounded-3xl shadow-xl p-6 border border-red-100 cursor-pointer"
>



{/* STATUS BADGE */}

<div className="flex justify-between items-center mb-3">

<span className={`px-3 py-1 text-xs rounded-full ${
req.status==="pending"
? "bg-yellow-100 text-yellow-700"
: "bg-green-100 text-green-700"
}`}>
{req.status}
</span>

</div>



<div className="flex justify-center mb-4">

<motion.div
animate={{y:[0,-6,0]}}
transition={{repeat:Infinity,duration:2}}
className="bg-red-100 p-3 rounded-full"
>

<Droplet className="text-red-500"/>

</motion.div>

</div>



<h2 className="text-xl font-bold text-center">
{req.patientName}
</h2>


<p className="text-center text-red-500 font-semibold">
{req.bloodGroup}
</p>



<div className="mt-4 space-y-2 text-gray-600 text-sm">

<p className="flex items-center gap-2">
<Hospital size={16}/>
{req.hospital}
</p>

<p className="flex items-center gap-2">
<MapPin size={16}/>
{req.city} • {req.area}
</p>

<p className="flex items-center gap-2">
<User size={16}/>
Units Needed: {req.unitsNeeded}
</p>

</div>



{/* ACCEPT BUTTON */}

{user?.isDonor && req.status==="pending" && tab==="all" &&(

<button
onClick={(e)=>acceptRequest(e,req._id)}
className="mt-6 w-full bg-green-500 text-white py-2 rounded-full flex justify-center items-center gap-2"
>

<CheckCircle size={18}/>
Accept Request

</button>

)}



{/* ACCEPTED INFO */}

{req.status==="accepted" &&(

<div className="mt-6 text-center text-green-600 font-semibold">

Accepted by {req.acceptedBy?.name || "Donor"}

</div>

)}

</motion.div>

)

})}

</div>

</div>

  )

}