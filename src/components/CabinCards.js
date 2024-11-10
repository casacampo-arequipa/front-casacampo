import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import cabana1 from "../assets/cabana1.jpg";
import cabana2 from "../assets/cabana1.jpg";
import { LanguageContext } from "./LanguageContext";
import useFetch from "../useFetch";

const CabinCards = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const {data, loading, error} = useFetch("cottage")
  console.log(data)
  const handleCardClick = (cabin) => {
    navigate("/cabin-detail", { state: { cabin } });
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const { translations } = useContext(LanguageContext);

  return (
    <div className="container mx-auto relative z-10">
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-center">
      {data?.cottages.map((cottage) => (
        <div
          key={cottage.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer max-w-md lg:max-w-lg mx-auto transform transition-all duration-300 hover:scale-105"
          onClick={() =>
            handleCardClick({
              cottage_id: cottage.id,
              name: cottage.name_cottage,
              image: cottage.image || cabana1, // Si tienes una URL de imagen, úsala aquí
              capacity: cottage.capacity,
              rooms: cottage.rooms,
              beds: cottage.beds,
              baths: cottage.bathrooms,
              description: cottage.description,
              price: cottage.price,
            })
          }
        >
          <img
            src={cottage.image || cabana1} // Usa `cottage.image` si está disponible
            alt={cottage.name_cottage}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
          />
          <div className="p-2 text-center">
            <h2 className="text-2xl font-bold">{cottage.name_cottage}</h2>
            <p className="text-gray-600">Capacidad: {cottage.capacity} personas</p>
            <p className="text-gray-600">Precio: ${cottage.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default CabinCards;
