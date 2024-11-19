import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-arequipa-remove.png"; // Asegúrate de que la ruta sea correcta
import axios from "axios";
import { API_URL } from "../env";
import { getUserData, setToken, setUserData } from "../helpers/auth";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la página previa
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post(`${API_URL}/auth/login`, data)
      .then((resp) => {
        setUser(resp.data.user);
        setToken(resp.data.token.access_token);
<<<<<<< Updated upstream
        setUserData(resp.data.user)
        if (getUserData().role == "Admin") {
         
          nav("/dashboard");
=======
        setUserData(resp.data.user);

        const { from, cabin, dates, guests } = location.state || {}; // Recupera los datos previos

        if (from) {
          // Redirige a la página previa con los datos previos
          navigate(from, { state: { cabin, dates, guests } });
>>>>>>> Stashed changes
        } else {
          // Redirige según el rol del usuario
          const role = getUserData().role;
          navigate(role === "Admin" ? "/dashboard" : "/");
        }

        alert("Usuario Logueado");
      })
      .catch((error) => {
        setError("Credenciales inválidas. Intenta nuevamente.");
        console.error(error);
      });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <img src={logo} alt="Logo" className="h-24 mb-4" />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Usuario
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
          >
            Iniciar Sesión
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <p className="mt-4 text-center">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
