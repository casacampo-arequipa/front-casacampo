// src/pages/DashboardLayout.js
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import Navbar from "./../views/admin/partials/Navbar";
import Footer from "./../views/admin/partials/Footer";
import { getHeader, getSection } from "../utils/dashboardUtils";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
              href="/dashboard/dashboard"
              class="text-gray-700 hover:text-gray-800"
            >
              <i class="fa-solid fa-house-chimney"></i> /
            </a>{" "}
            <span className="text-gray-500">{getHeader(location.pathname)}</span>{" "}/{" "}
            <span className="font-semibold">{getSection(location.pathname)}</span>
          </div>
          <Outlet /> {/* Muestra el contenido de las rutas hijas */}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
