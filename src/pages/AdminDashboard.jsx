import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [hospitalData, setHospitalData] = useState({
    hospitalName: "",
    email: "",
    phone: "",
    password: "",
    licenseNumber: "",
    city: "",
    area: "",
    address: "",
    coordinates: null,
  });

  // 🔥 FETCH USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FETCH HOSPITALS
  const fetchHospitals = async () => {
    try {
      const res = await api.get("/admin/hospitals");
      setHospitals(res.data.hospitals || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 SEARCH USERS
  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/users/search?query=${search}`);
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchHospitals();
  }, []);

  // 🚫 BAN / UNBAN
  const toggleBan = async (id, isBanned) => {
    try {
      if (isBanned) {
        await api.patch(`/admin/users/${id}/unban`);
      } else {
        await api.patch(`/admin/users/${id}/ban`);
      }
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // 📍 DETECT LOCATION
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        setHospitalData((prev) => ({ ...prev, coordinates: coords }));
      },
      (err) => {
        console.error(err);
        alert("Location permission denied");
      }
    );
  };

  // 🏥 CREATE HOSPITAL
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-red-600 to-red-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-3">
          {["users", "hospitals"].map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer p-3 rounded-lg ${activeTab === tab ? "bg-white text-red-600" : "hover:bg-red-700"}`}
            >
              {tab === "users" && "👥 Users"}
              {tab === "hospitals" && "🏥 Hospitals"}
            </li>
          ))}
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard 🚀</h1>

        {/* USERS */}
        {activeTab === "users" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Users</h2>
              <div className="flex gap-2">
                <input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border px-3 py-2 rounded-lg"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-4 rounded-lg"
                >
                  Search
                </button>
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10">
                      <div className="animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">No users found</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id} className="border-b">
                      <td className="p-3">{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.bloodGroup || "-"}</td>
                      <td>{u.isBanned ? "Banned" : "Active"}</td>
                      <td>
                        <button
                          onClick={() => toggleBan(u._id, u.isBanned)}
                          className={`px-3 py-1 text-white rounded ${u.isBanned ? "bg-green-600" : "bg-red-600"}`}
                        >
                          {u.isBanned ? "Unban" : "Ban"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* HOSPITALS */}
{/* HOSPITALS */}
{activeTab === "hospitals" && (
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-xl font-semibold mb-4">Hospitals</h2>

    <table className="w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3">Hospital Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>License</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan="7" className="text-center py-10">
              <div className="animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            </td>
          </tr>
        ) : hospitals.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center py-6 text-gray-500">
              No hospitals found
            </td>
          </tr>
        ) : (
          hospitals.map((h) => (
            <tr key={h._id} className="border-b">
              <td className="p-3">{h.hospitalName || h.name}</td>
              <td>{h.email}</td>
              <td>{h.phone}</td>
              <td>{h.city || "-"}</td>
              <td>{h.licenseNumber || "-"}</td>
              <td>{h.isBanned ? "Banned" : "Active"}</td>
              <td>
                <button
                  onClick={async () => {
                    try {
                      
                      if (h.isBanned) {
                        await api.patch(`/admin/hospitals/${h._id}/unban`);
                      } else {
                        await api.patch(`/admin/hospitals/${h._id}/ban`);
                        
                      }
                      fetchHospitals();
                    } catch (err) {
                      console.error(err.message);
                    }
                  }}
                  className={`px-3 py-1 text-white rounded ${
                    h.isBanned ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {h.isBanned ? "Unban" : "Ban"}
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)}  
      </div>
    </div>
  );
}
