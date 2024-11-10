import { TOKEN_NAME } from "../env"
import { USER_DATA } from "../env"
import CryptoJS from "crypto-js";
const SECRET_KEY = "mi_clave_segura";

export const token = () => localStorage.getItem(TOKEN_NAME)

export const user = () => localStorage.getItem(USER_DATA)

export const setToken = (token) => localStorage.setItem(TOKEN_NAME, token)


export const setUserData = (user) => {
  if (user) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), SECRET_KEY).toString();
    localStorage.setItem(USER_DATA, encryptedData);
    console.log("Datos de usuario cifrados y guardados en localStorage.");
  }
};

export const getUserData = () => {
  const encryptedData = localStorage.getItem(USER_DATA);
  if (encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData ? JSON.parse(decryptedData) : null;
  }
  return null;
};

export const deleteToken = () => localStorage.removeItem(TOKEN_NAME)

export const deleteUser = () => localStorage.removeItem(USER_DATA)

export const clearlocal = () => localStorage.clear()