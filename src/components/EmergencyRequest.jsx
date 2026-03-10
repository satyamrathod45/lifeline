import { useEffect, useState } from "react"
import api from "../services/api"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { Droplet, MapPin, Hospital, User, CheckCircle } from "lucide-react"

export default function EmergencyRequests() {

  const [requests,setRequests] = useState([])
  const [loading,setLoading] = useState(true)
  const [lat,setLat] = useState(null)
  const [lng,setLng] = useState(null)

  const user = JSON.parse(localStorage.getItem("user"))

  console.log(user );
  


  const detectLocation = () => {

    navigator.geolocation.getCurrentPosition(

      (position)=>{
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      },

      ()=> toast.error("Location permission denied")

    )

  }



  const fetchRequests = async () => {

    try{
        

      const res = await api.get("/requests/nearby",{
        params:{ lat, lng }
      })

      setRequests(res.data.requests)

    }catch(err){

      toast.error("Failed to fetch requests")

    }

    setLoading(false)

  }



  useEffect(()=>{
    detectLocation()
  },[])



  useEffect(()=>{
    if(lat && lng){
      fetchRequests()
    }
  },[lat,lng])



  const acceptRequest = async (id) => {

    try{

      await api.patch(`/requests/${id}/accept`)

      toast.success("Request accepted")

      fetchRequests()

    }catch(err){

      toast.error(err.response?.data?.message || "Error")

    }

  }



  return (

<div className="min-h-screen bg-[#F7EFEA] px-6 py-10">

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-4xl font-bold text-center mb-12"
>

Emergency Blood Requests

</motion.h1>



{loading && (

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
className="bg-white rounded-3xl shadow-xl p-6 border border-red-100"
>


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



{/* Accept Button */}

{user?.role === "donor" &&(

<button
onClick={()=>acceptRequest(req._id)}
className="mt-6 w-full bg-green-500 text-white py-2 rounded-full hover:scale-105 transition flex justify-center items-center gap-2"
>

<CheckCircle size={18}/>
Accept Request

</button>

)}



{/* Accepted UI */}

{req.status === "accepted" &&(

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