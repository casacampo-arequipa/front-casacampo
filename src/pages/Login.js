// src/pages/Login.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-arequipa-remove.png"; // Ensure the path is correct
import axios from "axios";
import { API_URL } from "../env";
import { getUserData, setToken } from "../helpers/auth";
import { setUserData } from "../helpers/auth";

const Login = () => {
  const nav = useNavigate();
  const [error, setError] = useState();

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post(`${API_URL}/auth/login`, data)
      .then((resp) => {
        setToken(resp.data.token.access_token);
        setUserData(resp.data.user)
        if (getUserData().role == "Admin") {
          console.log(getUserData().role)
          nav("/dashboard");
        } else {
          nav("/");
        }
        
        alert("Usuario Logeado");
      })
      .catch((error) => {
        setError(error);
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
