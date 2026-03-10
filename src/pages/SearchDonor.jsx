import { useState } from "react"
import api from "../services/api"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Droplet, MapPin, LocateFixed, Search, Phone } from "lucide-react"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"


function createBloodMarker(group){

return new L.DivIcon({

className:"",

html:`
<div class="blood-marker">

<div style="
background:#ef4444;
color:white;
width:38px;
height:38px;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
font-weight:bold;
font-size:12px;
box-shadow:0 4px 10px rgba(0,0,0,0.25);
">

${group}

</div>

</div>
`,

iconSize:[38,38],
iconAnchor:[19,19]

})

}


const userIcon = new L.Icon({

iconUrl:"https://cdn-icons-png.flaticon.com/512/684/684908.png",
iconSize:[35,35]

})


export default function SearchDonor(){

const [bloodGroup,setBloodGroup]=useState("")
const [city,setCity]=useState("")
const [lat,setLat]=useState(null)
const [lng,setLng]=useState(null)

const [donors,setDonors]=useState([])
const [loading,setLoading]=useState(false)
const [showMap,setShowMap]=useState(false)

const [selectedDonor,setSelectedDonor]=useState(null)



const detectLocation=()=>{

navigator.geolocation.getCurrentPosition(

(position)=>{

const latitude=position.coords.latitude
const longitude=position.coords.longitude

setLat(latitude)
setLng(longitude)

toast.success("Location detected")

},

()=>toast.error("Location permission denied")

)

}



const searchDonors=async()=>{

if(!bloodGroup){

toast.error("Select blood group")
return

}

setLoading(true)
setShowMap(true)

try{

const res=await api.get("/donors/nearby",{

params:{
bloodGroup,
lat,
lng,
city
}

})

setDonors(res.data.donors)

}catch(err){

toast.error("Error fetching donors")

}

setLoading(false)

}



return(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{duration:0.6}}
className="min-h-screen bg-[#F7EFEA] px-4 md:px-8 py-10 relative overflow-hidden"
>


<div className="absolute top-10 left-10 w-72 h-72 bg-red-200 blur-3xl opacity-40 rounded-full"/>
<div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-200 blur-3xl opacity-40 rounded-full"/>



<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-800"
>
Find Blood Donors
</motion.h1>



<div className="bg-white max-w-5xl mx-auto p-6 rounded-2xl shadow-xl mb-10">

<div className="flex flex-wrap justify-center gap-4">

<select
value={bloodGroup}
onChange={(e)=>setBloodGroup(e.target.value)}
className="bg-gray-100 px-4 py-3 rounded-full border"
>

<option value="">Blood Group</option>

<option>A+</option>
<option>A-</option>
<option>B+</option>
<option>B-</option>
<option>O+</option>
<option>O-</option>
<option>AB+</option>
<option>AB-</option>

</select>


<input
value={city}
onChange={(e)=>setCity(e.target.value)}
placeholder="Search by city"
className="bg-gray-100 px-4 py-3 rounded-full border"
/>


<button
onClick={detectLocation}
className="flex items-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-full hover:scale-105 transition"
>

<LocateFixed size={18}/>
Locate

</button>


<button
onClick={searchDonors}
className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full hover:scale-105 transition shadow-lg"
>

<Search size={18}/>
Search

</button>

</div>

</div>



{loading &&(

<p className="text-center text-gray-600 animate-pulse">
Searching donors...
</p>

)}



{showMap && lat && lng &&(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="max-w-6xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-xl"
>

<MapContainer

key={`${lat}-${lng}`}
center={[lat,lng]}
zoom={13}
style={{height:"420px",width:"100%"}}

>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>


<Marker position={[lat,lng]} icon={userIcon}>

<Popup>Your Location</Popup>

</Marker>


{donors.map((donor)=>{

if(!donor.location) return null

const donorLat = donor.location.coordinates[1]
const donorLng = donor.location.coordinates[0]

return(

<Marker
key={donor._id}
position={[donorLat,donorLng]}
icon={createBloodMarker(donor.bloodGroup)}
>

<Popup>

<b>{donor.name}</b>

<br/>

Blood Group: {donor.bloodGroup}

<br/>

{donor.city}

</Popup>

</Marker>

)

})}

</MapContainer>

</motion.div>

)}



<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

{donors.map((donor)=>(

<motion.div

key={donor._id}

whileHover={{scale:1.07,rotate:-1}}
whileTap={{scale:0.96}}

initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}

className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition text-center border border-red-100"

>


<motion.div
animate={{y:[0,-8,0]}}
transition={{repeat:Infinity,duration:2}}
className="flex justify-center mb-4"
>

<div className="bg-red-100 p-3 rounded-full shadow">

<Droplet className="text-red-500"/>

</div>

</motion.div>


<h2 className="font-bold text-lg text-gray-800">

{donor.name}

</h2>


<p className="text-red-500 font-semibold mt-1">

{donor.bloodGroup}

</p>


<p className="flex justify-center items-center gap-2 text-gray-600 mt-2">

<MapPin size={16}/>
{donor.city}

</p>


<div className="flex justify-center mt-2">

<span className="flex items-center gap-1 text-green-600 text-sm">

<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>

Available

</span>

</div>


<button
onClick={()=>setSelectedDonor(donor)}
className="mt-4 w-full bg-red-500 text-white py-2 rounded-full hover:scale-105 transition shadow"
>

Contact

</button>


</motion.div>

))}

</div>



<AnimatePresence>

{selectedDonor &&(

<motion.div

initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}

className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"

>

<motion.div

initial={{scale:0.8}}
animate={{scale:1}}
exit={{scale:0.8}}

className="bg-white p-8 rounded-2xl shadow-xl w-[320px] text-center"

>

<h2 className="text-xl font-bold mb-3">

{selectedDonor.name}

</h2>


<p className="text-red-500 font-semibold">

{selectedDonor.bloodGroup}

</p>


<p className="flex justify-center items-center gap-2 text-gray-600 mt-2">

<MapPin size={16}/>
{selectedDonor.city}

</p>


{selectedDonor.phone &&(

<p className="flex justify-center items-center gap-2 text-gray-700 mt-2">

<Phone size={16}/>
{selectedDonor.phone}

</p>

)}


<button
onClick={()=>setSelectedDonor(null)}
className="mt-6 bg-red-500 text-white px-6 py-2 rounded-full hover:scale-105 transition"
>

Close

</button>


</motion.div>

</motion.div>

)}

</AnimatePresence>



</motion.div>

)

}