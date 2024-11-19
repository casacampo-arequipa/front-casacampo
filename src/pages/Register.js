// src/pages/Register.js

import React, { useState } from 'react';
import Select from 'react-select';
import { getNames } from 'country-list';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-arequipa-remove.png'; // Asegúrate de que la ruta del logo sea correcta
import { API_URL } from '../env';

const Register = () => {
  const navigate = useNavigate();

  const countries = getNames().map((country) => ({ value: country, label: country }));

  // Form state


  // Error handling state
  const [errors, setErrors] = useState([]);





  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Set validation errors
        setErrors(error.response.data.errors || []);
      } else {
        // Handle other errors
        setErrors(['An unexpected error occurred. Please try again.']);
      }
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img src={logo} alt="Logo" className="h-24 mb-8" />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md font-serif">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">Nombre Completo</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded-md"
              required

            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Apellidos</label>
            <input
              type="text"
              id="lastname"
              className="w-full p-2 border border-gray-300 rounded-md"
              required

            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Teléfono</label>
            <input
              type="tel"
              id="phone"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">Correo</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              required

            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700">País</label>
            <Select
              options={countries}
              placeholder="Selecciona tu país"
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Usuario</label>
            <input
              type="text"
              id="user"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              value={formData.user}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Confirmar Contraseña</label>
            <input
              type="password_confirmation"
              id="password_confirmation"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">Registrarse</button>
        </form>
        {errors.length > 0 && (
          <div className="mt-4 text-red-500">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-4 text-center">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-500">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
