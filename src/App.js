import React, { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
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
import '@fortawesome/fontawesome-free/css/all.min.css';
import Inicio from "./views/client/Inicio";
import CabinDetail from "./views/client/CabinDetail";
import Navbar from "./views/client/partials/Navbar";
import Footer from "./views/client/partials/Footer";
import Usuarios from "./views/admin/Usuarios";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Tema de PrimeReact (elige el que prefieras)
import 'primereact/resources/primereact.min.css'; // Estilos de los componentes de PrimeReact
import 'primeicons/primeicons.css';
import Package from "./components/Package";
import Galeria from "./components/Galeria"; // Importa el componente Galeria
import { HashRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Dashboard from "./components/Dashboard";
import ProtectedAdminRoute from "./components/routes/ProtectedAdminRoute";
import Error404 from "./pages/Error404";




function Layout({ children }) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/admin");
  const isAccessDenied = location.pathname === "/access-denied";
  return (
    <>
      {/* Solo mostrar Navbar y Footer fuera de las rutas del dashboard */}
      {!isDashboard && !isAccessDenied && <Navbar />}
      {!isDashboard && !isAccessDenied && <Whasap />}
      {children}
      {!isDashboard && !isAccessDenied && <Footer />}
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
    <UserProvider>
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
                <Route
                  path="/galeria"
                  element={
                    <>
                      <Galeria />
                      <SocialMediaIcons />
                    </>
                  }
                />
                
                {/* Dashboard con Sidebar persistente */}
                <Route path="/admin" element={<DashboardLayout />}>
                  <Route
                    path="dashboard"
                    element={<ProtectedAdminRoute element={<Dashboard />} />}
                  />
                  <Route
                    path="usuarios"
                    element={<ProtectedAdminRoute element={<Usuarios />} />}
                  />
                  <Route
                    path="cabanas"
                    element={<ProtectedAdminRoute element={<Cabanas />} />}
                  />
                  <Route
                    path="promociones"
                    element={<ProtectedAdminRoute element={<Promociones />} />}
                  />
                  <Route
                    path="descuentos"
                    element={<ProtectedAdminRoute element={<Descuentos />} />}
                  />
                  <Route
                    path="paquetes"
                    element={<ProtectedAdminRoute element={<Package />} />}
                  />
                  <Route
                    path="reservas"
                    element={<ProtectedAdminRoute element={<Reservas />} />}
                  />
                </Route>
                <Route path="/access-denied" element={<Error404 />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      </LanguageProvider>
    </UserProvider>
  );
}

export default App;
