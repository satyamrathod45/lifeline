import { useState } from "react"
import api from "../services/api"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { Droplet, MapPin, LocateFixed, Send, Hospital } from "lucide-react"

export default function RequestBlood(){

const [patientName,setPatientName] = useState("")
const [bloodGroup,setBloodGroup] = useState("")
const [hospital,setHospital] = useState("")
const [city,setCity] = useState("")
const [area,setArea] = useState("")
const [unitsNeeded,setUnitsNeeded] = useState("")
const [lat,setLat] = useState(null)
const [lng,setLng] = useState(null)

const [loading,setLoading] = useState(false)



const detectLocation = ()=>{

navigator.geolocation.getCurrentPosition(

(position)=>{

setLat(position.coords.latitude)
setLng(position.coords.longitude)

toast.success("Location detected")

},

()=>toast.error("Location permission denied")

)

}



const submitRequest = async()=>{

if(!patientName || !bloodGroup || !hospital){

toast.error("Please fill required fields")
return

}

if(!lat || !lng){

toast.error("Please detect location")
return

}

setLoading(true)

try{

await api.post("/requests",{

patientName,
bloodGroup,
hospital,
city,
area,
unitsNeeded,
coordinates:[lng,lat]

})

toast.success("Blood request created")

setPatientName("")
setBloodGroup("")
setHospital("")
setCity("")
setArea("")
setUnitsNeeded("")

}catch(err){

toast.error("Failed to create request")

}

setLoading(false)

}



return(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{duration:0.6}}
className="min-h-screen bg-[#F7EFEA] flex items-center justify-center px-4 py-12 relative overflow-hidden"
>


{/* background blobs */}

<div className="absolute top-20 left-10 w-72 h-72 bg-red-200 blur-3xl opacity-40 rounded-full"/>
<div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-200 blur-3xl opacity-40 rounded-full"/>



<motion.div
initial={{y:40,opacity:0}}
animate={{y:0,opacity:1}}
className="bg-white w-full max-w-lg p-8 rounded-3xl shadow-xl"
>


<h2 className="text-3xl font-bold text-center mb-6 text-gray-800 flex justify-center items-center gap-2">

<Droplet className="text-red-500"/>

Blood Request

</h2>



{/* Patient Name */}

<input
value={patientName}
onChange={(e)=>setPatientName(e.target.value)}
placeholder="Patient Name"
className="w-full mb-4 bg-gray-100 px-4 py-3 rounded-xl border"
/>



{/* Blood Group */}

<select
value={bloodGroup}
onChange={(e)=>setBloodGroup(e.target.value)}
className="w-full mb-4 bg-gray-100 px-4 py-3 rounded-xl border"
>

<option value="">Select Blood Group</option>

<option>A+</option>
<option>A-</option>
<option>B+</option>
<option>B-</option>
<option>O+</option>
<option>O-</option>
<option>AB+</option>
<option>AB-</option>

</select>



{/* Hospital */}

<div className="relative mb-4">

<Hospital className="absolute left-3 top-3 text-gray-500"/>

<input
value={hospital}
onChange={(e)=>setHospital(e.target.value)}
placeholder="Hospital Name"
className="w-full bg-gray-100 pl-10 pr-4 py-3 rounded-xl border"
/>

</div>



{/* City */}

<input
value={city}
onChange={(e)=>setCity(e.target.value)}
placeholder="City"
className="w-full mb-4 bg-gray-100 px-4 py-3 rounded-xl border"
/>



{/* Area */}

<input
value={area}
onChange={(e)=>setArea(e.target.value)}
placeholder="Area"
className="w-full mb-4 bg-gray-100 px-4 py-3 rounded-xl border"
/>



{/* Units */}

<input
value={unitsNeeded}
onChange={(e)=>setUnitsNeeded(e.target.value)}
placeholder="Units Needed"
type="number"
className="w-full mb-4 bg-gray-100 px-4 py-3 rounded-xl border"
/>



{/* Location */}

<button
onClick={detectLocation}
className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-3 rounded-xl hover:scale-105 transition mb-4"
>

<LocateFixed size={18}/>
Detect Location

</button>



{/* Submit */}

<button
onClick={submitRequest}
disabled={loading}
className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-3 rounded-xl hover:scale-105 transition shadow-lg"
>

<Send size={18}/>

{loading ? "Submitting..." : "Create Request"}

</button>



</motion.div>

</motion.div>

)

}