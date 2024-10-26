import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "axios"
import { LanguageContext } from "../../components/LanguageContext";
import ColoredSection from "../../components/Section/ColoredSection";
import { FaUser } from "react-icons/fa";
import { API_URL } from "../../env";


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
  console.log(cabin)
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [guests, setGuests] = useState({ adults: 1, children: 0, babies: 0 });
  const [promoCode, setPromoCode] = useState("");
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(()=>{
    if (cabin) {
      setLoading(true)
      axios.get( `${API_URL}/reservation`, {params: { cottage_id: cabin.cottage_id },})
      .then((resp)=> {
        setData(resp.data)
      }).catch(error=> {
        setError(error)
      })
      .finally(
        ()=> {
          setLoading(false)
        }
      )
    }
  }, [])

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
    if (view === "month" && data?.reservations) {
      for (const reservation of data?.reservations) {
        const startDate = new Date(reservation.date_start);
        const endDate = new Date(reservation.date_end);

        const isStartDate = startDate.toDateString() === date.toDateString();
        const isEndDate = endDate.toDateString() === date.toDateString();
        const isWithinRange = date >= startDate && date <= endDate;

        if (isStartDate || isEndDate || isWithinRange) {
          return "bg-gray-500 text-white rounded-lg";
        }
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
    <ColoredSection>
      <div className="py-12 px-4">
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
              {cabin.description}
              </p>
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col space-y-4 font-lato">
            <div className="bg-white p-6 rounded-lg shadow-2xl border">
              <h2 className="text-xl font-semibold mb-4">
                {translations.reserva_instancia}
              </h2>
              <Calendar
                selectRange
                onChange={handleDateChange}
                value={dates}
                tileClassName={tileClassName}
              />
              <hr className="mb-2 mt-4" />

              <div className="px-2">
                <div className="flex justify-between">
                  <span>Precio por noche:</span>
                  <span>S/. {cabin.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total de noches:</span>
                  <span>{numberOfNights.toFixed()}</span>
                </div>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between bg-black text-white p-2 rounded-lg">
                <span>Total a Pagar:</span>
                <span>S/. {calculateTotal().toFixed(2)}</span>
              </div>

              <hr className="my-2" />

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

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 rounded-xl overflow-hidden border border-red-800">
            <div className="bg-red-800 px-4 py-2">
              <h2 className="text-base font-semibold text-white">
                {translations.comentarios}
              </h2>
            </div>
            <div className="px-4 py-2">
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="">
                    <div className="flex gap-2 mb-2 items-center">
                      <FaUser className="text-3xl cursor-pointer" />
                      <div className="flex flex-col">
                        <span className="text-gray-800 font-semibold">{comment.author}</span>
                        <span className="text-gray-600 text-sm">{comment.date}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-800">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-red-800 h-max">
            <div className="bg-red-800 px-4 py-2">
              <h2 className="text-base font-semibold text-white">
                Deja tu comentario
              </h2>
            </div>
            <div className="px-4 py-2">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="aqui tu comentario"
                    className="p-2 border rounded-lg text-sm w-full"
                  />
                  <button className="ml-2 px-4 py-2 bg-gray-200 hover:bg-green-700 hover:text-white rounded-lg duration-500">
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ColoredSection>
  );
};

export default CabinDetail;
