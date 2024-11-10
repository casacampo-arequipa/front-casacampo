import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { LanguageContext } from "./LanguageContext";

const CabinDetail = () => {
  const comments = [
    {
      author: "Juan Pérez",
      date: "2024-09-15",
      text: "¡Excelente cabaña! El lugar es muy acogedor y las vistas son increíbles. Recomiendo esta cabaña a todos los que buscan una escapada tranquila.",
    },
    {
      author: "Ana Gómez",
      date: "2024-09-10",
      text: "Nos encantó nuestra estancia. La cabaña estaba limpia y bien equipada. Sin duda volveremos.",
    },
    {
      author: "Carlos Fernández",
      date: "2024-09-08",
      text: "La cabaña tiene todo lo que necesitas para una estancia cómoda. Sin embargo, el proceso de reserva podría ser más claro.",
    },
    {
      author: "Laura Martínez",
      date: "2024-09-05",
      text: "Muy buena experiencia. El entorno es perfecto para relajarse y desconectar. El personal fue muy amable.",
    },
    {
      author: "Pedro Ruiz",
      date: "2024-09-02",
      text: "Disfrutamos mucho de nuestra estancia. La cabaña es bonita y bien cuidada. Solo desearía que hubiera más opciones de actividades en la zona.",
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const cabin = location.state?.cabin || {};
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [guests, setGuests] = useState({ adults: 1, children: 0, babies: 0 });
  const [promoCode, setPromoCode] = useState("");
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const calculateTotal = () => {
    const numberOfNights = (dates[1] - dates[0]) / (1000 * 60 * 60 * 24);
    return numberOfNights * cabin.price;
  };

  const numberOfNights = (dates[1] - dates[0]) / (1000 * 60 * 60 * 24);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const isStartDate =
        dates[0] && date.toDateString() === dates[0].toDateString();
      const isEndDate =
        dates[1] && date.toDateString() === dates[1].toDateString();
      const isWithinRange =
        dates[0] && dates[1] && date >= dates[0] && date <= dates[1];

      if (isStartDate || isEndDate || isWithinRange) {
        return "bg-orange-700 text-white rounded-lg";
      }
    }
    return "";
  };

  const handleGuestChange = (type, operation) => {
    setGuests((prevGuests) => {
      const updatedGuests = { ...prevGuests };
      if (operation === "increment") {
        updatedGuests[type]++;
      } else if (operation === "decrement" && updatedGuests[type] > 0) {
        updatedGuests[type]--;
      }
      return updatedGuests;
    });
  };

  const handleReservation = () => {
    const total = calculateTotal();
    navigate("/pago", { state: { dates, guests, total } });
  };

  const { translations, setCurrentView } = useContext(LanguageContext);

  useEffect(() => {
    setCurrentView("CabinDetail"); // Cambia "MyComponent" por el nombre de tu componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 font-serif">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={cabin.image}
            alt={cabin.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div className="my-12">
            <h1 className="text-3xl font-bold ">{cabin.name}</h1>
            <div className="flex flex-row">
              <p className="text-gray-600"> {cabin.capacity} personas • </p>
              <p className="text-gray-600"> {cabin.rooms} Habitaciones • </p>
              <p className="text-gray-600"> {cabin.beds} Camas • </p>
              <p className="text-gray-600"> {cabin.baths} Baños</p>
            </div>
            <p className="text-gray-800 my-12">
              Descripción de la cabaña aquí...
            </p>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col space-y-4 font-lato">
          <div className="bg-white p-6 rounded-lg shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">
              {translations.reserva_instancia}
            </h2>
            <Calendar
              selectRange
              onChange={handleDateChange}
              value={dates}
              tileClassName={tileClassName}
            />
            <p className="mt-4 text-lg font-bold">
              Precio por noche: S/{cabin.price.toFixed(2)} <br />
              Noches: {numberOfNights.toFixed()} <br />
              <span className="text-gray-600">
                Total a Pagar: S/{calculateTotal().toFixed(2)}
              </span>
            </p>

            <div className="relative ">
              <button
                className="mt-2 w-full text-left  px-4 py-2 rounded-lg border"
                onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
              >
                {`Huéspedes: ${guests.adults} Adulto(s), ${guests.children} Niño(s), ${guests.babies} Bebé(s)`}
              </button>
              {isGuestDropdownOpen && (
                <div className="absolute z-10 bg-white shadow-lg p-4 mt-2 rounded-lg w-full">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p>Adultos (Edad 13+):</p>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleGuestChange("adults", "decrement")
                          }
                          className="p-2 border rounded-full"
                        >
                          -
                        </button>
                        <p className="mx-2">{guests.adults}</p>
                        <button
                          onClick={() =>
                            handleGuestChange("adults", "increment")
                          }
                          className="p-2 border rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Niños (Edad 2-12):</p>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleGuestChange("children", "decrement")
                          }
                          className="p-2 border rounded-full"
                        >
                          -
                        </button>
                        <p className="mx-2">{guests.children}</p>
                        <button
                          onClick={() =>
                            handleGuestChange("children", "increment")
                          }
                          className="p-2 border rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Bebés (Menos de 2 años):</p>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleGuestChange("babies", "decrement")
                          }
                          className="p-2 border rounded-full"
                        >
                          -
                        </button>
                        <p className="mx-2">{guests.babies}</p>
                        <button
                          onClick={() =>
                            handleGuestChange("babies", "increment")
                          }
                          className="p-2 border rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Código Promocional"
                className="w-3/4 p-2 border rounded-lg"
              />
              <button className="w-1/4 ml-2 p-2 bg-gray-200 rounded-lg">
                {translations.aplicar}
              </button>
            </div>

            <button
              onClick={handleReservation}
              className="mt-4 text-black border px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white"
            >
              {translations.reservar}
            </button>
          </div>
        </div>
      </div>

      {/* Comentarios */}
      <div className="mt-10 max-w-3xl bg-white p-6 ">
        <h2 className="text-2xl font-semibold mb-4">
          {translations.comentarios}
        </h2>
        <ul className="space-y-4">
          {comments.map((comment, index) => (
            <li key={index} className="border-b last:border-b-0 pb-4">
              <p className="text-gray-800 font-semibold">{comment.author}</p>
              <p className="text-gray-600 text-sm">{comment.date}</p>
              <p className="text-gray-800 mt-2">{comment.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CabinDetail;
