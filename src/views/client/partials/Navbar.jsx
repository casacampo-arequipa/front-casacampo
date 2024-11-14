import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../../components/Navbar/Header";
import { FaUser } from "react-icons/fa";
import { LanguageContext } from "../../../components/LanguageContext";
import { getUserData } from "../../../helpers/auth";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const menuRef = useRef(null);
  const location = useLocation();
  const userData = getUserData();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  window.addEventListener("scroll", () => {
    setScrollPosition(window.scrollY);
  });

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isHomePage = location.pathname === "/";
  const { translations } = useContext(LanguageContext);

  return (
    <nav
      className={`${
        isHomePage
          ? "fixed"
          : "relative"
      } w-full px-4 py-3 top-0 z-50 transition-all duration-800 ${
        isHomePage
          ? scrollPosition > 0
            ? "bg-white/95 text-black shadow-lg rounded-b-xl border-b-2 border-b-red-800"
            : "bg-transparent text-white border-b-0 border-b-transparent"
          : "bg-white text-black shadow-lg rounded-b-xl border-b-2 border-b-red-800"
      }`}
    >
      <div className="flex h-[4.4rem] md:items-center items-end md:pb-0 pb-2 justify-between w-full">
        <div className="flex gap-2 sm:gap-4">
          <a href="/">
            <img
              className="h-auto w-14 sm:w-24"
              src="/images/logo-arequipa-remove.png"
              alt="Logo"
            />
          </a>
          <div className="cursor-pointer pt-1">
            <Link to="/">
              <h1 className="text-base sm:text-2xl font-bold text-red-700">
                Casa Campo
              </h1>
            </Link>
            <div className="text-xs sm:text-lg font-semibold -mt-1">Arequipa</div>
          </div>
        </div>

        <div className="absolute top-12 left-0 right-0 flex justify-center text-sm">
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
              <Link onClick={() => scrollToSection("about")}>{translations.nosotros}</Link>
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
              <Link onClick={() => scrollToSection("contact")}>{translations.contactanos}</Link>
            </li>
            {/* Agregar enlace a la galería */}
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

        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <Header position={scrollPosition} page={isHomePage} />
        </div>

        <div className="relative flex items-center justify-end w-12 sm:w-28 gap-5">
          <div>
            <LanguageSwitcher />
          </div>
          <FaUser
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10 top-full"
            >
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
    </nav>
  );
}

export default Navbar;
