import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout"; // Importa DashboardLayout
import "./index.css";
import Cabanas from "./components/Cabanas";
import Promociones from "./components/Promociones";
import Descuentos from "./components/Descuentos";
import Reservas from "./components/Reservas";
import SocialMediaIcons from "./components/SocialMediaIcons";
import PaymentPage from "./components/PaymentPage";
import { LanguageProvider } from "./components/LanguageContext";
import Whasap from "./components/Whasap";
import Loader from "./components/Loader"; // Importa el componente Loader

import Inicio from "./views/client/Inicio";
import CabinDetail from "./views/client/CabinDetail";
import Navbar from "./views/client/partials/Navbar";
import Footer from "./views/client/partials/Footer";
import Usuarios from "./views/admin/Usuarios";

function Layout({ children }) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* Solo mostrar Navbar y Footer fuera de las rutas del dashboard */}
      {!isDashboard && <Navbar />}
      {!isDashboard && <Whasap />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true); // Estado para controlar el cargador

  useEffect(() => {
    // Simulación de carga (puedes reemplazar esto con tu lógica real)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Cargar durante 2 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          {loading && <Loader />} {/* Muestra el cargador si está cargando */}
          <Layout>
            {/* Rutas de las páginas */}
            <Routes>
              {/* Rutas públicas */}
              <Route
                path="/"
                element={
                  <>
                    <Inicio />
                    <SocialMediaIcons />
                  </>
                }
              />

              <Route
                path="/cabin-detail"
                element={
                  <>
                    <CabinDetail />
                    <SocialMediaIcons />
                  </>
                }
              />
              <Route path="/pago" element={<PaymentPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Dashboard con Sidebar persistente */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="cabanas" element={<Cabanas />} />
                <Route path="promociones" element={<Promociones />} />
                <Route path="descuentos" element={<Descuentos />} />
                <Route path="reservas" element={<Reservas />} />
              </Route>
            </Routes>
          </Layout>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
