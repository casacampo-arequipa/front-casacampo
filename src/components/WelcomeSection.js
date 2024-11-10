import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import sliderData from "../data/slider.json"; // Importar el archivo JSON
import "../styles/slider.css";
import { translateText } from "./translateService";

const WelcomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("right");
  const [translatedSliderData, setTranslatedSliderData] = useState(sliderData); // Estado para los datos traducidos
  const { translations, language } = useContext(LanguageContext); // Cambiado translateDatabaseData a translateText

  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    if (typeof string === "string" && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string; // Retorna el string sin cambios si no es válido
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      changeSlide("right");
    }, 5000);

    return () => clearInterval(slideInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  // Traducción de los textos del slider al cargar o al cambiar el idioma
  useEffect(() => {
    const translateSliderTexts = async () => {
      const translatedData = await Promise.all(
        sliderData.map(async (slide) => {
          const translatedText = language !== "es"
            ? await translateText(slide.text, language)
            : slide.text;
  
          // Si translatedText es un array, toma el primer elemento
          const textToCapitalize = Array.isArray(translatedText)
            ? translatedText[0]
            : translatedText;
  
          // Verificar el texto traducido antes de capitalizar
          // console.log("Texto traducido antes de capitalizar:", textToCapitalize);
  
          // Asegúrate de capitalizar el texto traducido
          const capitalizedText = capitalizeFirstLetter(textToCapitalize);
  
          // Verificar el texto capitalizado
          // console.log("Texto capitalizado:", capitalizedText);
  
          return {
            ...slide,
            text: capitalizedText, // Usar el texto capitalizado
          };
        })
      );
      setTranslatedSliderData(translatedData);
    };
  
    translateSliderTexts();
  }, [language, translations]);

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
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % translatedSliderData.length
        );
      } else {
        setCurrentSlide(
          (prevSlide) =>
            (prevSlide - 1 + translatedSliderData.length) %
            translatedSliderData.length
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
      {translatedSliderData.map((slide, index) => (
        <div
          key={index}
          className={`slider-slide ${index === currentSlide ? "active" : ""} ${
            direction === "right" &&
            index === (currentSlide + 1) % translatedSliderData.length
              ? "translate-right"
              : direction === "left" &&
                index ===
                  (currentSlide - 1 + translatedSliderData.length) %
                    translatedSliderData.length
              ? "translate-left"
              : ""
          }`}
          style={{ backgroundImage: `url(${slide.url})` }}
        >
          <div className="slider-overlay">
            <div className="slider-content">
              <h1 className="text-4xl md:text-6xl py-4 font-serif">
                ¡Casa Campo Arequipa!
              </h1>
              <p className="mt-4 text-lg md:text-2xl font-serif">
                {slide.text} {/* Usar el texto traducido y capitalizado */}
              </p>
              <button
                onClick={() => scrollToSection("cabins")}
                className="mt-8 px-8 py-4 bg-emerald-800 hover:bg-orange-800 text-white font-bold rounded-full text-xl"
              >
                {translations.reservas}
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="slider-indicators">
        {translatedSliderData.map((_, index) => (
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
