import { useState, useMemo, useRef } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet"
import L from "leaflet"
import { LocateFixed, Search } from "lucide-react"

/* =========================
   ICONS
========================= */
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35]
})

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
  iconSize: [30, 30]
})

const selectedIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
  iconSize: [35, 35]
})

/* =========================
   DISTANCE
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

/* =========================
   MAP UPDATER
========================= */
function MapUpdater({ setHospitals, setLoading }) {

  let timeout

  useMapEvents({
    dragend: (e) => {

      clearTimeout(timeout)

      timeout = setTimeout(async () => {

        const map = e.target
        const bounds = map.getBounds()

        const south = bounds.getSouth()
        const west = bounds.getWest()
        const north = bounds.getNorth()
        const east = bounds.getEast()

        try {
          setLoading(true)

          const res = await fetch(
            `https://overpass-api.de/api/interpreter?data=[out:json];
            node["amenity"="hospital"](${south},${west},${north},${east});
            out;`
          )

          const data = await res.json()

          setHospitals((data.elements || []).slice(0, 30))

        } catch {
          console.log("error loading hospitals")
        }

        setLoading(false)

      }, 400)
    }
  })

  return null
}

export default function FindHospital() {

  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(null)

  const mapRef = useRef()

  /* =========================
     LOCATION
  ========================= */
  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude)
        setLng(pos.coords.longitude)
        toast.success("Location detected 📍")
      },
      () => toast.error("Permission denied")
    )
  }

  /* =========================
     FILTER
  ========================= */
  const filteredHospitals = useMemo(() => {
    if (!search) return hospitals

    return hospitals.filter(h =>
      h.tags?.name?.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, hospitals])

  /* =========================
     SEARCH ACTION
  ========================= */
  const handleSearch = () => {

    const found = hospitals.find(h =>
      h.tags?.name?.toLowerCase().includes(search.toLowerCase())
    )

    if (!found) return toast.error("Hospital not found")

    setSelected(found)

    if (mapRef.current) {
      mapRef.current.setView([found.lat, found.lon], 16)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7EFEA] px-4 py-10">

      <h1 className="text-3xl font-bold text-center mb-6">
        Find Hospitals Near You 🏥
      </h1>

      {/* SEARCH */}
      <div className="max-w-md mx-auto mb-6 flex gap-2">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search hospital..."
          className="flex-1 p-3 rounded-full border"
        />

        <button
          onClick={handleSearch}
          className="bg-red-500 text-white px-4 rounded-full"
        >
          <Search size={18}/>
        </button>

      </div>

      {/* LOCATION BUTTON */}
      <div className="flex justify-center mb-8">
        <button
          onClick={detectLocation}
          className="bg-blue-500 text-white px-6 py-3 rounded-full"
        >
          <LocateFixed size={18}/>
        </button>
      </div>

      {/* MAP */}
      {lat && (
        <div className="max-w-6xl mx-auto mb-10 rounded-3xl overflow-hidden shadow-xl relative">

          {/* ✅ TEXT LOADING */}
          {loading && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
              <p className="text-white text-lg font-semibold animate-pulse">
                Loading Hospitals...
              </p>
            </div>
          )}

          <MapContainer
            center={[lat, lng]}
            zoom={13}
            whenCreated={(map) => (mapRef.current = map)}
            style={{ height: "450px" }}
          >

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[lat, lng]} icon={userIcon}>
              <Popup>You are here 📍</Popup>
            </Marker>

            <MapUpdater setHospitals={setHospitals} setLoading={setLoading} />

            {filteredHospitals.map((h, i) => {
              const isSelected = selected === h

              return (
                <Marker
                  key={i}
                  position={[h.lat, h.lon]}
                  icon={isSelected ? selectedIcon : hospitalIcon}
                >
                  <Popup>
                    <b>{h.tags?.name || "Hospital"}</b>
                  </Popup>
                </Marker>
              )
            })}

          </MapContainer>
        </div>
      )}

      {/* ✅ CARD LOADING */}
      {loading && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-xl animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* CARDS */}
      {!loading && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

          {filteredHospitals.map((h, i) => {

            const distance = lat
              ? getDistance(lat, lng, h.lat, h.lon)
              : null

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-5 rounded-2xl shadow-xl text-center"
              >
                <h2 className="font-semibold">
                  {h.tags?.name || "Hospital"}
                </h2>

                {distance && (
                  <p className="text-sm text-gray-500">
                    {distance} km away
                  </p>
                )}

                <button
                  onClick={() =>
                    window.open(`https://www.google.com/maps?q=${h.lat},${h.lon}`)
                  }
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded-full"
                >
                  Open in Maps
                </button>

              </motion.div>
            )
          })}

        </div>
      )}

    </div>
  )
}