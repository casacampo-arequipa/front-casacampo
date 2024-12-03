// src/pages/DashboardLayout.js
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import Navbar from "./../views/admin/partials/Navbar";
import Footer from "./../views/admin/partials/Footer";
import { getHeader, getSection } from "../utils/dashboardUtils";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [latestReservations, setLatestReservations] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    // Aquí podrías hacer una llamada a la API para obtener los datos dinámicos.
    setLatestReservations([
      { id: 1, user: 'Usuario 1', date: '2024-12-01', cabin: 'Cabaña 3' },
      { id: 2, user: 'Usuario 2', date: '2024-12-02', cabin: 'Cabaña 5' },
      { id: 3, user: 'Usuario 3', date: '2024-12-03', cabin: 'Cabaña 1' },
      { id: 4, user: 'Usuario 4', date: '2024-12-04', cabin: 'Cabaña 2' },
      { id: 5, user: 'Usuario 5', date: '2024-12-05', cabin: 'Cabaña 4' }
    ]);
  }, []);

  const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Usuarios Registrados',
        data: [12, 19, 3, 5, 2, 3, 7, 12, 15, 20, 18, 25],
        borderColor: '#A91729',
        backgroundColor: 'rgba(169, 23, 41, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Reservas',
        data: [8, 15, 12, 9, 11, 13, 16, 19, 21, 22, 24, 30],
        borderColor: '#F3F4F6',
        backgroundColor: 'rgba(243, 244, 246, 0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  };
  return (
    <div className="flex h-screen overflow-y-hidden relative bg-gray-100">
      <div class="bg-gradient-to-bl to-red-800 from-rose-700 w-[90%] absolute top-0 right-0 py-36 rounded-bl-full"></div>

      <div class="bg-gradient-to-bl to-red-800 from-rose-700 absolute bottom-0 p-16 rounded-tr-full"></div>
      <div class="bg-gradient-to-bl to-red-800 from-rose-700 absolute bottom-0 right-0 p-24 rounded-tl-full"></div>

      {/* Sidebar persistente */}
      <div className="py-2 pl-3 z-50">
        <SidebarAdmin isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Navbar setIsOpen={setIsOpen} />
        <main class="grow px-4 py-2">
          <div class="text-xs sm:text-sm text-gray-700 bg-gray-200/80 mb-4 rounded-xl px-4 py-2">
            <a
              href="/dashboard"
              class="text-gray-700 hover:text-gray-800"
            >
              <i class="fa-solid fa-house-chimney"></i> /
            </a>{" "}
            <span className="text-gray-500">{getHeader(location.pathname)}</span>{" "}/{" "}
            <span className="font-semibold">{getSection(location.pathname)}</span>
          </div>
          <Outlet /> {/* Muestra el contenido de las rutas hijas */}
        </main>
        <div className="p-6 bg-white rounded-lg shadow-lg space-y-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

          {/* Section 1: Key Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#A91729] text-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Usuarios</h2>
              <p className="text-2xl">145</p>
            </div>
            <div className="bg-[#F3F4F6] text-gray-800 p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Reservas</h2>
              <p className="text-2xl">98</p>
            </div>
            <div className="bg-[#A91729] text-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Cabañas</h2>
              <p className="text-2xl">12</p>
            </div>
            <div className="bg-[#F3F4F6] text-gray-800 p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Promociones</h2>
              <p className="text-2xl">5</p>
            </div>
            <div className="bg-[#A91729] text-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Paquetes</h2>
              <p className="text-2xl">8</p>
            </div>
          </div>

          {/* Section 2: Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tendencia de Usuarios y Reservas</h2>
            <Line data={chartData} />
          </div>

          {/* Section 3: Latest Reservations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimas 5 Reservas</h2>
            <ul className="space-y-2">
              {latestReservations.map((reservation) => (
                <li key={reservation.id} className="p-4 border-b border-gray-200">
                  <p><strong>Usuario:</strong> {reservation.user}</p>
                  <p><strong>Fecha:</strong> {reservation.date}</p>
                  <p><strong>Cabaña:</strong> {reservation.cabin}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Calendar */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Calendario de Reservas</h2>
            <Calendar
              onChange={setCalendarDate}
              value={calendarDate}
              tileClassName="bg-gray-200"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
