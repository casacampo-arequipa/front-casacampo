import axios from "axios";

export const translateText = async (texts, targetLang) => {
  // Asegúrate de que texts sea un array
  if (!Array.isArray(texts)) {
    texts = [texts]; // Si no es un array, convierte a uno
  }

  const translations = await Promise.all(
    texts.map(async (text) => {
      try {
        // Genera una clave única para almacenar la traducción en el localStorage
        const localStorageKey = `translation-${text}-${targetLang}`;

        // Verifica si la traducción ya está almacenada en localStorage
        const cachedTranslation = localStorage.getItem(localStorageKey);

        if (cachedTranslation) {
          // console.log(`Usando traducción en caché para "${text}" en ${targetLang}: ${cachedTranslation}`);
          return cachedTranslation; // Retorna la traducción almacenada
        }

        const response = await axios.get(`http://3.85.56.160/translate?texts=${JSON.stringify([text])}&targetLang=${targetLang}`);

        console.log("Resultados de traducción:");

        // Verifica si el contenido es JSON antes de intentar parsearlo
        const contentType = response.headers["content-type"];
        if (contentType && contentType.includes("application/json")) {
          const translationData = response.data;

          // Procesa la traducción para el texto actual
          let translatedText = translationData[0].secondTranslationText;

          // Almacena la traducción en el localStorage
          localStorage.setItem(localStorageKey, translatedText);

          return translatedText; // Retorna el texto traducido
        } else {
          const textResponse = response.data; // Captura la respuesta como texto
          console.error("La respuesta no es JSON:", textResponse);
          throw new Error(
            "La API no devolvió un formato JSON válido. Respuesta: " +
              textResponse
          );
        }
      } catch (error) {
        console.error("Error en la traducción:", error);
        throw new Error("Error en la traducción: " + error.message); // Lanza un error para manejarlo en otro lugar
      }
    })
  );

  return translations; // Retorna un array con todas las traducciones
};
