import { useEffect, useState } from "react"
import api from "../services/api"
import { motion } from "framer-motion"
import { User, Droplet, Heart, ClipboardList } from "lucide-react"

export default function Dashboard(){

const [created,setCreated] = useState([])
const [accepted,setAccepted] = useState([])
const [loading,setLoading] = useState(true)

const user = JSON.parse(localStorage.getItem("user"))

useEffect(()=>{

const fetchData = async () =>{

try{

const createdRes = await api.get("/requests/my-requests")
setCreated(createdRes.data.requests)

if(user?.role === "donor"){
const acceptedRes = await api.get("/requests/accepted")
setAccepted(acceptedRes.data.requests)
}

}catch(err){
console.log(err)
}

setLoading(false)

}

fetchData()

},[])

return(

<div className="min-h-screen bg-[#F7EFEA] p-10">

{/* Header */}

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-4xl font-bold text-center mb-12"
>

My Dashboard

</motion.h1>


{/* Profile Card */}

<div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

<div className="bg-white rounded-3xl shadow-xl p-6 text-center">

<User className="mx-auto text-gray-600"/>

<h2 className="text-xl font-bold mt-3">
{user?.name}
</h2>

<p className="text-gray-500">
{user?.email}
</p>

<p className="text-red-500 font-semibold mt-2">
{user?.bloodGroup}
</p>

<p className="text-sm text-gray-400 mt-1">
Role: {user?.role}
</p>

</div>


{/* Created Requests */}

<div className="bg-white rounded-3xl shadow-xl p-6 text-center">

<ClipboardList className="mx-auto text-blue-500"/>

<h2 className="text-2xl font-bold mt-3">
{created.length}
</h2>

<p className="text-gray-600">
Requests Created
</p>

</div>


{/* Donations */}

<div className="bg-white rounded-3xl shadow-xl p-6 text-center">

<Heart className="mx-auto text-green-500"/>

<h2 className="text-2xl font-bold mt-3">
{accepted.length}
</h2>

<p className="text-gray-600">
Requests Accepted
</p>

</div>

</div>


{/* Requests List */}

<div className="max-w-5xl mx-auto mt-12">

<h2 className="text-2xl font-bold mb-6">
My Blood Requests
</h2>

{loading && <p>Loading...</p>}

<div className="grid md:grid-cols-2 gap-6">

{created.map(req=>(
<div
key={req._id}
className="bg-white p-5 rounded-2xl shadow"
>

<p className="font-semibold">
Patient: {req.patientName}
</p>

<p className="text-red-500">
Blood Group: {req.bloodGroup}
</p>

<p className="text-gray-600">
Hospital: {req.hospital}
</p>

<p className="text-gray-400 text-sm">
Units: {req.unitsNeeded}
</p>

</div>
))}

</div>

</div>


{/* Accepted Requests */}

{user?.role === "donor" && (

<div className="max-w-5xl mx-auto mt-12">

<h2 className="text-2xl font-bold mb-6">
Requests I Accepted
</h2>

<div className="grid md:grid-cols-2 gap-6">

{accepted.map(req=>(
<div
key={req._id}
className="bg-white p-5 rounded-2xl shadow"
>

<p className="font-semibold">
Patient: {req.patientName}
</p>

<p className="text-red-500">
Blood Group: {req.bloodGroup}
</p>

<p className="text-gray-600">
Hospital: {req.hospital}
</p>

<p className="text-gray-400 text-sm">
Units: {req.unitsNeeded}
</p>

</div>
))}

</div>

</div>

)}

</div>

)

}