
import React, { useState } from 'react';
import { Card } from './Card';
import { Button, Modal } from 'flowbite-react';
import { API_URL } from '../env';
import axios from 'axios';
import { token } from '../helpers/auth';
import Swal from 'sweetalert2';
import useFetch from '../useFetchAdmin';
import Loader from './Loader';

const Promociones = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch("promotion-admin");
  console.log(data)
  const [selectedPromo, setSelectedPromo] = useState();
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [isActive, setIsActive] = useState(0);
  const formatDate = (date) => new Date(date).toISOString().split('T')[0];

  const clearForm = () => {
    setDateStart('');
    setDateEnd('');
    setIsActive(0);
    setSelectedPromo(null);
  };

  const handleEditClick = (promo) => {
    console.log(promo)
    setSelectedPromo(promo);
    setDateStart(formatDate(promo.date_start));
    setDateEnd(formatDate(promo.date_end));
    setIsActive(promo.state)
    setOpenModal(true);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    if (!dateStart || !dateEnd || new Date(dateStart) > new Date(dateEnd)) {
      alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
      return;
    }
    const name_promotion = e.target.name_promotion.value.trim();
    const percentage = e.target.percentage.value.trim();
    const state = isActive;
    let data = {
      name_promotion,
      percentage,
      date_start: dateStart,
      date_end: dateEnd,
      state
    }
    if (selectedPromo) {
      try {
        await axios.put(
          `${API_URL}/promotion-admin/${selectedPromo.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token()}`, // Añade el token al header
            }
          }
        );
        setOpenModal(false);
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "La promoción ha sido creada exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
        alert("Hubo un error al actualizar los datos");
      }
    } else {
      try {
        await axios.post(
          `${API_URL}/promotion-admin`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token()}`, // Añade el token al header
            }
          }
        );

        setOpenModal(false);

        Swal.fire({
          title: "¡Buen trabajo!",
          text: "La promoción ha sido creada exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

      } catch (error) {
        console.error("Error al guardar los datos:", error);
        alert("Hubo un error al guardar los datos");
      }
    }

  }
  const handledeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar"
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${API_URL}/promotion-admin/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token()}`, // Añade el token al header
            }
          }
        );

        Swal.fire({
          title: "¡Eliminado!",
          text: "La información ha sido eliminada exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        setOpenModal(false);
      } catch (error) {
        console.error("Error al eliminar los datos:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al eliminar los datos.",
          icon: "error",
        });
      }
    }
  };
  if (loading) {
    return <Loader />
  }

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
          Nueva Promo
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
            {!data || data?.promotions.length === 0 ? (
              <tr className="hover:bg-gray-100">
                <td colSpan="7" className="flex items-center justify-center text-2xl text-center py-4">
                  Sin datos
                </td>
              </tr>
            ) : (
              data?.promotions.map((cottage, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="p-3">{cottage.name_promotion}</td>
                  <td className="p-3">{cottage.percentage} %</td>
                  <td className="p-3">
                    {new Date(cottage?.date_start).toISOString().split('T')[0]}
                  </td>
                  <td className="p-3">
                    {new Date(cottage?.date_end).toISOString().split('T')[0]}
                  </td>
                  <td className="p-3">
                    <span style={{ color: cottage?.state === 1 ? 'green' : 'red' }}>
                      {cottage?.state === 1 ? 'Activo' : 'Desactivado'}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditClick(cottage)} className="px-3 py-2 rounded-lg text-white bg-green-500 hover:bg-green-700">
                        <i className="fa-solid fa-pen "></i>
                      </button>
                      <button onClick={() => handledeleteClick(cottage.id)} className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-700">
                        <i className="fa-solid fa-trash "></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
      <Modal
        size="4xl"
        show={openModal}
        onClose={() => { setOpenModal(false); clearForm(); }}
        className=" flex flex-col"
      >
        <form onSubmit={handleSave} className="h-full flex flex-col">
          <Modal.Header>{selectedPromo ? "Editar Promoción" : "Nueva Promoción"}</Modal.Header>
          <Modal.Body className="flex-2 overflow-y-auto h-full">
            <div className="h-full space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre de la Promoción
                </label>
                <input
                  type="text"
                  id="name_promotion"
                  defaultValue={selectedPromo?.name_promotion}
                  placeholder="chapapromo"
                  required
                  name="name_promotion"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Porcentaje de descuento (%)
                </label>
                <input
                  type="number"
                  id="percentage"
                  defaultValue={selectedPromo?.percentage}
                  placeholder="10"
                  required
                  name="percentage"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex gap-x-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 ">
                    Check in
                  </label>
                  <input
                    type="date"
                    name="date_start"
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                    placeholder="Check in"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Check out
                  </label>
                  <input
                    type="date"
                    name="date_end"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                    placeholder="Check out"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ? "bg-gray-200 cursor-not-allowed" : ""
                      }`}

                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsActive(1)}
                    className={`px-4 py-2 rounded-lg border ${isActive === 1 ? "bg-green-100 border-green-500 text-green-500" : "border-gray-300 text-gray-500"}`}
                  >
                    Activo
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsActive(0)}
                    className={`px-4 py-2 rounded-lg border ${isActive === 0 ? "bg-red-100 border-red-500 text-red-500" : "border-gray-300 text-gray-500"}`}
                  >
                    No Activo
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-100 flex justify-end space-x-4 py-4 border-t ">
            <Button color="gray" onClick={() => {
              setOpenModal(false);
              clearForm();
            }}>
              Cancelar
            </Button>
            <Button color="blue" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div className="flex justify-between items-center mt-4">
      </div>
    </Card >
  );
};

export default Promociones;
