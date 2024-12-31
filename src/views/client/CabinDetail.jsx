import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "axios"
import { LanguageContext } from "../../components/LanguageContext";
import ColoredSection from "../../components/Section/ColoredSection";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaUser } from "react-icons/fa";
import { API_URL } from "../../env";
import useFetch from "../../useFetchAdmin";
import { AiFillStar } from "react-icons/ai"
import { getUserData } from "../../helpers/auth";
import Swal from 'sweetalert2';

const CabinDetail = ({ max_person, }) => {
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
  const [dataR, setDataReser] = useState()
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState()
  const { data, loading } = useFetch("opinion");
  console.log(data)
  const [comments, setComments] = useState(data?.opinions || []);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Configuración del modal emergente que se cierra automáticamente
    const timer = setTimeout(() => setShowInitialPopup(false), 5000); // Cierra el popup después de 5 segundos
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []);
  useEffect(() => {
    if (data?.opinions) {
      setComments(data.opinions); // Sincroniza el estado local con los datos iniciales
    }
  }, [data]);
  useEffect(() => {
    let data = {
      cottage_id: cabin.cottage_id
    }
    if (cabin) {
      axios.get(`${API_URL}/reservation`, data)
        .then((resp) => {
          setDataReser(resp.data)

        }).catch(error => {
          setError(error)
        })
    }
  }, [])



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDateChange = (selectedDates) => {
    if (selectedDates.length === 2) {
      const [checkIn, checkOut] = selectedDates;

      // Validar que Check-Out no sea igual a Check-In
      if (checkIn.toDateString() === checkOut.toDateString()) {
        setErrorMessage("Debes seleccionar al menos una noche para la reserva.");
        return;
      }

      // Si la validación pasa, actualiza los estados
      setDates(selectedDates);
      setCheckInDate(checkIn);
      setCheckOutDate(checkOut);
      setErrorMessage(""); // Limpia cualquier mensaje de error
    } else {
      setDates([selectedDates[0], null]); // Selección inicial
      setCheckInDate(selectedDates[0]);
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

    // Agregar solo el cargo por garantía (sin incluir el de limpieza)
    const garantiaCharge = cabin.garantia ? Number(cabin.garantia) : 0; // Costo adicional por garantía

    // Sumar el cargo de garantía al total
    total += garantiaCharge;

    // Calcular el descuento y restarlo del total
    const discountAmount = (total * discount) / 100;
    total -= discountAmount;

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

      if (dataR?.reservations) {
        for (const reservation of dataR?.reservations) {
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
    if (view === "month" && dataR?.reservations) {
      const isReserved = dataR.reservations.some((reservation) => {
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

  const validatePromoCode = async () => {
    try {
      const response = await axios.get(`${API_URL}/apply_promotion`, {
        params: {
          name_promotion: promoCode, // Enviar el código de promoción como 'name_promotion'
        },
      });

      // Imprimir la respuesta completa del backend
      console.log("Respuesta del backend:", response);

      if (response.status === 200) {
        const promotion = response.data.PROMO;
        setDiscount(promotion.percentage); // Aplicar el descuento basado en el porcentaje de la promoción
        setErrorMessage(""); // Limpiar el mensaje de error si es válido
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response:", error.response);  // Log detallado de la respuesta de error
        if (error.response.status === 403) {
          setErrorMessage("Código promocional no válido o ha expirado.");
        } else {
          setErrorMessage(`Ocurrió un error al aplicar el código: ${error.response.data.message || error.message}`);
        }
      } else {
        console.log("Error:", error);  // Log para cualquier otro error (sin respuesta)
        setErrorMessage("Ocurrió un error al aplicar el código.");
      }
      setDiscount(0); // Limpiar el descuento si el código es inválido
    }
  };

  const opinion = async () => {
    const userData = getUserData();
    const userReservation = dataR?.reservations.find(
      (reservation) => reservation.user_id === userData.id
    );

    if (userReservation) {
      let data = {
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
        coment: comment,
        reservation_id: userReservation.id,
        user_id: userData.id,
      };

      try {
        const response = await axios.post(`${API_URL}/opinion`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Agregar el comentario al estado local inmediatamente
        setComments((prevComments) => [
          ...prevComments,
          {
            ...data,
            id: response.data.opinions.id, // Asume que el backend devuelve el ID
            user: {
              name: userData.name, // Asegúrate de tener el nombre del usuario en `getUserData`
              lastname: userData.lastname,
            },
          },
        ]);

        setComment(""); // Limpia el campo de entrada
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Opinon Enviada"
        });
      } catch (error) {
        console.log(error)
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "Ocurrio un imprevisto"
        });
      }
    } else {
      Swal.fire({
        title: "No tienes reservas",
        text: "Primero haz una reserva",
        icon: "warning"
      });
    }
  };

  return (
    <ColoredSection>
      <div className="container mx-auto py-8">
        <div className="flex mb-4 gap-x-20 items-center space-x-4">
          <h1 className="text-3xl font-bold">{cabin.name}</h1>
          {/* Sección de estrellas */}
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <AiFillStar key={index} className="w-8 h-10 text-yellow-300" />
            ))}
            <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800 ml-3">
              5
            </span>
          </div>
          {/* Nombre de la cabaña */}

        </div>


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
            <div className="my-7">
              <h1 className="text-3xl font-bold">{cabin.name_cottage}</h1>
              <div className="flex flex-row">
                <p className="text-gray-600">
                  Ingreso para <span className="font-bold">{cabin.max_person ? cabin.max_person : ""}</span> Personas al lugar
                </p>
              </div>
              <p className="text-gray-800 my-12">{cabin.description ? cabin.description : "No hay descripcion"}</p>

              <p className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                <a
                  href="https://youtube.com/shorts/5NcWcb_3VSI?si=wMAITrW0FFUWkhHX"
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
                  <span>Garantía:</span>
                  <span>{cabin.garantia ? cabin.garantia : "No especificada"}</span>
                </div>
              </div>



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
              <div className="mt-6">
                <label className="block text-gray-700 font-medium">
                  Código promocional:
                </label>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-3/4"
                    placeholder="Ingrese su código"
                  />
                  <button
                    onClick={validatePromoCode}
                    className="bg-red-800 text-white px-4 py-2 rounded-lg w-1/5"
                  >
                    Aplicar
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-red-500 mt-2">{errorMessage}</p>
                )}
                {discount > 0 && (
                  <p className="text-green-500 mt-2">¡Descuento aplicado: {discount}%!</p>
                )}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">


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
                        <span className="text-gray-800 font-semibold">
                          {comment.user.name} {comment.user.lastname}
                        </span>
                        <span className="text-gray-600 text-sm">{comment.date}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-800">{comment.coment}</p>
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
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg text-sm w-full sm:w-auto"
                  />
                  <button onClick={opinion} className="px-4 py-2 bg-gray-200 hover:bg-green-700 hover:text-white rounded-lg duration-500">
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
                href={`https://api.whatsapp.com/send?phone=51950280738&text=${encodeURIComponent(
                  `Hola, deseo reservar la cabaña "${cabin.name_cottage}".\n` +
                  `- Check-In: ${checkInDate ? checkInDate.toLocaleDateString() : "No especificado"}\n` +
                  `- Check-Out: ${checkOutDate ? checkOutDate.toLocaleDateString() : "No especificado"}\n` +
                  `- Paquete seleccionado: ${cabin.name}\n` +
                  `- Total a pagar: S/. ${calculateTotal().toFixed(2)}\n` +
                  `- Detalle de huéspedes:\n` +
                  `  * Adultos: ${guests.adults}\n` + `  * Niños: ${guests.children}\n` +
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
