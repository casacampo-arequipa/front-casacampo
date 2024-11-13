import React from 'react';
import backgroundImage from '../assets/logo-arequipa-remove.png';

const AboutSection = () => {
  return (
    <div className="relative w-full py-10  text-black">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="flex-1 md:w-1/2 mb-6 md:mb-0 font-serif">
          <h2 className="text-3xl font-medium mb-6">Descubre Casa Campo Arequipa</h2>
          <p className="text-lg md:text-xl mb-4">
            Ubicado en el corazón de Arequipa, Casa Campo Arequipa ofrece una experiencia única de estadía rodeado de la belleza natural. te invitamos a desconectar de la rutina diaria y sumergirte en un entorno tranquilo lleno de árboles y vegetación exuberante.
          </p>
          <p className="text-lg md:text-xl mb-4">
            Desde nuestras cabañas, disfrutarás de vistas espectaculares del majestuoso volcán Misti y de la vibrante ciudad de Arequipa. Cada rincón de nuestra propiedad ha sido diseñado para ofrecerte comodidad y paz, con un ambiente que te hará sentir en contacto con la naturaleza.
          </p>
          <p className="text-lg md:text-xl">
            Ya sea que estés buscando un escape relajante o una base para explorar la región, Casa Campo Arequipa es el lugar perfecto para disfrutar de una experiencia inolvidable. Ven y descubre por qué somos el destino ideal para tu próxima aventura.
          </p>
        </div>
        <div className="flex-1 md:w-1/2 m-14">
          <img src={backgroundImage} alt="Vista de Casa Campo Arequipa" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
