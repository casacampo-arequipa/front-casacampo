
import React from 'react';

const Promociones = () => {
  return (
    <div className="promociones-container p-8 font-serif">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar Promoción..."
          className="p-2 border rounded-lg w-1/3"
        />
        <div className="flex space-x-4">
          <button className="text-black p-2 rounded border border-black hover:bg-green-800 hover:text-white">
            Agregar Promoción
          </button>
        </div>
      </div>

      <div className="table-view">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Nombre de la Promoción</th>
              <th className="border px-4 py-2">Descripción</th>
              <th className="border px-4 py-2">Descuento</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Promoción 1</td>
              <td className="border px-4 py-2">Descripción de la promoción 1</td>
              <td className="border px-4 py-2">20%</td>
              <td className="border px-4 py-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  Editar
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Promociones;
