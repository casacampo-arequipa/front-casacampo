
import React, { useState } from 'react';
import { Card } from './Card';
import useFetch from '../useFetch';

const Promociones = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch("promotion")
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar Cabaña"
          className="p-2 border border-gray-300 rounded-lg w-1/3 "
          value=""
        // onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className=" text-black p-2 rounded border border-black hover:bg-green-800 hover:text-white" onClick={() => setOpenModal(true)}>
          Agregar Cabaña
        </button>
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-left table-auto min-w-max text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 font-normal">Id</th>
              <th className="p-3 font-normal">Nombre</th>
              <th className="p-3 font-normal">Descuiento</th>
              <th className="p-3 font-normal">Apertura</th>
              <th className="p-3 font-normal">Cierre</th>
              <th className="p-3 font-normal">Estado</th>

              <th className="p-3 font-normal">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.promotions.map((cottage, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="p-3">{cottage.name_promotion}</td>
                <td className="p-3">{cottage.percentage} %</td>
                <td className="p-3"> {new Date(cottage?.date_start).toISOString().split('T')[0]}</td>
                <td className="p-3"> {new Date(cottage?.date_end).toISOString().split('T')[0]}</td>
                <td className="p-3"> <span style={{ color: cottage?.state === 1 ? 'green' : 'red' }}>
                  {cottage?.state === 1 ? 'Activo' : 'Desactivado'}
                </span></td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button className="px-3 py-2 rounded-lg text-white bg-green-500 hover:bg-green-700">
                      <i className="fa-solid fa-pen "></i>
                    </button>
                    <button className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-700">
                      <i className="fa-solid fa-trash "></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
      </div>
    </Card >
  );
};

export default Promociones;
