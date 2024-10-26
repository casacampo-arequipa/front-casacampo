import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const { cabin, dates, guests, total } = location.state || {};
  const [editedDates, setEditedDates] = useState(dates); 
  const [editedGuests, setEditedGuests] = useState(guests); 
  const [finalTotal, setFinalTotal] = useState(total); 

  const navigate = useNavigate();

  const handleEdit = () => {

    alert('Funcionalidad de edición a implementar.');
  };

  return (
    <div className="container mx-auto px-10 py-10 font-lato flex">
      
      <div className="w-1/2 mr-10">
        <h1 className="text-4xl font-bold mb-2">Confirmacion y Pago</h1>
        <p className="text-lg mb-4">¡Listo para disfrutar de una experiencia inolvidable en nuestra cabaña!</p>

        <div className="bg-white p-6 rounded-lg shadow-2xl mt-4">
          <h2 className="text-lg font-semibold mb-4">Detalles de la Reserva</h2>
          <p>Fechas: {editedDates[0].toLocaleDateString()} - {editedDates[1].toLocaleDateString()}</p>
          <p>Adultos: {editedGuests.adults}</p>
          <p>Niños: {editedGuests.children}</p>
          <p>Bebés: {editedGuests.babies}</p>
          <p>Total a Pagar: S/{finalTotal.toFixed(2)}</p>
          <button className="mt-4 text-blue-600 underline" onClick={handleEdit}>Editar</button>
        </div>

        <h3 className="text-xl font-semibold mb-2 mt-6">Reglas Fundamentales</h3>
        <p className="text-gray-600 mb-6">Por favor, respeta las normas de la cabaña y cuida del entorno. Las fiestas no están permitidas y se debe mantener el lugar limpio.</p>
      </div>

      <div className="w-1/2">
        <div className="mt-6 bg-white p-6 rounded-lg shadow-2xl">
          <h2 className="text-lg font-semibold mb-4">Métodos de Pago</h2>
          <div className="flex flex-col space-y-4">
            <button className="w-full p-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
              Pago con Tarjeta
            </button>
            <button className="w-full p-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
              Transferencia Bancaria
            </button>
            <button className="w-full p-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
              PayPal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
