/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from "react";
import { translateText } from "./translateService";
import contentToTranslate from "../data/data.json";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "es"
  );
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState("Inicio");

  const getVisibleContentKeys = (currentView) => {
    return Object.keys(contentToTranslate[currentView] || {});
  };

  const translateContent = async (currentView) => {
    setLoading(true);
    setError(null);
    const newTranslations = {};
    const visibleKeys = getVisibleContentKeys(currentView);

    try {
      if (language !== "es") {
        // Traducción para otros idiomas
        const currentViewTranslations = await Promise.all(
          visibleKeys.map(async (key) => {
            if (contentToTranslate[currentView] && contentToTranslate[currentView][key]) {
              newTranslations[key] = await translateText(contentToTranslate[currentView][key], language);
            }
          })
        );
    
        // Traducción de textos generales
        const generalTranslations = await Promise.all(
          Object.keys(contentToTranslate["General"]).map(async (key) => {
            newTranslations[key] = await translateText(contentToTranslate["General"][key], language);
          })
        );
    
        setTranslations(newTranslations); // Actualiza todas las traducciones
    
        // Verificar si hay traducciones almacenadas
        const storedTranslations = localStorage.getItem(`translations-${language}`);
        if (storedTranslations) {
          const parsedStoredTranslations = JSON.parse(storedTranslations);
          visibleKeys.forEach((key) => {
            if (parsedStoredTranslations[key]) {
              newTranslations[key] = parsedStoredTranslations[key];
            } else {
              // Traduce el contenido si no está almacenado
              translateText(contentToTranslate[currentView][key], language)
                .then((translation) => {
                  newTranslations[key] = translation;
                  setTranslations((prev) => ({ ...prev, [key]: translation }));
                })
                .catch((error) => {
                  console.warn(`No se pudo traducir ${key}: ${error.message}`);
                  newTranslations[key] = contentToTranslate[currentView][key]; // Mantiene el texto original
                });
            }
          });
        } else {
          // Traduce y almacena si no hay traducciones almacenadas
          await Promise.all(
            visibleKeys.map(async (key) => {
              try {
                const translation = await translateText(contentToTranslate[currentView][key], language);
                newTranslations[key] = translation;
                localStorage.setItem(`translations-${language}`, JSON.stringify(newTranslations));
                setTranslations((prev) => ({ ...prev, [key]: translation }));
              } catch (error) {
                console.warn(`No se pudo traducir ${key}: ${error.message}`);
                newTranslations[key] = contentToTranslate[currentView][key]; // Mantiene el texto original
              }
            })
          );
        }
      } else {
        // Si el idioma es español, cargar el contenido original
        visibleKeys.forEach((key) => {
          newTranslations[key] = contentToTranslate[currentView][key]; // Cargar los textos de la vista actual en español
        });
    
        // Cargar también los textos generales en español
        Object.keys(contentToTranslate["General"]).forEach((key) => {
          if (contentToTranslate["General"][key]) {
            newTranslations[key] = contentToTranslate["General"][key]; // Cargar textos generales
          }
        });
    
        setTranslations(newTranslations); // Actualiza las traducciones con el contenido original en español
      }
    } catch (error) {
      console.error("Error al traducir contenido:", error);
      setError("Error al traducir el contenido.");
    } finally {
      setLoading(false);
    }
    
  }
   
  useEffect(() => {
    translateContent(currentView);
    localStorage.setItem("language", language);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, currentView]);

  useEffect(() => {
    if (language === "es") {
      const visibleKeys = getVisibleContentKeys(currentView);
      const initialTranslations = {};
      visibleKeys.forEach((key) => {
        initialTranslations[key] = contentToTranslate[currentView][key];
      });
      Object.keys(contentToTranslate["General"]).forEach((key) => {
        if (contentToTranslate["General"][key]) {
          initialTranslations[key] = contentToTranslate["General"][key]; // Cargar textos generales
        }
      });
      setTranslations(initialTranslations); // Cargar traducciones en español
    }
  }, [currentView, language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations,
        loading,
        error,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
