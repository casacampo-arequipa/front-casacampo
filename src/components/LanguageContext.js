/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from "react";
import { translateText } from "./translateService";
import esTranslations from "../data/data.json";
import enTranslations from "../data/en.json";

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
    return Object.keys(esTranslations[currentView] || {});
  };

  const translateDatabaseData = async (data, targetLang) => {
    if (targetLang === "es") return data;

    const textsToTranslate = [];

    const extractTexts = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "string") {
          textsToTranslate.push(obj[key]);
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((item) => extractTexts(item));
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          extractTexts(obj[key]);
        }
      }
    };

    extractTexts(data);

    const translatedTexts = await translateText(textsToTranslate, targetLang);

    let translationIndex = 0;
    const applyTranslations = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "string") {
          obj[key] = translatedTexts[translationIndex++];
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((item) => applyTranslations(item));
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          applyTranslations(obj[key]);
        }
      }
    };

    const translatedData = JSON.parse(JSON.stringify(data));
    applyTranslations(translatedData);

    return translatedData;
  };

  const translateContent = async (currentView) => {
    setLoading(true);
    setError(null);
    const newTranslations = {};
    const visibleKeys = getVisibleContentKeys(currentView);

    try {
      if (language !== "es") {
        visibleKeys.forEach((key) => {
          newTranslations[key] = enTranslations[currentView][key];
        });

        Object.keys(enTranslations["General"]).forEach((key) => {
          if (enTranslations["General"][key]) {
            newTranslations[key] = enTranslations["General"][key];
          }
        });

        setTranslations(newTranslations);
      } else {
        visibleKeys.forEach((key) => {
          newTranslations[key] = esTranslations[currentView][key];
        });

        Object.keys(esTranslations["General"]).forEach((key) => {
          if (esTranslations["General"][key]) {
            newTranslations[key] = esTranslations["General"][key];
          }
        });

        setTranslations(newTranslations);
      }
    } catch (error) {
      console.error("Error al traducir contenido:", error);
      setError("Error al traducir el contenido.");
    } finally {
      setLoading(false);
    }
  };

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
        initialTranslations[key] = esTranslations[currentView][key];
      });
      Object.keys(esTranslations["General"]).forEach((key) => {
        if (esTranslations["General"][key]) {
          initialTranslations[key] = esTranslations["General"][key];
        }
      });
      setTranslations(initialTranslations);
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
        translateDatabaseData, // Exponer la función para traducir datos de la base de datos
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
