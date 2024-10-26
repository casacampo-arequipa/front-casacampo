import React from "react";
import "../styles/Loader.css"; // Importa el CSS para el cargador

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <img src="/images/logo-arequipa-remove.png" alt="Logo-Casa-Campo"/>
      </div>
    </div>
  );
};

export default Loader;
