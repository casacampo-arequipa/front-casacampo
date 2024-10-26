import React from 'react';
import wifiIcon from '../assets/wifi.png';
import Montain from '../assets/montana-fuji.png';
import Station from '../assets/estacionamiento.png';
import security from '../assets/circuito-cerrado-de-television.png';
import television from '../assets/smart-tv.png';
import piscina from '../assets/piscina.png';
import cocina from '../assets/cocina.png';
import fogata from '../assets/fuego.png';

const services = [
  {
    title: 'WiFi Gratuito',
    description: 'Conexión rápida y gratuita en todas las cabañas.',
    icon: wifiIcon,
  },
  {
    title: 'Vista a la Montaña',
    description: 'Rodeado de naturaleza para relajarse y disfrutar.',
    icon: Montain,
  },
  {
    title: 'Estacionamiento',
    description: 'Espacio seguro para guardar los vehículos.',
    icon: Station,
  },
  {
    title: 'Seguridad 24/7',
    description: 'Nuestras cámaras de seguridad están disponibles las 24 horas.',
    icon: security,
  },
  {
    title: 'Televisión',
    description: 'Entretenimiento, películas y música en los televisores smart tv.',
    icon: television,
  },
  {
    title: 'Piscina',
    description: 'Piscina al aire libre privada - abierto las 24 horas.',
    icon: piscina,
  },
  {
    title: 'Cocina',
    description: 'Los huéspedes pueden cocinar en este espacio',
    icon: cocina,
  },
  {
    title: 'Fogata',
    description: 'Realiza tu fogata bajo las estrellas y disfruta de la noche.',
    icon: fogata,
  },
];

const ServicesSection = () => {
  return (
    <div className="py-12 text-black border-t border-b border-gray-300 max-w-7xl mx-auto"> 
      <div className="container mx-auto px-4 text-center ">
        <h2 className="text-4xl font-medium mb-8">Servicios que Ofrecemos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={service.icon} alt={`${service.title} icon`} className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-medium mb-2">{service.title}</h3>
              <p className="text-stone-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
