import { useEffect, useState } from "react"
import api from "../services/api"

export default function AdminDashboard() {

  const [users, setUsers] = useState([])
  const [hospitals, setHospitals] = useState([])
  const [activeTab, setActiveTab] = useState("users")

  const [hospitalData, setHospitalData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  })

  // 🔥 FETCH DATA
  const fetchUsers = async () => {
    const res = await api.get("/admin/users") // FIXED endpoint
    setUsers(res.data.users)
  }

  const fetchHospitals = async () => {
    const res = await api.get("/admin/hospitals")
    setHospitals(res.data.hospitals)
  }

  useEffect(() => {
    fetchUsers()
    fetchHospitals()
  }, [])

  // 🔥 CREATE HOSPITAL
  const handleCreateHospital = async () => {
    await api.post("/admin/create-hospital", hospitalData)
    alert("Hospital created 🏥")
    setHospitalData({ name: "", email: "", phone: "", password: "" })
    fetchHospitals()
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🧭 SIDEBAR */}
      <div className="w-64 bg-red-600 text-white p-6">

        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-4">

          <li
            onClick={() => setActiveTab("users")}
            className={`cursor-pointer p-2 rounded ${activeTab === "users" && "bg-red-800"}`}
          >
            👥 Users
          </li>

          <li
            onClick={() => setActiveTab("hospitals")}
            className={`cursor-pointer p-2 rounded ${activeTab === "hospitals" && "bg-red-800"}`}
          >
            🏥 Hospitals
          </li>

          <li
            onClick={() => setActiveTab("create")}
            className={`cursor-pointer p-2 rounded ${activeTab === "create" && "bg-red-800"}`}
          >
            ➕ Create Hospital
          </li>

        </ul>

      </div>

      {/* 📊 MAIN CONTENT */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard 🚀
        </h1>

        {/* USERS */}
        {activeTab === "users" && (
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-4">All Users</h2>

            <div className="space-y-3">
              {users.map(u => (
                <div key={u._id} className="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                  <span className="text-sm text-gray-400">{u.role}</span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* HOSPITALS */}
        {activeTab === "hospitals" && (
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-4">All Hospitals</h2>

            <div className="space-y-3">
              {hospitals.map(h => (
                <div key={h._id} className="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-semibold">{h.name}</p>
                    <p className="text-sm text-gray-500">{h.email}</p>
                  </div>
                  <span className="text-sm text-blue-500">Hospital</span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* CREATE HOSPITAL */}
        {activeTab === "create" && (
          <div className="bg-white p-6 rounded-xl shadow w-[400px]">

            <h2 className="text-xl font-semibold mb-4">Create Hospital</h2>

            <input
              placeholder="Name"
              className="w-full border p-3 mb-3 rounded-lg"
              value={hospitalData.name}
              onChange={(e)=>setHospitalData({...hospitalData, name:e.target.value})}
            />

            <input
              placeholder="Email"
              className="w-full border p-3 mb-3 rounded-lg"
              value={hospitalData.email}
              onChange={(e)=>setHospitalData({...hospitalData, email:e.target.value})}
            />

            <input
              placeholder="Phone"
              className="w-full border p-3 mb-3 rounded-lg"
              value={hospitalData.phone}
              onChange={(e)=>setHospitalData({...hospitalData, phone:e.target.value})}
            />

            <input
              placeholder="Password"
              type="password"
              className="w-full border p-3 mb-3 rounded-lg"
              value={hospitalData.password}
              onChange={(e)=>setHospitalData({...hospitalData, password:e.target.value})}
            />

            <button
              onClick={handleCreateHospital}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Create Hospital 🏥
            </button>

          </div>
        )}

      </div>

    </div>
  )
}