import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa";
import { LanguageContext } from "../../../components/LanguageContext";
import { getUserData } from "../../../helpers/auth";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import Header from "../../../components/Navbar/Header"; // Asegura que el componente Header esté importado

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla el menú de usuario
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Controla el menú móvil
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  const userData = getUserData();
  const { translations } = useContext(LanguageContext);
  const menuRef = useRef(null); // Define menuRef aquí

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Alterna el menú de usuario
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen); // Alterna el menú móvil

  useEffect(() => {
    // Maneja el evento de clic fuera del menú para cerrar
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Maneja el evento de scroll para el color del fondo
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`${
        isHomePage ? "fixed" : "relative"
      } w-full px-4 py-3 top-0 z-50 transition-all duration-800 ${
        isHomePage
          ? scrollPosition > 0
            ? "bg-white/95 text-black shadow-lg rounded-b-xl border-b-2 border-b-red-800"
            : "bg-transparent text-white border-b-0 border-b-transparent"
          : "bg-white text-black shadow-lg rounded-b-xl border-b-2 border-b-red-800"
      }`}
    >
      <div className="flex h-[4.4rem] md:items-center items-end justify-between w-full">
        {/* Botón de menú para móvil y logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Ícono de menú en vista móvil */}
          <FaBars
            className="text-2xl cursor-pointer sm:hidden"
            onClick={toggleMobileMenu}
          />
          {/* Logo */}
          <a href="/">
            <img
              className="h-auto w-14 sm:w-24"
              src="/images/logo-arequipa-remove.png"
              alt="Logo"
            />
          </a>
          {/* Texto "Casa Campo Arequipa" oculto en vista móvil */}
          <div className="hidden sm:block cursor-pointer pt-1">
            <Link to="/">
              <h1 className="text-base sm:text-2xl font-bold text-red-700">
                Casa Campo
              </h1>
            </Link>
            <div className="text-xs sm:text-lg font-semibold -mt-1">Arequipa</div>
          </div>
        </div>

        {/* Menú desplegable en móvil */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 sm:hidden">
            <ul className="flex flex-col divide-y text-black">
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  {translations.inicio}
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link
                  to="#"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {translations.nosotros}
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link
                  to="#"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {translations.contactanos}
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/galeria" onClick={() => setIsMobileMenuOpen(false)}>
                  {translations.galeria}
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Menú de navegación para escritorio */}
        <div className="absolute top-12 left-0 right-0 hidden sm:flex justify-center text-sm">
          <ul className="flex divide-x opacity-0 md:opacity-100 duration-300">
            <li
              className={`cursor-pointer px-2 rounded ${
                isHomePage
                  ? scrollPosition > 0
                    ? "hover:bg-gray-200"
                    : "hover:bg-black/30"
                  : "hover:bg-gray-200"
              }`}
            >
              <a href="/">{translations.inicio}</a>
            </li>
            <li
              className={`cursor-pointer px-2 rounded ${
                isHomePage
                  ? scrollPosition > 0
                    ? "hover:bg-gray-200"
                    : "hover:bg-black/30"
                  : "hover:bg-gray-200"
              }`}
            >
              <Link onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
                {translations.nosotros}
              </Link>
            </li>
            <li
              className={`cursor-pointer px-2 rounded ${
                isHomePage
                  ? scrollPosition > 0
                    ? "hover:bg-gray-200"
                    : "hover:bg-black/30"
                  : "hover:bg-gray-200"
              }`}
            >
              <Link onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                {translations.contactanos}
              </Link>
            </li>
            <li
              className={`cursor-pointer px-2 rounded ${
                isHomePage
                  ? scrollPosition > 0
                    ? "hover:bg-gray-200"
                    : "hover:bg-black/30"
                  : "hover:bg-gray-200"
              }`}
            >
              <Link to="/galeria">{translations.galeria}</Link>
            </li>
          </ul>
        </div>

        {/* Icono de usuario y selector de idioma */}
        <div className="relative flex items-center justify-end w-12 sm:w-28 gap-5">
          <LanguageSwitcher />
          <FaUser className="text-2xl cursor-pointer" onClick={toggleMenu} />
          {isMenuOpen && (
            <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10 top-full">
              <ul className="py-2">
                {userData ? (
                  <>
                    <li className="px-4 py-2 text-sm">
                      Bienvenido, {userData.name}
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm">
                      <Link to="/dashboard">Admin</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm">
                      <button
                        onClick={() => {
                          localStorage.clear();
                          window.location.href = "/";
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <Link to="/login">{translations.iniciar}</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <Link to="/register">{translations.registrarse}</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Textos sobre el navbar */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <Header position={scrollPosition} page={isHomePage} />
      </div>
    </nav>
  );
}

export default Navbar;
