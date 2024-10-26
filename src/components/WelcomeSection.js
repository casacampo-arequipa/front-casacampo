import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import sliderData from "../data/slider.json"; // Importar el archivo JSON
import '../styles/slider.css'

const WelcomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("right");
  const { translations } = useContext(LanguageContext);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      changeSlide("right");
    }, 5000);

    return () => clearInterval(slideInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  const changeSlide = (newDirection, targetSlide = null) => {
    if (targetSlide !== null) {
      if (targetSlide > currentSlide) {
        setDirection("right");
      } else if (targetSlide < currentSlide) {
        setDirection("left");
      }
      setCurrentSlide(targetSlide);
    } else {
      setDirection(newDirection);

      if (newDirection === "right") {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
      } else {
        setCurrentSlide(
          (prevSlide) => (prevSlide - 1 + sliderData.length) % sliderData.length
        );
      }
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="slider-container">
      {/* Contenedor de las imágenes con transición */}
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`slider-slide ${
            index === currentSlide ? "active" : ""
          } ${
            direction === "right" && index === (currentSlide + 1) % sliderData.length
              ? "translate-right"
              : direction === "left" && index === (currentSlide - 1 + sliderData.length) % sliderData.length
              ? "translate-left"
              : ""
          }`}
          style={{ backgroundImage: `url(${slide.url})` }}
        >
          <div className="slider-overlay">
            <div className="slider-content">
              <h1 className="text-4xl md:text-6xl py-4 font-serif">¡Casa Campo Arequipa!</h1>
              <p className="mt-4 text-lg md:text-2xl font-serif">{slide.text}</p>
              <button onClick={() => scrollToSection("cabins")}  className="mt-8 px-8 py-4 bg-emerald-800 hover:bg-orange-800 text-white font-bold rounded-full text-xl">
                {translations.reservas}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Indicadores */}
      <div className="slider-indicators">
        {sliderData.map((_, index) => (
          <div
            key={index}
            className={`slider-indicator ${
              index === currentSlide ? "indicator-active" : "indicator-inactive"
            }`}
            onClick={() => changeSlide(null, index)} // Cambiar al hacer clic en el punto indicador
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomeSection;
