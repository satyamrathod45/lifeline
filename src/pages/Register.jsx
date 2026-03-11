import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Register(){

  const navigate = useNavigate()

  const [accountType,setAccountType] = useState("user")

  const [form,setForm] = useState({

    name:"",
    hospitalName:"",
    phone:"",
    email:"",
    password:"",
    isDonor:false,
    bloodGroup:"",
    licenseNumber:"",
    city:"",
    area:"",
    address:"",
    coordinates:[]

  })


  const getLocation = ()=>{

    if(!navigator.geolocation){
      alert("Geolocation not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(

      async(position)=>{

        const lat = position.coords.latitude
        const lng = position.coords.longitude

        try{

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          )

          const data = await res.json()

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            ""

          const area =
            data.address.suburb ||
            data.address.neighbourhood ||
            data.address.road ||
            ""

          setForm(prev=>({
            ...prev,
            coordinates:[lng,lat],
            city,
            area
          }))

          alert("Location captured 📍")

        }catch(err){
          alert("Location detect failed")
        }

      }

    )

  }


  const handleSubmit = async(e)=>{

    e.preventDefault()

    try{

      if(accountType === "hospital"){

        await api.post("/hospital/register",form)

      }else{

        await api.post("/auth/register",{
          ...form,
          role:"user"
        })

      }

      alert("Registration successful")
      navigate("/login")

    }catch(err){

      console.log(err.response?.data)
      alert("Registration failed")

    }

  }


  return(

  <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-[420px]"
    >

      <h2 className="text-2xl font-bold mb-6 text-center">
        Register
      </h2>


      {/* ACCOUNT TYPE */}

      <select
        className="w-full border p-3 mb-3 rounded"
        value={accountType}
        onChange={(e)=>setAccountType(e.target.value)}
      >

        <option value="user">User</option>
        <option value="hospital">Hospital</option>

      </select>


      {/* USER NAME OR HOSPITAL NAME */}

      {accountType === "hospital" ? (

        <input
          placeholder="Hospital Name"
          className="w-full border p-3 mb-3 rounded"
          onChange={(e)=>setForm({...form,hospitalName:e.target.value})}
        />

      ) : (

        <input
          placeholder="Name"
          className="w-full border p-3 mb-3 rounded"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

      )}


      <input
        placeholder="Phone"
        className="w-full border p-3 mb-3 rounded"
        onChange={(e)=>setForm({...form,phone:e.target.value})}
      />


      <input
        placeholder="Email"
        className="w-full border p-3 mb-3 rounded"
        onChange={(e)=>setForm({...form,email:e.target.value})}
      />


      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 mb-3 rounded"
        onChange={(e)=>setForm({...form,password:e.target.value})}
      />


      {/* DONOR OPTION */}

      {accountType === "user" && (

        <label className="flex items-center gap-2 mb-3">

          <input
            type="checkbox"
            checked={form.isDonor}
            onChange={(e)=>setForm({...form,isDonor:e.target.checked})}
          />

          Become a Blood Donor 🩸

        </label>

      )}


      {/* BLOOD GROUP */}

      {form.isDonor && accountType === "user" && (

        <select
          className="w-full border p-3 mb-3 rounded"
          onChange={(e)=>setForm({...form,bloodGroup:e.target.value})}
        >

          <option value="">Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>

        </select>

      )}


      {/* HOSPITAL LICENSE */}

      {accountType === "hospital" && (

        <input
          placeholder="Hospital License Number"
          className="w-full border p-3 mb-3 rounded"
          onChange={(e)=>setForm({...form,licenseNumber:e.target.value})}
        />

      )}


      <input
        placeholder="City"
        className="w-full border p-3 mb-3 rounded"
        value={form.city}
        onChange={(e)=>setForm({...form,city:e.target.value})}
      />


      <input
        placeholder="Area"
        className="w-full border p-3 mb-3 rounded"
        value={form.area}
        onChange={(e)=>setForm({...form,area:e.target.value})}
      />


      <button
        type="button"
        onClick={getLocation}
        className="w-full bg-blue-500 text-white py-2 rounded mb-3"
      >
        Detect My Location 📍
      </button>


      <button className="w-full bg-red-600 text-white py-3 rounded-lg">
        Register
      </button>

    </form>

  </div>

  )

}