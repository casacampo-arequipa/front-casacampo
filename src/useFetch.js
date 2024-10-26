import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "./env"



const useFetch = (endpoint, headers={}) =>{
    const [data, setData]=useState()
    const [error, setError]=useState()
    const [loading, setLoading]=useState(true)
    useEffect(()=>{
        setLoading(true); 
        axios
            .get(`${API_URL}/${endpoint}`)
            .then((resp)=>{
                setData(resp.data)
            })
            .catch((error)=>{
                setError(error)
            })
            .finally(()=>{
                setLoading(false)
            })
    },[endpoint])
    
    return {
        data, error, loading
    } 
    
}

export default useFetch