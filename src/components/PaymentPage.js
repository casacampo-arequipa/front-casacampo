import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../env";


const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    // Recupera los datos desde location.state o localStorage
    const reservationData = location.state || JSON.parse(localStorage.getItem("reservationData"));

    // console.log("Datos recibidos en PaymentPage:", reservationData);

  // Desestructura los datos enviados desde CabinDetail
  const {
    cabin,
    dates,
    guests,
    total,
    clear,
    garantia,
    checkInDate,
    checkOutDate,
    totalNights,
    priceMondayThursday,
    priceFridaySunday,
    userId,
    packageId, // Incluye el packageId
  } = reservationData || {};
console.log(userId)
  // Verifica si los datos están disponibles
  // console.log("Datos recibidos en PaymentPage:", {
  //   cabin,
  //   dates,
  //   guests,
  //   total,
  //   clear,
  //   garantia,
  //   checkInDate,
  //   checkOutDate,
  //   totalNights,
  //   priceMondayThursday,
  //   priceFridaySunday,
  //   userId,
  // });
  console.log();

  // if (!cabin || !dates || !guests || !userId) {
  //   return (
  //     <div className="container mx-auto px-10 py-10 font-lato">
  //       <h1 className="text-3xl font-bold mb-4">Error</h1>
  //       <p>No se encontró información de reserva. Por favor, vuelve a intentarlo.</p>
  //       <button
  //         className="mt-4 text-blue-600 underline"
  //         onClick={() => navigate("/")}
  //       >
  //         Volver al inicio
  //       </button>
  //     </div>
  //   );
  // }

  console.log(packageId)

  const handleConfirmAndPay = async () => {
    setLoading(true);
    setError("");
  
    // Asegúrate de que `checkInDate` y `checkOutDate` sean válidos
    if (!checkInDate || !checkOutDate) {
      alert("Fechas de check-in o check-out no válidas.");
      setLoading(false);
      return;
    }
  
    // Ajusta las fechas al inicio del día (sin Z al final)
    const dateStart = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate(), 0, 0, 0, 0)
      .toISOString()
      .replace(/Z$/, "");
    const dateEnd = new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate(), 0, 0, 0, 0)
      .toISOString()
      .replace(/Z$/, "");
  
    // Asegúrate de que `cottage_ids` sea un array
    const cottageIds = cabin && cabin.cottage_id ? [cabin.cottage_id] : [];
    if (cottageIds.length === 0) {
      alert("No se encontró el ID de la cabaña.");
      setLoading(false);
      return;
    }
  
    // Crear el payload para la solicitud
    const data = {
      user_id: userId, // ID del usuario
      package_id: packageId, // ID del paquete
      cottage_ids: cottageIds, // IDs de las cabañas en array
      date_start: dateStart, // Fecha de inicio sin Z
      date_end: dateEnd, // Fecha de fin sin Z
      total_price: total, // Precio total
      state: false, // Estado de confirmación
      date_reservation: new Date().toISOString().replace(/Z$/, ""), // Fecha de la reserva sin Z
      discount_id: null, // Sin descuento
      promotion_id: null, // Sin promoción
    };
  
    if (!packageId) {
      console.error("El packageId no fue recibido correctamente.");
      setError("No se recibió un packageId válido.");
      setLoading(false);
      return;
    }
  
    console.log("Datos enviados al backend:", data);
  
    try {
      const response = await axios.post(`${API_URL}/reservation`, data);
  
      if (response.status === 201) {
        alert("Reserva confirmada exitosamente.");
        navigate("/"); // Redirige después de la confirmación
      }
    } catch (error) {
      setError("Hubo un problema al procesar la reserva. Por favor, intenta de nuevo.");
      console.error("Error durante la reserva:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "No se pudo procesar la solicitud."}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-8 py-12 font-lato">
      <h1 className="text-4xl font-bold text-center mb-8">Confirmación y Pago</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sección de detalles de reserva */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Detalles de la Reserva</h2>
          <img
            src={cabin.image}
            alt={cabin.name}
            className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
          />
          <div className="mb-4">
            <p className="text-xl font-bold">Cabaña: {cabin.name_cottage}</p>
            <p className="text-gray-700">Paquete: {cabin.name}</p>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-gray-700">Check In</p>
              <p>{checkInDate?.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Check Out</p>
              <p>{checkOutDate?.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-bold text-gray-700">Total de Noches</p>
            <p>{totalNights}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-gray-700">Precio (Lunes - Jueves):</p>
            <p>S/ {priceMondayThursday ? Number(priceMondayThursday).toFixed(2) : "No especificado"}</p>
            <p className="font-bold text-gray-700">Precio (Viernes - Domingo):</p>
            <p>S/ {priceFridaySunday ? Number(priceFridaySunday).toFixed(2) : "No especificado"}</p>
          </div>
          <hr className="my-4" />
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Tarifa de limpieza:{" "}
              <span className="font-bold">S/ {clear ? Number(clear).toFixed(2) : "No especificada"}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Garantía:{" "}
              <span className="font-bold">S/ {garantia ? Number(garantia).toFixed(2) : "No especificada"}</span>
            </p>
          </div>
          <hr className="my-4" />
          <p className="text-2xl font-bold text-gray-800">
            Total a Pagar: <span className="text-green-600">S/ {total.toFixed(2)}</span>
          </p>
        </div>

        {/* Sección de métodos de pago */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Métodos de Pago</h2>
          <div className="space-y-4">
            <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Pago con Tarjeta
            </button>
            <button className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Transferencia Bancaria
            </button>
            <button className="w-full py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500">
              PayPal
            </button>
            <button
              className={`w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 ${
                loading ? "opacity-50" : ""
              }`}
              onClick={handleConfirmAndPay}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Confirmar y Pagar"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <hr className="my-6" />
          <p className="text-gray-600 text-sm">
            *Todos los pagos están protegidos y son procesados de forma segura.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
