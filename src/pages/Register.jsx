import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Register() {

  const navigate = useNavigate()

  const [form,setForm] = useState({
    name:"",
    phone:"",
    email:"",
    password:"",
    role:"receiver",
    bloodGroup:"",
    city:"",
    area:"",
    coordinates:[79.0882,21.1458]
  })

  const handleSubmit = async(e)=>{

    e.preventDefault()

    try{

      await api.post("/auth/register",form)

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
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          placeholder="Name"
          className="w-full border p-3 mb-3 rounded"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

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

        <select
          className="w-full border p-3 mb-3 rounded"
          onChange={(e)=>setForm({...form,role:e.target.value})}
        >
          <option value="receiver">Receiver</option>
          <option value="donor">Donor</option>
        </select>

        <input
          placeholder="Blood Group"
          className="w-full border p-3 mb-3 rounded"
          onChange={(e)=>setForm({...form,bloodGroup:e.target.value})}
        />

        <input
          placeholder="City"
          className="w-full border p-3 mb-3 rounded"
          onChange={(e)=>setForm({...form,city:e.target.value})}
        />

        <input
          placeholder="Area"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e)=>setForm({...form,area:e.target.value})}
        />

        <button className="w-full bg-red-600 text-white py-3 rounded-lg">
          Register
        </button>

      </form>

    </div>

  )

}