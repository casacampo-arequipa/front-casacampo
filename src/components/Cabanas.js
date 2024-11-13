// src/components/Cabanas.js
import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaTable, FaTh } from 'react-icons/fa';
import { Button, Modal } from 'flowbite-react';
import useFetch from '../useFetchAdmin';
import axios from 'axios';
import { API_URL } from '../env';
import { token } from '../helpers/auth';

const Cabanas = () => {
  const [isTableView, setIsTableView] = useState(true);
  const { data, loading, error } = useFetch("cottage-admin")
  const [openModal, setOpenModal] = useState(false);
  const [selectedCottage, setSelectedCottage] = useState(null);
  const [isActive, setIsActive] = useState(1);

  useEffect(() => {
    if (!openModal) {
      setSelectedCottage(null);
      setIsActive(1); // Valor predeterminado
    }
  }, [openModal]);

  const handleEditClick = (cottage) => {
    setSelectedCottage(cottage);
    setIsActive(cottage.availability)
    setOpenModal(true);
  };

  const toggleView = () => {
    setIsTableView(!isTableView);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let data = {
      name_cottage: e.target.name_cottage?.value,
      description: e.target.description?.value,
      capacity: e.target.capacity?.value,
      availability: isActive,
      rooms: e.target.rooms?.value,
      beds: e.target.beds?.value,
      bathrooms: e.target.bathrooms?.value,
      
    }
  
    if (selectedCottage) {
      try {
        await axios.put(
          `${API_URL}/cottage-admin/${selectedCottage.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token()}`, // Añade el token al header
            }
          }
        ).then((resp) => { console.log(resp) });

        alert("Información guardada exitosamente");
        setOpenModal(false);
        window.location.reload();
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        alert("Hubo un error al guardar los datos");
      }
    } else {
      try {
        await axios.post(
          `${API_URL}/cottage-admin`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token()}`, // Añade el token al header
            }
          }
        ).then((resp) => { console.log(resp) });

        alert("Información guardada exitosamente");
        setOpenModal(false);
        window.location.reload();
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        alert("Hubo un error al guardar los datos");
      }
    }

  };


  const handledeleteClick = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/cottage-admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token()}`, // Añade el token al header
          }
        }
      ).then((resp) => { console.log(resp) });

      alert("Información eliminada exitosamente");
      setOpenModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar los datos:", error);
      alert("Hubo un error al eliminadar los datos");
    }
  };

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
              <th className="p-3 font-normal">Descripcion</th>
              <th className="p-3 font-normal">Capacidad total</th>
              <th className="p-3 font-normal">Total de cuartos</th>
              <th className="p-3 font-normal">Total de camas</th>
              <th className="p-3 font-normal">Total de baños</th>
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
                <td className="p-3">{cottage.rooms} cuartos</td>
                <td className="p-3">{cottage.beds} camas</td>
                <td className="p-3">{cottage.bathrooms} baños</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button className="px-3 py-2 rounded-lg text-white bg-green-500 hover:bg-green-700" onClick={() => handleEditClick(cottage)}>
                      <i className="fa-solid fa-pen "></i>
                    </button>
                    <button className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-700" onClick={() => handledeleteClick(cottage.id)}>
                      <i className="fa-solid fa-trash "></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
          <Modal
            size="4xl"
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
            <form onSubmit={handleSave}>
              <Modal.Header> {selectedCottage ? "Editar Cabaña" : "Nuevo Cabaña"}</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">


                  {/* Campos de edición */}
                  <div className="flex flex-col space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nombre de la Cabaña
                      </label>
                      <input
                        type="text"
                        id="name_cottage"
                        defaultValue={selectedCottage?.name_cottage}
                        placeholder="Nombre Cabaña"
                        required
                        name="name_cottage"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Descripción
                      </label>
                      <textarea
                        placeholder="Descripción detallada del paquete"
                        id="description"
                        required
                        name="description"
                        defaultValue={selectedCottage?.description}
                        rows={5} // Ajusta la cantidad de filas según el espacio necesario
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Capacidad maxima
                      </label>
                      <input
                        type="number"
                        id="capacity"
                        required
                        name="capacity"
                        defaultValue={selectedCottage?.capacity}
                        placeholder="número maximo de personas"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className='flex gap-x-4'>
                      <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700 ">
                          Cantidad de Cuartos
                        </label>
                        <input
                          type="number"
                          id="rooms"
                          required
                          name="rooms"
                          defaultValue={selectedCottage?.rooms}
                          placeholder=" Cantidad de cuartos"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700">
                          Cantidad de Camas
                        </label>
                        <input
                          type="number"
                          id="beds"
                          required
                          name="beds"
                          defaultValue={selectedCottage?.beds}
                          placeholder="Cantidad de camas"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700 ">
                          Cantidad de baños
                        </label>
                        <input
                          type="number"
                          id="bathrooms"
                          required
                          name="bathrooms"
                          defaultValue={selectedCottage?.bathrooms}
                          placeholder=" Cantidad de baños"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setIsActive(1)}
                          className={`px-4 py-2 rounded-lg border ${isActive === 1 ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                        >
                          Activo
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsActive(0)}
                          className={`px-4 py-2 rounded-lg border ${isActive === 0 ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                        >
                          No Activo
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button color="blue" type='submit'>
                  Guardar
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
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
