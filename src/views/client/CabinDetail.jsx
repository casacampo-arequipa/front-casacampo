import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "axios"
import { LanguageContext } from "../../components/LanguageContext";
import { UserContext } from "../../contexts/UserContext";
import ColoredSection from "../../components/Section/ColoredSection";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaUser } from "react-icons/fa";
import { API_URL } from "../../env";


const CabinDetail = ({ max_person, }) => {
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

  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const cabin = location.state?.cabin || {};

  const [dates, setDates] = useState([new Date(), new Date()]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState({ adults: 1, children: 0, babies: 0 });
  const [promoCode, setPromoCode] = useState("");
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [data, setData] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    // Configuración del modal emergente que se cierra automáticamente
    const timer = setTimeout(() => setShowInitialPopup(false), 5000); // Cierra el popup después de 5 segundos
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []);

  useEffect(() => {
    let data = {
      cottage_id: cabin.cottage_id
    }
    if (cabin) {
      axios.get(`${API_URL}/reservation`, data)
        .then((resp) => {
          setData(resp.data)
        }).catch(error => {
          setError(error)
        })
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

useEffect(() => {
  if (!user) {
    // Recupera desde localStorage si es necesario
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }
}, []);

const handleDateChange = (selectedDates) => {
  if (selectedDates.length === 2) {
    const [checkIn, checkOut] = selectedDates;

    // No realices ninguna manipulación adicional a las fechas seleccionadas
    setDates(selectedDates);
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    setErrorMessage(""); // Limpia cualquier mensaje de error
  } else {
    const checkIn = selectedDates[0];

    // Solo se establece la fecha de check-in si una sola fecha está seleccionada
    setDates([checkIn, null]);
    setCheckInDate(checkIn);
    setCheckOutDate(null);
  }
};

  const calculateTotal = () => {
    if (!dates[0] || !dates[1]) return 0; // Si no hay fechas seleccionadas, retorna 0
  
    // Calcula el número de noches excluyendo el día de salida
    const numberOfNights = Math.max(0, Math.ceil((dates[1] - dates[0]) / (1000 * 60 * 60 * 24)) - 1);
  
    let total = 0;
  
    // Calcular el total de las noches
    for (let i = 0; i < numberOfNights; i++) {
      const currentDay = new Date(dates[0]);
      currentDay.setDate(currentDay.getDate() + i);
  
      // Verifica si el día actual es entre lunes y jueves o entre viernes y domingo
      if (currentDay.getDay() >= 1 && currentDay.getDay() <= 4) {
        // Lunes a Jueves
        total += cabin.price_monday_to_thursday ? Number(cabin.price_monday_to_thursday) : 0;
      } else {
        // Viernes a Domingo
        total += cabin.price_friday_to_sunday ? Number(cabin.price_friday_to_sunday) : 0;
      }
    }
  
    // Agregar cargos adicionales si existen
    const clearCharge = cabin.clear ? Number(cabin.clear) : 0; // Costo adicional por limpieza
    const garantiaCharge = cabin.garantia ? Number(cabin.garantia) : 0; // Costo adicional por garantía
  
    // Sumar los cargos adicionales al total
    total += clearCharge + garantiaCharge;
  
    return total; // Retorna el total calculado
  };
    
  const numberOfNights = Math.max(0, Math.ceil((dates[1] - dates[0]) / (1000 * 60 * 60 * 24)) - 1);


  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const isSelectedStart = dates[0] && date.toDateString() === dates[0].toDateString();
      const isSelectedEnd = dates[1] && date.toDateString() === dates[1].toDateString();
      const isSelectedRange = dates[0] && dates[1] && date >= dates[0] && date <= dates[1];

      if (isSelectedStart || isSelectedEnd || isSelectedRange) {
        return "bg-red-500 text-white rounded-lg";
      }

      if (data?.reservations) {
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
    }
    return "";
  };

  const tileDisabled = ({ date, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Elimina la hora para comparar solo la fecha
  
    // Deshabilita fechas antes de hoy
    if (date < today) {
      return true;
    }
  
    // Deshabilita fechas ya reservadas
    if (view === "month" && data?.reservations) {
      const isReserved = data.reservations.some((reservation) => {
        const startDate = new Date(reservation.date_start);
        const endDate = new Date(reservation.date_end);
        return date >= startDate && date <= endDate;
      });
      if (isReserved) return true;
    }
  
    // Deshabilita la misma fecha seleccionada como Check-In
    if (checkInDate && date.getTime() === checkInDate.getTime()) {
      return true;
    }
  
    return false;
  };
  const [errorMessage, setErrorMessage] = useState("");

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

  const proceedToPayment = () => {
    if (!user || !checkInDate || !checkOutDate) {
      navigate("/pago", {
        state: {
          cabin,
          dates,
          guests,
          total: calculateTotal(),
          clear: cabin.clear,
          garantia: cabin.garantia,
          packageId: cabin.packageId,
          checkInDate,
          checkOutDate,
          totalNights: numberOfNights,
          priceMondayThursday: cabin.price_monday_to_thursday,
          priceFridaySunday: cabin.price_friday_to_sunday,
          userId: user.id,
          packageId: cabin.packageId, // Asegúrate de incluir packageId
        },
      });
      return;
    }
  
    // Datos necesarios para la página de pago
    const reservationData = {
      cabin,
      dates,
      guests,
      total: calculateTotal(),
      clear: cabin.clear,
      garantia: cabin.garantia,
      packageId: cabin.packageId,
      checkInDate, // Enviar tal cual
      checkOutDate,
      totalNights: numberOfNights,
      priceMondayThursday: cabin.price_monday_to_thursday,
      priceFridaySunday: cabin.price_friday_to_sunday,
      userId: user.id, // Incluye el ID del usuario
    };
  
    // Respaldo en localStorage
    localStorage.setItem("reservationData", JSON.stringify(reservationData));
  
    // Navegación a la página de pago
    navigate("/pago", { state: reservationData });
  };
  

  const { translations, setCurrentView } = useContext(LanguageContext);

  useEffect(() => {
    setCurrentView("CabinDetail");
  }, []);

  useEffect(() => {
    // Si los datos no están definidos, intenta recuperarlos del estado de navegación
    if (!cabin && location.state) {
      const { cabin: stateCabin, dates: stateDates, guests: stateGuests } = location.state;
      setDates(stateDates || [new Date(), new Date()]);
      setGuests(stateGuests || { adults: 1, children: 0, babies: 0 });
    }
  }, [location.state]);
  

  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal
  };

  

  return (
    <ColoredSection>
      <div className="py-12 px-4">
      <h1 className="text-3xl font-bold ">{cabin.name}</h1>

       {/* Popup inicial */}
       {showInitialPopup && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={() => setShowInitialPopup(false)} // Cierra el popup al hacer clic fuera de él
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
              <h2 className="text-xl font-semibold mb-4">Recuerde</h2>
              <p className="text-gray-700 mb-4">
                Tome en cuenta la capacidad de ingreso de <span className="font-bold">{cabin.max_person ? cabin.max_person : ""}</span> Personas al lugar
              </p>
              <button
                onClick={() => setShowInitialPopup(false)} // Botón para cerrar el popup
                className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={cabin.image}
              alt={cabin.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            <div className="my-12">
              <h1 className="text-3xl font-bold">{cabin.name_cottage}</h1>
              <div className="flex flex-row">
                <p className="text-gray-600">
                  Ingreso para <span className="font-bold">{cabin.max_person ? cabin.max_person : ""}</span> Personas al lugar
                </p>
              </div>
              <p className="text-gray-800 my-12">{cabin.description ? cabin.description : "No hay descripcion"}</p>

              <p className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                <a 
                  href="https://youtu.be/t-dIbIOie8U?si=_bpAI3P_59Z9uhCQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Video Recorrido del interior
                </a>
              </p>

              <div className="text-gray-600 mt-4">
                <h2 className="text-2xl text-black font-bold mb-2">INDICACIONES:</h2>

                <p>
                  <strong>Check In:</strong> <span className="font-bold">Desde las 11 am</span>
                </p>
                <p>
                  <strong>Check Out:</strong> <span className="font-bold">9 am (hora exacta)</span>
                </p>
                <p className="mt-2">
                  <strong>Tarifa de limpieza:</strong> S/.{" "}
                  {cabin.clear ? Number(cabin.clear).toFixed(2) : "No especificado"}
                </p>
                <p>
                  <strong>Garantía:</strong> S/.{" "}
                  {cabin.garantia ? Number(cabin.garantia).toFixed(2) : "No especificada"} (La garantía se hará devolución, pero se podría deducir en caso de destrozos en el interior y exterior, pérdidas, exceso de suciedad, o check out a destiempo)
                </p>
              </div>
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
                tileDisabled={tileDisabled}
              />
              <div className="mt-2">
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              </div>

              {/* Mostrar fechas de ingreso y salida */}
              <div className="mt-4 flex justify-between">
                <p><strong>Check In:</strong> {checkInDate ? checkInDate.toLocaleDateString() : "No seleccionada"}</p>
                <p><strong>Check Out:</strong> {checkOutDate ? checkOutDate.toLocaleDateString() : "No seleccionada"}</p>
              </div>

              <hr className="mb-2 mt-4" />

              <div className="px-2">
                <div className="flex justify-between">
                  <span>Precio de Lunes a Jueves por noche:</span>
                  <span>
                    S/. {cabin.price_monday_to_thursday ? Number(cabin.price_monday_to_thursday).toFixed(2) : "No disponible"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Precio de Viernes y Domingo por noche:</span>
                  <span>
                    S/. {cabin.price_friday_to_sunday ? Number(cabin.price_friday_to_sunday).toFixed(2) : "No disponible"}
                  </span>

                </div>
                <div className="flex justify-between">
                  <span>Total de noches:</span>
                  <span>{numberOfNights.toFixed()}</span>
                </div>
              </div>

              <hr className="my-2" />

              

              <div className="mt-4">
                <div className="flex justify-between">
                  <span>Tarifa de limpieza:</span>
                  <span>{cabin.clear ? cabin.clear : "No especificado"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Garantía:</span>
                  <span>{cabin.garantia ? cabin.garantia : "No especificada"}</span>
                </div>
              </div>

              
              
              <div className="flex justify-between bg-black text-white p-2 rounded-lg">
                <span>Total a Pagar:</span>
                <span>S/. {calculateTotal().toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>IGV (18%):</span>
                <span>S/. { (calculateTotal() - (calculateTotal() / 1.18)).toFixed(2) }</span>
              </div>

              <hr className="my-2" />

              <div className="relative ">
                <button
                  className="mt-2 w-full text-left  px-4 py-2 rounded-lg border"
                  onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                >
                  {`Huéspedes: ${guests.adults} Adulto(s), ${guests.children} Niño(s), ${guests.babies} Bebé(s)`}
                </button>
                {isGuestDropdownOpen &&  (
  <div className="absolute z-10 bg-white shadow-lg p-4 mt-2 rounded-lg w-full">
    <div className="space-y-2">
      {/* Adultos */}
      <div className="flex justify-between items-center">
        <p>Adultos (Edad 13+):</p>
        <div className="flex items-center">
          <button
            onClick={() => handleGuestChange("adults", "decrement")}
            className="p-2 border rounded-full"
          >
            -
          </button>
          <p className="mx-2">{guests.adults}</p>
          <button
            onClick={() => {
              // Verifica si el número total de adultos + niños no supera el max_person
              if (guests.adults + guests.children < cabin.max_person) {
                handleGuestChange("adults", "increment");
              }
            }}
            className="p-2 border rounded-full"
            disabled={guests.adults + guests.children >= max_person} // Deshabilita si se supera el límite
          >
            +
          </button>
        </div>
      </div>

      {/* Niños */}
      <div className="flex justify-between items-center">
        <p>Niños (Edad 2-12):</p>
        <div className="flex items-center">
          <button
            onClick={() => handleGuestChange("children", "decrement")}
            className="p-2 border rounded-full"
          >
            -
          </button>
          <p className="mx-2">{guests.children}</p>
          <button
            onClick={() => {
              // Verifica si el número total de adultos + niños no supera el max_person
              if (guests.adults + guests.children < cabin.max_person) {
                handleGuestChange("children", "increment");
              }
            }}
            className="p-2 border rounded-full"
            disabled={guests.adults + guests.children >= cabin.max_person} // Deshabilita si se supera el límite
          >
            +
          </button>
        </div>
      </div>

      {/* Bebés */}
      <div className="flex justify-between items-center">
        <p>Bebés (Menos de 2 años):</p>
        <div className="flex items-center">
          <button
            onClick={() => handleGuestChange("babies", "decrement")}
            className="p-2 border rounded-full"
          >
            -
          </button>
          <p className="mx-2">{guests.babies}</p>
          <button
            onClick={() => handleGuestChange("babies", "increment")}
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
                className="mt-4 text-black border px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white"
                onClick={proceedToPayment}
              >
                {translations.reservar}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 

  {/* Sección de comentarios */}
  <div className="md:col-span-2 rounded-xl overflow-hidden border border-red-800 order-2 md:order-none">
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
   {/* Mover el div de "Deja tu comentario" arriba de los comentarios en pantallas móviles */}
   <div className="md:col-span-1 rounded-xl overflow-hidden border border-red-800 h-max order-1 md:order-none">
    <div className="bg-red-800 px-4 py-2">
      <h2 className="text-base font-semibold text-white">Deja tu comentario</h2>
    </div>
    <div className="px-4 py-2">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
          <input
            type="text"
            placeholder="Aquí tu comentario"
            className="p-2 border rounded-lg text-sm w-full sm:w-auto"
          />
          <button className="px-4 py-2 bg-gray-200 hover:bg-green-700 hover:text-white rounded-lg duration-500">
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
