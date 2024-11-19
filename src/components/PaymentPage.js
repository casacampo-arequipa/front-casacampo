import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    totalNights, // Total de noches
    priceMondayThursday, // Precio lunes-jueves
    priceFridaySunday, // Precio viernes-domingo
  } = location.state || {};

  // Verifica si no hay datos y redirige a la página principal
  if (!cabin || !dates || !guests) {
    return (
      <div className="container mx-auto px-10 py-10 font-lato">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p>No se encontró información de reserva. Por favor, vuelve a intentarlo.</p>
        <button
          className="mt-4 text-blue-600 underline"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

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
          </div>
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
