import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { LanguageContext } from "./LanguageContext";
import sliderData from "../data/slider.json";
import "../styles/slider.css";
import { translateText } from "./translateService";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Importa los íconos

Modal.setAppElement("#root");

const WelcomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("right");
  const [translatedSliderData, setTranslatedSliderData] = useState(sliderData);
  const { translations, language } = useContext(LanguageContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // const videos = [
  //   "/videos/Reel-llegar.mp4",
  //   "/videos/Video-casa-campo.mp4",
  //   "/videos/Inauguracion.mp4"
  // ];

  const capitalizeFirstLetter = (string) => {
    if (typeof string === "string" && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      changeSlide("right");
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  useEffect(() => {
    const translateSliderTexts = async () => {
      const translatedData = await Promise.all(
        sliderData.map(async (slide) => {
          const translatedText = language !== "es"
            ? await translateText(slide.text, language)
            : slide.text;
          const textToCapitalize = Array.isArray(translatedText)
            ? translatedText[0]
            : translatedText;
          const capitalizedText = capitalizeFirstLetter(textToCapitalize);
          return {
            ...slide,
            text: capitalizedText,
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

  const openModal = () => {
    setCurrentVideoIndex(0);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
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
                {slide.text}
              </p>
              <button
                onClick={openModal}
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
            onClick={() => changeSlide(null, index)}
          />
        ))}
      </div>

      {/* Modal para el reproductor de video personalizado en carrusel */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        style={{
          content: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "600px",
            height: "400px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="flex flex-col items-center relative">
          <div className="flex justify-between items-center w-full px-4">
            <h2 className="text-xl font-bold">Nuestros videos</h2>
            <button onClick={closeModal} className="text-red-500 font-bold">
              x
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center relative">
              {/* <button
                onClick={prevVideo}
                className="text-xl font-bold absolute left-0 px-4 bg-black bg-opacity-50 text-white rounded-full"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                <FaArrowLeft />
              </button> */}
            <video
              key={currentVideoIndex}
              width="560"
              height="315"
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()} 
            >
              <source src={videos[currentVideoIndex]} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
            <button
              onClick={nextVideo}
              className="text-xl font-bold absolute right-0 px-4 bg-black bg-opacity-50 text-white rounded-full"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WelcomeSection;
