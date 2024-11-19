import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import cabana1 from "../assets/cabana1.jpg";
import cabana2 from "../assets/cabana2.jpg"; // Asegúrate de tener una imagen diferente aquí
import { LanguageContext } from "./LanguageContext";
import axios from "axios";
import { API_URL } from "../env";

const CabinCards = ({ packageId, max_person, name, description }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [data, setData] = useState()
  const [error, setError] = useState()
  console.log(max_person)
  useEffect(() => {
    if (packageId) {
      axios.get(`${API_URL}/cottage`, { params: { package_id: packageId } })
        .then((resp) => {
          setData(resp.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [packageId])

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
        {data?.cottages.map((cottage, index) => (
          <div
            key={cottage.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer max-w-md lg:max-w-lg mx-auto transform transition-all duration-300 hover:scale-105"
            onClick={() =>
              handleCardClick({
                cottage_id: cottage.id,
                name_cottage: cottage.name_cottage,
                image: cottage.image || (index % 2 === 0 ? cabana1 : cabana2), // Alterna entre cabana1 y cabana2
                capacity: cottage.capacity,
                rooms: cottage.rooms,
                beds: cottage.beds,
                baths: cottage.bathrooms,
                clear: cottage.clear,
                garantia: cottage.garantia,
                description: cottage.description,
                max_person: max_person,
                name: name,
                description: description,
                price_monday_to_thursday: cottage.price_monday_to_thursday,
                price_friday_to_sunday: cottage.price_friday_to_sunday,
              })
            }
          >
            <img
              src={cottage.image || (index % 2 === 0 ? cabana1 : cabana2)} // Alterna entre cabana1 y cabana2
              alt={cottage.name_cottage}
              className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
            />
            <div className="p-2 text-center">
              <h2 className="text-2xl font-bold">{cottage.name_cottage}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CabinCards;
