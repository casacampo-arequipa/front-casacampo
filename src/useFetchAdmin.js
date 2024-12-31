import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "./env"
import { clearlocal, token } from "./helpers/auth"
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom"



const useFetch = (endpoint, headers = {}) => {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const isTokenExpired = () => {
        const token = localStorage.getItem("token");
        if (!token) return true;

        try {
            const { exp } = jwtDecode(token);
            return Date.now() >= exp * 1000; // Compara la fecha actual con la fecha de expiración
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // Si el token no es válido, considéralo expirado
        }
    };
    useEffect(() => {
        if (isTokenExpired()) {
            clearlocal();
        }
        setLoading(true);
        axios
            .get(`${API_URL}/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token()}`, // Añade el token al header
                },
            })
            .then((resp) => {
                setData(resp.data)
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [endpoint])

    return {
        data, error, loading
    }

}

export default useFetch