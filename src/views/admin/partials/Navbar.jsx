/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Dropdown } from "flowbite-react";
import { clearlocal } from "../../../helpers/auth";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

export default function Navbar({ setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hour, setHour] = useState(new Date().getHours());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (hour >= 0 && hour < 12) {
      setGreeting("Buenos días 👋!");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Buenas tardes 👋!");
    } else {
      setGreeting("Buenas noches 👋!");
    }
  }, [hour]);
  const handleLogout = () => {
    setLoading(true); // Muestra el loader

    // Simula un retraso de 2 segundos antes de limpiar y redirigir
    setTimeout(() => {
      clearlocal(); // Limpia el localStorage
      setLoading(false); // Oculta el loader
      navigate("/"); // Redirige al inicio
    }, 1000);
  };
  if (loading) {
    return <Loader />
  }
  return (
    <>
      <div className="sticky z-10 top-0 flex items-center w-full text-sm px-4 py-2">
        <div className="flex items-center justify-between w-full bg-gray-800 px-5 py-2 text-white rounded-xl">
          <div className="flex gap-4">

            <button onClick={() => setIsOpen(true)}
              type="button"
              className="flex items-center justify-center w-10 h-10 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-500 focus:bg-gray-600 active:bg-gray-700">
              <i className="fa-solid fa-bars-staggered fa-lg"></i>
            </button>

            <div className="hidden lg:flex items-center">
              <b>{greeting}</b>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/"
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-600 bg-gray-500 focus:bg-gray-500 active:bg-gray-700">
              <i className="fa-solid fa-globe"></i>
            </a>
            <button aria-label="notification"
              className="w-10 h-10 rounded-xl border border-gray-600 bg-gray-500 focus:bg-gray-500 active:bg-gray-700">
              <i className="fa-solid fa-bell"></i>
            </button>

            <div className="sm:flex sm:items-center">
              <div className="">
                <Dropdown label="Administrador" style={{ backgroundColor: 'gray' }}>
                  <Dropdown.Item onClick={() => navigate("/admin/dashboard")}>
                    Dashboard
                  </Dropdown.Item>
                  {/* <Dropdown.Item>Cuenta</Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
                </Dropdown>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
