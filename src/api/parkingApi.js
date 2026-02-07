import axios from "axios"

// Function to get all parkings
const getAllParkings =  async (cityId) =>{
    try{
        const res = axios.get(`${import.meta.env.VITE_API_URL}/parking/${cityId}`)
        return res.data

    }catch(err){
        throw err
    }
}

// Function to get single parking
const getSingleParking =  async (id) =>{
    try{
        const res = axios.get(`${import.meta.env.VITE_API_URL}/parking/single/${id}`)
        return res.data
        
    }catch(err){
        throw err
    }
}