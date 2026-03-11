import { useEffect,useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import api from "../services/api"
import toast from "react-hot-toast"

export default function RequestInfo(){

  const {id} = useParams()
  const navigate = useNavigate()

  const [request,setRequest] = useState(null)

  const user = JSON.parse(localStorage.getItem("user"))



  const fetchRequest = async ()=>{

    try{

      const res = await api.get(`/requests/${id}`)

      setRequest(res.data.request)

    }catch{

      toast.error("Failed to load request")

    }

  }



  const acceptRequest = async ()=>{

    try{

      await api.patch(`/requests/${id}/accept`)

      toast.success("Request accepted")

      navigate("/requests")

    }catch(err){

      toast.error(err.response?.data?.message || "Error")

    }

  }



  useEffect(()=>{
    fetchRequest()
  },[])



  if(!request) return <p className="text-center mt-20">Loading...</p>



  return(

<div className="min-h-screen flex justify-center items-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-xl w-[450px]">

<h2 className="text-2xl font-bold mb-4">
{request.patientName}
</h2>

<p className="text-red-500 font-semibold mb-2">
Blood Group: {request.bloodGroup}
</p>

<p>Hospital: {request.hospital}</p>

<p>City: {request.city}</p>

<p>Area: {request.area}</p>

<p>Units Needed: {request.unitsNeeded}</p>



{request.status==="accepted" &&(

<p className="mt-4 text-green-600 font-semibold">
Accepted by {request.acceptedBy?.name || "Donor"}
</p>

)}



{user?.isDonor && request.status==="pending" &&(

<button
onClick={acceptRequest}
className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg"
>

Accept Request

</button>

)}

</div>

</div>

  )

}