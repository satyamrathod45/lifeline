import { useState, useEffect } from "react"
import api from "../services/api"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, LocateFixed, Search, Phone, Moon, Sun } from "lucide-react"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

/* =========================
   MARKER
========================= */
function createBloodMarker(group) {
  return new L.DivIcon({
    className: "",
    html: `
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
      box-shadow:0 0 15px rgba(239,68,68,0.8);
      animation:pulse 1.5s infinite;
    ">
    ${group}
    </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19]
  })
}

/* =========================
   USER ICON
========================= */
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35]
})

/* =========================
   DISTANCE FUNCTION
========================= */
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2

  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1)
}

export default function SearchDonor() {

  const [dark, setDark] = useState(false)

  const [bloodGroup, setBloodGroup] = useState("")
  const [city, setCity] = useState("")
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState(null)

  /* =========================
     LOCATION
  ========================= */
const detectLocation = () => {

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      setLat(latitude)
      setLng(longitude)

      try {

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )

        const data = await res.json()

        const detectedCity =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state ||
          ""

        // 🔥 THIS IS THE MAIN LINE
        setCity(detectedCity)

        toast.success(`Location: ${detectedCity}`)

      } catch {

        toast.error("Failed to fetch location name")

      }

    },

    () => toast.error("Location permission denied")

  )
}

  /* =========================
     SEARCH
  ========================= */
  const searchDonors = async () => {
    if (!bloodGroup) return toast.error("Select blood group")
    if (!lat) return toast.error("Detect location first")

    setLoading(true)

    try {
      const res = await api.get("/donors/nearby", {
        params: { bloodGroup, lat, lng, city }
      })

      setDonors(res.data.donors || [])

    } catch {
      toast.error("Error fetching donors")
    }

    setLoading(false)
  }

  return (
    <div className={`${dark ? "bg-black text-white" : "bg-[#F7EFEA]"} min-h-screen px-4 py-10 transition`}>

      {/* HERO */}
      <div className="relative max-w-6xl mx-auto mb-10 rounded-3xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1584515933487-779824d29309"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Find Blood Donors ❤️
          </h1>
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-5xl mx-auto p-6 bg-white/80 backdrop-blur rounded-3xl shadow-xl mb-10 flex flex-wrap gap-4 justify-center">

        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="p-3 rounded-full">
          <option value="">Blood</option>
          <option>A+</option><option>B+</option><option>O+</option>
          <option>A-</option><option>B-</option><option>O-</option>
          <option>AB+</option><option>AB-</option>
        </select>

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-full"
        />

        <button onClick={detectLocation} className="bg-blue-500 text-white px-5 py-3 rounded-full">
          <LocateFixed size={18}/>
        </button>

        <button onClick={searchDonors} className="bg-red-500 text-white px-6 py-3 rounded-full">
          <Search size={18}/>
        </button>

      </div>

      {/* MAP */}
      {lat && (
        <div className="max-w-6xl mx-auto mb-10 rounded-3xl overflow-hidden shadow-xl">
          <MapContainer center={[lat, lng]} zoom={13} style={{ height: "400px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[lat, lng]} icon={userIcon}>
              <Popup>You</Popup>
            </Marker>

            {donors.map(d => {
              if (!d.location) return null

              const dLat = d.location.coordinates[1]
              const dLng = d.location.coordinates[0]

              return (
                <Marker key={d._id} position={[dLat, dLng]} icon={createBloodMarker(d.bloodGroup)}>
                  <Popup>{d.name}</Popup>
                </Marker>
              )
            })}

          </MapContainer>
        </div>
      )}

      {/* LOADING SKELETON */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-300 animate-pulse rounded-2xl" />
          ))}
        </div>
      )}

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

        {donors.map(d => {
          const dLat = d.location?.coordinates?.[1]
          const dLng = d.location?.coordinates?.[0]

          const distance = dLat ? getDistance(lat, lng, dLat, dLng) : null

          return (
            <motion.div
              key={d._id}
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-white/80 backdrop-blur p-6 rounded-3xl shadow-xl text-center relative"
            >

              {/* AVAILABLE BADGE */}
              <div className="absolute top-2 right-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full animate-pulse">
                Available
              </div>

              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${d.name}`}
                className="w-16 h-16 mx-auto mb-3"
              />

              <h2>{d.name}</h2>
              <p>{d.bloodGroup}</p>

              {distance && (
                <p className="text-sm text-gray-500">
                  {distance} km away
                </p>
              )}

              <button
                onClick={() => setSelectedDonor(d)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-full"
              >
                Contact
              </button>

            </motion.div>
          )
        })}

      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedDonor && (
          <motion.div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <motion.div className="bg-white p-6 rounded-2xl text-center">
              <h2>{selectedDonor.name}</h2>
              <p>{selectedDonor.bloodGroup}</p>
              <p>{selectedDonor.city}</p>
              <p>{selectedDonor.phone}</p>

              <button
                onClick={() => setSelectedDonor(null)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}