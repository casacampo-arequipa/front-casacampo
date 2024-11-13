// src/components/Cabanas.js
import { Card } from 'flowbite-react';
import React, { useState } from 'react';
import { FaTable, FaTh } from 'react-icons/fa';
import useFetch from '../useFetchAdmin';


const Cabanas = () => {
  const [isTableView, setIsTableView] = useState(true);
  const { data, loading, error } = useFetch("cottage-admin")

  const toggleView = () => {
    setIsTableView(!isTableView);
  };

  // const filteredUsers = usuarios.filter((user) =>
  //   user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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
        <button className=" text-black p-2 rounded border border-black hover:bg-green-800 hover:text-white">
          Agregar Cabaña
        </button>
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-left table-auto min-w-max text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 font-normal">Id</th>
              <th className="p-3 font-normal">Nombre</th>
              <th className="p-3 font-normal">Descripcion</th>
              <th className="p-3 font-normal">Capacidad total</th>
              <th className="p-3 font-normal">Precio</th>
              <th className="p-3 font-normal">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.cottages.map((cottage, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="p-3">{cottage.name_cottage}</td>
                <td className="p-3 ">{cottage.description.length > 100
                  ? `${cottage.description.slice(0, 40)}...`
                  : cottage.description}</td>
                  <td className="p-3">{cottage.capacity} Personas</td>
             <td className="p-3">{cottage.price}</td>
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
        {/* <select
          className="p-2 border border-gray-300 rounded"
          value={usersPerPage}
          onChange={(e) => setUsersPerPage(Number(e.target.value))}
        >
          <option value="5">5 por página</option>
          <option value="10">10 por página</option>
          <option value="15">15 por página</option>
        </select> */}

        {/* <div>
          {[
            ...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys(),
          ].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`px-2 py-2 mx-1 ${currentPage === number + 1
                ? " text-black"
                : "bg-gray-300 text-black rounded-md"
                }`}
            >
              {number + 1}
            </button>
          ))}
        </div> */}
      </div>
    </Card >
  );
};

export default Cabanas;
