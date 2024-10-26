import React, { useState, useEffect, useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo-arequipa-remove.png';

const Navbar = ({ currentLanguage, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const menuRef = useRef(null);
  const location = useLocation(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={`${
        isHomePage ? 'fixed' : 'relative'
      } w-full flex items-center justify-between p-4 top-0 z-50 transition-all duration-800 ${
        isHomePage
          ? scrollPosition > 0
            ? 'bg-white text-black shadow-lg rounded-b-xl'
            : 'bg-transparent text-white'
          : 'bg-white text-black shadow-lg'
      }`}
    >
      <div className="flex items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 object-cover cursor-pointer sm:h-20 sm:w-20 md:h-28 md:w-28"
          />
        </Link>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center cursor-pointer">
        <Link to="/">
          <h1 className="text-sm sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight font-serif text-red-800">
            Casa Campo
          </h1>
        </Link>
        <span className="text-xs sm:text-lg md:text-xl font-semibold">Arequipa</span>
      </div>

      <div className="relative flex items-center space-x-4 ml-auto">
        <FaUser className="text-2xl cursor-pointer" onClick={toggleMenu} />

        {isMenuOpen && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10 top-full">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <Link to="/login">Iniciar Sesión</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <Link to="/register">Registrarse</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
