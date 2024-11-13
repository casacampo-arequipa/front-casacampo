
import React, { useState } from 'react';
import useFetch from '../useFetchAdmin';
import { Card } from 'flowbite-react';

const Reservas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useFetch("reservation-admin")
  console.log(data)

  const reservasData = [
    { id: 1, nombre: 'Reserva 1', fecha: '2024-09-10', cabaña: 'Cabaña A', estado: 'Confirmada' },
    { id: 2, nombre: 'Reserva 2', fecha: '2024-09-11', cabaña: 'Cabaña B', estado: 'Pendiente' },
    { id: 3, nombre: 'Reserva 3', fecha: '2024-09-12', cabaña: 'Cabaña C', estado: 'Cancelada' },
    { id: 4, nombre: 'Reserva 4', fecha: '2024-09-13', cabaña: 'Cabaña D', estado: 'Confirmada' },
    { id: 5, nombre: 'Reserva 5', fecha: '2024-09-14', cabaña: 'Cabaña E', estado: 'Pendiente' },
    { id: 6, nombre: 'Reserva 6', fecha: '2024-09-15', cabaña: 'Cabaña F', estado: 'Confirmada' },

  ];


  const filteredReservas = reservasData.filter((reserva) =>
    reserva.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservas = filteredReservas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <th className="p-3 font-normal">Nombre Cabaña</th>
              <th className="p-3 font-normal">Fecha de Reservación</th>
              <th className="p-3 font-normal">Comienza</th>
              <th className="p-3 font-normal">Termina</th>
              <th className="p-3 font-normal">Capacidad total</th>
              <th className="p-3 font-normal">Precio</th>
              <th className="p-3 font-normal">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.reservations.map((cottage, index) => (
              <tr key={cottage.id} className="hover:bg-gray-100">
                <td className="p-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {cottage.id}
                </td>
                <td className="p-3">{cottage.cottage_id}</td>
                <td className="p-3">
                  {new Date(cottage.date_reservation).toISOString().split('T')[0]}
                </td>
                <td className="p-3">
                  {new Date(cottage.date_start).toISOString().split('T')[0]}
                </td>
                <td className="p-3">
                  {new Date(cottage.date_end).toISOString().split('T')[0]}
                </td>
                <td className="p-3">{cottage.cottage_id}</td>
                <td className="p-3">{cottage.total_price}</td>
                {/* <td className="p-3 ">{cottage.description.length > 100
                  ? `${cottage.description.slice(0, 40)}...`
                  : cottage.description}</td> */}
                {/* <td className="p-3">{cottage.capacity} Personas</td> */}
                {/* <td className="p-3">{cottage.price}</td> */}
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

export default Reservas;
