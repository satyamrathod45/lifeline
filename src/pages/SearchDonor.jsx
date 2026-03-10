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
const [locationName,setLocationName]=useState("")

const [donors,setDonors]=useState([])
const [loading,setLoading]=useState(false)
const [showMap,setShowMap]=useState(false)

const [selectedDonor,setSelectedDonor]=useState(null)



const detectLocation=()=>{

navigator.geolocation.getCurrentPosition(

async (position)=>{

const latitude=position.coords.latitude
const longitude=position.coords.longitude

setLat(latitude)
setLng(longitude)

try{

const res = await fetch(
`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
)

const data = await res.json()

setLocationName(
data.address.city ||
data.address.town ||
data.address.village ||
"Location detected"
)

toast.success("Location detected")

}catch{

setLocationName("Location detected")

}

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

}catch{

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



{/* HERO */}

<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between mb-10">

<div>

<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
Find Blood Donors
</h1>

<p className="text-gray-600 max-w-md">
Locate nearby blood donors quickly during emergencies.
Every second matters when saving a life.
</p>

</div>

<img
src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
className="w-44 mt-6 md:mt-0"
/>

</div>



{/* SEARCH PANEL */}

<div className="bg-white/80 backdrop-blur-lg max-w-5xl mx-auto p-6 rounded-2xl shadow-xl mb-8">

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



{/* LOCATION DISPLAY */}

{locationName &&(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="text-center mb-6 text-gray-700"
>

📍 Detected Location:

<span className="ml-2 font-semibold text-red-500">

{locationName}

</span>

</motion.div>

)}



{loading &&(

<p className="text-center text-gray-600 animate-pulse">
Searching donors...
</p>

)}



{/* MAP */}

{showMap && lat && lng &&(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="max-w-6xl mx-auto mb-10 rounded-3xl overflow-hidden shadow-2xl border"
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



{/* DONOR CARDS */}

<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

{donors.map((donor)=>(

<motion.div
key={donor._id}
whileHover={{scale:1.05}}
className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition text-center border border-red-100"
>

<img
src={`https://api.dicebear.com/7.x/initials/svg?seed=${donor.name}`}
className="w-16 h-16 rounded-full shadow mx-auto mb-3"
/>

<span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
{donor.bloodGroup}
</span>

<h2 className="font-semibold text-gray-800 mt-2">
{donor.name}
</h2>

<p className="text-gray-500 text-sm flex items-center justify-center gap-1 mt-1">
<MapPin size={14}/>
{donor.city}
</p>

<button
onClick={()=>setSelectedDonor(donor)}
className="mt-4 w-full bg-red-500 text-white py-2 rounded-full hover:scale-105 transition shadow"
>

Contact

</button>

</motion.div>

))}

</div>



{/* CONTACT POPUP */}

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