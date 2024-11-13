import React, { useContext, useState, useEffect, useRef } from "react";
import { LanguageContext } from "./LanguageContext";
import { FaGlobe } from "react-icons/fa";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar u ocultar el modal
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Posición del modal
  const containerRef = useRef(null); // Referencia para obtener la posición del contenedor
  const modalRef = useRef(null); // Referencia para el modal

  // Función para manejar el cambio de idioma
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowModal(false); // Cierra el modal después de seleccionar el idioma
  };

  // Función para obtener la abreviatura del idioma y la bandera
  const getAbbreviation = (lang) => {
    switch (lang) {
      case "es":
        return { abbreviation: "ES", flag: "/images/peru.png" }; // Bandera de Perú
      case "en":
        return { abbreviation: "EN", flag: "/images/eeu.png" }; // Bandera de Estados Unidos
      default:
        return { abbreviation: "EN", flag: "/images/eeu.png" }; // Por defecto, inglés
    }
  };

  // Efecto para calcular la posición del modal al mostrarlo
  useEffect(() => {
    if (showModal && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const modalHeight = 100; // Altura estimada del modal
      const modalWidth = 150; // Ancho del modal

      let top = containerRect.bottom + 5; // Posicionamos el modal debajo del contenedor
      let left = containerRect.left;

      // Asegurar que el modal no se salga por la derecha
      if (left + modalWidth > window.innerWidth) {
        left = window.innerWidth - modalWidth - 10; // Ajustar para que no se salga
      }

      // Asegurar que el modal no se salga por la parte inferior
      if (top + modalHeight > window.innerHeight) {
        top = containerRect.top - modalHeight - 5; // Mostrar arriba si no hay espacio abajo
      }

      setModalPosition({ top, left });
    }
  }, [showModal]);

  // Efecto para cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) && // Si el clic no es en el modal
        !containerRef.current.contains(event.target) // Ni en el contenedor del selector
      ) {
        setShowModal(false); // Cierra el modal
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Limpieza del evento al desmontar el componente o cerrar el modal
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const { abbreviation, flag } = getAbbreviation(language);

  return (
    <div ref={containerRef} className="absolute right-14 bottom-[-5px] sm:right-auto sm:bottom-auto flex sm:relative items-center">
      {/* Icono del mundo */}
      <FaGlobe className="text-[2rem] cursor-pointer" />

      {/* Abreviatura del idioma seleccionado con bandera */}
      <span
        style={styles.abbreviation}
        onClick={() => setShowModal(!showModal)} // También permite mostrar el modal al hacer clic en la abreviatura
      >
        <img
          src={flag}
          alt="Bandera"
          width={20}
          height={15}
          style={{ marginRight: "5px", verticalAlign: "middle" }}
        />
        {abbreviation}
      </span>

      {/* Modal debajo del icono y abreviatura */}
      {showModal && (
        <div
          ref={modalRef}
          style={{ ...styles.modal, top: modalPosition.top, right: "10px" }}
        >
          <div
            className="bg-slate-100"
            style={{
              margin: -10,
              borderRadius: "5px",
            }}
          >
            <h2
              style={{
                margin: 0,
                padding: "5px 10px",
                color: "gray",
                fontSize: "12px",
              }}
            >
              Idiomas Disponibles
            </h2>
          </div>
          <ul className="text-black" style={styles.languageList}>
            <li
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              style={styles.languageItem}
              onClick={() => handleLanguageChange("es")}
            >
              <img
                alt="Idioma Mundo"
                title="Idioma"
                src="/images/peru.png"
                width={25}
                height={25}
                style={{ cursor: "pointer" }}
              />
              Español
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              style={styles.languageItem}
              onClick={() => handleLanguageChange("en")}
            >
              <img
                alt="Idioma Mundo"
                title="Idioma"
                src="/images/eeu.png"
                width={25}
                height={25}
                style={{ cursor: "pointer" }}
              />
              English
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  abbreviation: {
    fontSize: "18px",
    fontWeight: "300",
    marginLeft: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  modal: {
    position: "fixed",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    width: "150px", // Ancho del modal
  },
  languageList: {
    listStyle: "none",
    padding: "10px 0 0 0",
    margin: 0,
  },
  languageItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0", // Espacio entre cada opción
    cursor: "pointer",
    textAlign: "center", // Centrar el texto de cada opción
    borderBottom: "1px solid #ccc", // Separador entre opciones
    transition: "background-color 0.3s",
    fontSize: "14px",
    gap: "10px",
  },
};

export default LanguageSwitcher;
