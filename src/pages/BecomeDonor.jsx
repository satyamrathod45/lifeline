import { useState } from "react"
import api from "../services/api"

export default function BecomeDonor(){

  const [bloodGroup,setBloodGroup] = useState("")

  const handleSubmit = async(e)=>{

    e.preventDefault()

    try{

      await api.patch("/user/become-donor",{
        bloodGroup
      })

      alert("You are now a donor 🩸")

    }catch(err){

      alert(err.response?.data?.message || "Failed")

    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Become a Blood Donor
        </h2>

        <select
          value={bloodGroup}
          onChange={(e)=>setBloodGroup(e.target.value)}
          className="w-full border p-3 mb-4 rounded"
        >
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <button className="w-full bg-red-600 text-white py-3 rounded-lg">
          Become Donor
        </button>

      </form>

    </div>

  )

}