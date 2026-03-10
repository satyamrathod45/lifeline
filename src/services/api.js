import axios from "axios"

const api = axios.create({
  baseURL: "https://lifeline-backend-1.onrender.com/api",
  withCredentials: true
})

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {
      console.log("User not authenticated")
    }

    return Promise.reject(error)
  }

)

export default api