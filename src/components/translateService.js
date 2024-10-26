export const translateText = async (text, targetLang) => {
  try {
    // Genera una clave única para almacenar la traducción en el localStorage
    const localStorageKey = `translation-${text}-${targetLang}`;

    // Verifica si la traducción ya está almacenada en localStorage
    const cachedTranslation = localStorage.getItem(localStorageKey);

    if (cachedTranslation) {
      // console.log(`Usando traducción en caché para "${text}" en ${targetLang}: ${cachedTranslation}`);
      return cachedTranslation; // Retorna la traducción almacenada
    }
    
    const response = await fetch(`http://44.201.171.104/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text, targetLang }),
    });

    // Verificamos que la respuesta sea exitosa
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error en la respuesta del servidor:", errorText);
      throw new Error(
        `La API devolvió un estado de error: ${response.status} - ${response.statusText}`
      );
    }

    const contentType = response.headers.get("content-type");

    // Verifica si el contenido es JSON antes de intentar parsearlo
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      // console.log("Respuesta completa de la API de MyMemory:", data);

      let translatedText = data.translatedText;
      // console.log(`Traducción de "${text}" a "${targetLang}": ${translatedText}`);

      // Correcciones manuales
      if (text.toLowerCase() === "reservar" && targetLang === "en") {
        translatedText = "Reserve"; // Asegurar que "reservar" sea "Reserve"
      } else if (text.toLowerCase() === "reservas" && targetLang === "en") {
        translatedText = "Reserves"; // Asegurar que "reservas" sea "Reserves"
      }

      // Correcciones manuales
      if (text.toLowerCase() === "iniciar sesión" && targetLang === "en") {
        translatedText = "Sign In"; // Asegurar que "reservar" sea "Reserve"
      } else if (text.toLowerCase() === "registrarse" && targetLang === "en") {
        translatedText = "Sign Up"; // Asegurar que "reservas" sea "Reserves"
      }

      // Almacena la traducción en el localStorage
      localStorage.setItem(localStorageKey, translatedText);

      return translatedText; // Retorna el texto traducido
    } else {
      const textResponse = await response.text(); // Captura la respuesta como texto
      console.error("La respuesta no es JSON:", textResponse);
      throw new Error(
        "La API no devolvió un formato JSON válido. Respuesta: " + textResponse
      );
    }
  } catch (error) {
    console.error("Error en la traducción:", error);
    throw new Error("Error en la traducción: " + error.message); // Lanza un error para manejarlo en otro lugar
  }
};
