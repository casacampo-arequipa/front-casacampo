import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "axios"
import { LanguageContext } from "../../components/LanguageContext";
import ColoredSection from "../../components/Section/ColoredSection";
import '@fortawesome/fontawesome-free/css/all.min.css';
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

  const [showModal, setShowModal] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const cabin = location.state?.cabin || {};
  console.log(cabin);
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
  console.log(data)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDateChange = (selectedDates) => {
    if (selectedDates.length === 1) {
      // Cuando se selecciona una sola fecha, asignar check-in a esa fecha y check-out al día siguiente
      setDates([selectedDates[0], new Date(selectedDates[0].getTime() + 24 * 60 * 60 * 1000)]);
      setCheckInDate(selectedDates[0]);
      setCheckOutDate(new Date(selectedDates[0].getTime() + 24 * 60 * 60 * 1000));
    } else {
      // Cuando se seleccionan dos fechas, asignar check-in a la primera fecha y check-out al día siguiente de la última fecha
      setDates([selectedDates[0], selectedDates[1]]);
      setCheckInDate(selectedDates[0]);
      setCheckOutDate(new Date(selectedDates[1].getTime() + 24 * 60 * 60 * 1000));
    }
  };

  const calculateTotal = () => {
  const numberOfNights = (dates[1] - dates[0]) / (1000 * 60 * 60 * 24);

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
  const clearCharge = cabin.clear ? Number(cabin.clear) : 0;  // Costo adicional por limpieza
  const garantiaCharge = cabin.garantia ? Number(cabin.garantia) : 0;  // Costo adicional por garantía

  // Sumar los cargos adicionales al total
  total += clearCharge + garantiaCharge;

  return total; // Total base sin IGV
};

  const numberOfNights = (dates[1] - dates[0]) / (1000 * 60 * 60 * 24);

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

    // Deshabilita fechas anteriores a la fecha de ingreso seleccionada
    if (dates[0] && date < dates[0]) {
      return false;
    }

    return false;
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

  const proceedToPayment = () => {
    const total = calculateTotal();
    navigate("/pago", { state: { dates, guests, total } });
  };

  const { translations, setCurrentView } = useContext(LanguageContext);

  useEffect(() => {
    setCurrentView("CabinDetail"); // Cambia "MyComponent" por el nombre de tu componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReservation = () => {
    setShowModal(true); // Muestra el modal
  };

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
                Tome en cuenta la capacidad de personas del paquete al reservar esta cabaña.
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
              <h1 className="text-3xl font-bold ">{cabin.name_cottage}</h1>
              <div className="flex flex-row">
              <p className="text-gray-600">
                {cabin.max_person ? cabin.max_person:""} Personas •
              </p>
                <p className="text-gray-600"> {cabin.rooms} Habitaciones • </p>
                <p className="text-gray-600"> {cabin.beds} Camas • </p>
                <p className="text-gray-600"> {cabin.baths} Baños</p>
              </div>
              <p className="text-gray-800 my-12">
                {cabin.description}
              </p>
              <div className="text-gray-600 mt-4">
                <h2 className="text-2xl text-black font-bold mb-2">INDICACIONES:</h2>
                
                <p><strong>Check In:</strong> Desde las 11 am</p>
                <p><strong>Check Out:</strong> 9 am (hora exacta)</p>
                <p className="mt-2">
                  <strong>Tarifa de limpieza:</strong> S/. {cabin.clear ? Number(cabin.clear).toFixed(2) : "No especificado"}
                </p>
                <p>
                  <strong>Garantía:</strong> S/. {cabin.garantia ? Number(cabin.garantia).toFixed(2) : "No especificada"} (La garantía se hará devolución, pero se podría deducir en caso de destrozos en el interior y exterior, pérdidas, exceso de suciedad, o check out a destiempo)
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
               {/* Nota para estancia de una noche */}
              <p className="text-sm text-gray-500 mt-2">
                Nota: Si desea reservar solo una noche, seleccione la misma fecha de entrada y salida.
              </p>

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
                 {/* Modal */}
                 {showModal && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    onClick={handleCloseModal} // Cierra el modal al hacer clic en el fondo
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
      onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal cierre el modal
    >
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        aria-label="Cerrar"
      >
        <i className="fa fa-times text-xl"></i>
      </button>
      
      <h2 className="text-xl font-semibold mb-4">Reservas</h2>
      <p className="mb-4">
        Las reservas se gestionan exclusivamente a través de nuestro WhatsApp. Por favor, envíenos una captura de las fechas para confirmar su reserva, e indíquenos el paquete y la cabaña seleccionada.
      </p>
      
      <a
  href={`https://api.whatsapp.com/send?phone=51987563711&text=${encodeURIComponent(
    `Hola, deseo reservar la cabaña "${cabin.name_cottage}".\n` +
    `- Check-In: ${checkInDate ? checkInDate.toLocaleDateString() : "No especificado"}\n` +
    `- Check-Out: ${checkOutDate ? checkOutDate.toLocaleDateString() : "No especificado"}\n` +
    `- Paquete seleccionado: ${cabin.name}\n` +
    `- Total a pagar: S/. ${calculateTotal().toFixed(2)}\n` +
    `- Detalle de huéspedes:\n` +
    `  * Adultos: ${guests.adults}\n` +   `  * Niños: ${guests.children}\n` +
    `  * Bebés: ${guests.babies}\n` +
    `Por favor, confirmen mi reserva. ¡Gracias!`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
>
        <i className="fab fa-whatsapp mr-2"></i> {/* Ícono de WhatsApp */}
        Contactar por WhatsApp
      </a>
    </div>
  </div>
)}

      </div>
    </ColoredSection>
  );
};

export default CabinDetail;
