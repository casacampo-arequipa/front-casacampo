
import React, { useState } from 'react';
import useFetch from '../useFetchAdmin';
import { Button, Card, Modal } from 'flowbite-react';
import axios from 'axios';
import { API_URL } from '../env';
import { token } from '../helpers/auth';
import Swal from 'sweetalert2';

const Reservas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const [selectedUser, setSelectedUser] = useState('');
  const { data, loading, error } = useFetch("reservation-admin");
  const [help, setHelpers] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedCottage, setSelectedCottage] = useState([]);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [total, setTotal] = useState(0);

  const toggleCottageSelection = (cottageId) => {
    setSelectedCottage((prevSelected) => {
      if (prevSelected.includes(cottageId)) {
        // Si ya está seleccionado, lo quitamos del array
        return prevSelected.filter((id) => id !== cottageId);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prevSelected, cottageId];
      }
    });
  };


  const handlePackageChange = (e) => {
    const packageId = e.target.value;
    const selectedPackag = help?.packages?.find((packag) => packag.id === parseInt(packageId));
    setSelectedPackage(selectedPackag || null);
  };
  const handelneed = async () => {
    try {
      const response = await axios.get(`${API_URL}/reservation-admin/helps`, {
        headers: {
          Authorization: `Bearer ${token()}`, // Añade el token al header
        },
      });

      setHelpers(response.data);

      setOpenModal(true);
    } catch (err) {
      console.error(err);
    }
    setOpenModal(true);
  }


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const calculateTotal = () => {
    if (!dateStart || !dateEnd || !selectedPackage) return;

    const startDate = new Date(dateStart + 'T00:00:00');
    const endDate = new Date(dateEnd + 'T00:00:00');
    const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día

    // Excluir el día de salida
    const adjustedEndDate = new Date(endDate.getTime() - oneDay);

    let currentDate = new Date(startDate);

    const cleaningPrice = parseFloat(selectedPackage.cleaning || 0);
    const guaranteePrice = parseFloat(selectedPackage.guarantee || 0);

    let totalPrice = cleaningPrice + guaranteePrice;

    // Recorrer solo las noches
    while (currentDate <= adjustedEndDate) {
      const day = currentDate.getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado
      console.log(day);
      if (day >= 1 && day <= 4) {
        // Lunes a Jueves
        totalPrice += parseFloat(selectedPackage.price_monday_to_thursday || 0);
      } else if (day === 0 || day === 5 || day === 6) {
        // Viernes, Sábado, Domingo
        totalPrice += parseFloat(selectedPackage.price_friday_to_sunday || 0);
      }

      currentDate = new Date(currentDate.getTime() + oneDay);
    }

    setTotal(totalPrice.toFixed(2)); // Redondear a 2 decimales
  };



  const handleDateStartChange = (e) => {
    const start = e.target.value;
    setDateStart(start);

    // Calcular automáticamente el `check-out` (un día después)
    const checkOutDate = new Date(start);
    checkOutDate.setDate(checkOutDate.getDate() + 1);
    setDateEnd(checkOutDate.toISOString().split('T')[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedPackage || selectedCottage.length === 0 || !dateStart || !dateEnd || total === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Todos los campos son obligatorios. Por favor, verifica la información ingresada.',
      });
      return; // Detener la ejecución si falta algún campo
    }
    let data = {
      user_id: selectedUser,
      package_id: selectedPackage.id,
      cottage_ids: selectedCottage,
      date_start: dateStart,
      date_end: dateEnd,
      total_price: total,
      state: isActive,
      date_reservation: new Date().toISOString().split("T")[0],
    }

    // if (selectedCottage) {
    //   try {
    //     await axios.put(
    //       `${API_URL}/reservation-admin`,
    //       data,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token()}`, // Añade el token al header
    //         }
    //       }
    //     );

    //     alert("Información guardada exitosamente");
    //     setOpenModal(false);
    //     window.location.reload();
    //   } catch (error) {
    //     console.error("Error al guardar los datos:", error);
    //     alert("Hubo un error al guardar los datos");
    //   }
    // } else {
    try {
      await axios.post(
        `${API_URL}/reservation-admin`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token()}`, // Añade el token al header
          }
        }
      );

      alert("Información guardada exitosamente");
      setOpenModal(false);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data; // Acceder a los datos del error
        console.log(errorData); // Para depuración

        let errorMessage = 'Ocurrió un error inesperado.';

        // Verificar si el error está en formato JSON
        try {
          const parsedError = typeof errorData === 'string' ? JSON.parse(errorData) : errorData;

          // Caso 1: Error específico con campos como `date_start` o `cottage_ids`
          if (parsedError['date_start']) {
            errorMessage = 'La fecha de inicio debe ser una fecha posterior al día de hoy.';
          } else if (parsedError['cottage_ids']) {
            errorMessage = 'Debes seleccionar al menos una cabaña.';
          }

          // Caso 2: Error general con `message`
          if (parsedError.message) {
            errorMessage = parsedError.message;
          }
        } catch (parseError) {
          // Si no es un JSON válido, manejarlo como texto plano
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        }

        // Mostrar mensaje de error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar los datos',
          text: errorMessage,
        });
      } else {
        // Caso genérico si no hay datos en la respuesta
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar los datos',
          text: 'Ocurrió un error inesperado.',
        });
      }
    }

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
        <button onClick={() => handelneed()} className=" text-black p-2 rounded border border-black hover:bg-green-800 hover:text-white">
          Agregar Cabaña
        </button>
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-left table-auto min-w-max text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 font-normal">Id Reserva</th>
              <th className="p-3 font-normal">Nombre Paquete</th>
              <th className="p-3 font-normal">Cabaña reservada</th>
              <th className="p-3 font-normal">Fecha de Reservación</th>
              <th className="p-3 font-normal">Estado</th>
              <th className="p-3 font-normal">Check in</th>
              <th className="p-3 font-normal">Chek out</th>
              <th className="p-3 font-normal">Cantidad de personas</th>
              <th className="p-3 font-normal">Precio total</th>
              <th className="p-3 font-normal">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.reservations.map((cottage, index) => (
              <tr key={cottage.id} className="hover:bg-gray-100">
                <td className="p-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {cottage.id}
                </td>
                <td className="p-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {cottage.package.name}
                </td>
                <td className="p-3">{cottage.cottages.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {cottage.cottages.map(cottage => (
                      <li key={cottage.id}>{cottage.name_cottage}</li>
                    ))}
                  </ul>
                ) : (
                  <span>No hay cabañas asociadas</span>
                )}</td>
                <td className="p-3">
                  {new Date(cottage.date_reservation).toISOString().split('T')[0]}
                </td>
                <td className="p-3">
                  <span style={{ color: cottage.state === 1 ? 'green' : 'red' }}>
                    {cottage.state === 1 ? 'Pagado' : 'Falta pagar'}
                  </span>

                </td>
                <td className="p-3">
                  {new Date(cottage.date_start).toISOString().split('T')[0]}
                </td>
                <td className="p-3">
                  {new Date(cottage.date_end).toISOString().split('T')[0]}
                </td>
                <td className="p-3">{cottage.package.max_person}</td>
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
      <Modal
        size="4xl"
        show={openModal}
        onClose={() => setOpenModal(false)}
        className=" flex flex-col"
      >
        <form onSubmit={handleSave} className="h-[900px] flex flex-col">
          <Modal.Header>Holas</Modal.Header>
          <Modal.Body className="flex-2 overflow-y-auto h-full">
            <div className="h-screen space-y-6">

              <div className="flex flex-col space-y-4">
                {/* Otros campos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Selección el usuario
                  </label>
                  <select
                    id="user-select"
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    <option value="">Seleccione un Usuario</option>
                    {help?.users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} {user.lastname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                {/* Selección de paquete */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Selección un paquete
                  </label>
                  <select
                    id="package-select"
                    onChange={handlePackageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    <option value="">Seleccione un Paquete</option>
                    {help?.packages?.map((packag) => (
                      <option key={packag.id} value={packag.id}>
                        {packag.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 ">
                    Precio de Limpieza
                  </label>
                  <input
                    type="number"
                    id="cleaning-price"
                    name="cleaning"
                    value={selectedPackage?.cleaning || ''} // Autocompletado
                    placeholder="Precio de limpieza"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly // Campo de solo lectura
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Garantía
                  </label>
                  <input
                    type="number"
                    id="guarantee"
                    name="guarantee"
                    value={selectedPackage?.guarantee || ''} // Autocompletado
                    placeholder="Garantía"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly // Campo de solo lectura
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 ">
                    Precio de Lunes a Jueves
                  </label>
                  <input
                    type="number"
                    id="price-monday-thursday"
                    name="price_monday_to_thursday"
                    value={selectedPackage?.price_monday_to_thursday || ''} // Autocompletado
                    placeholder="Precio Lunes a Jueves"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly // Campo de solo lectura
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Precio de Viernes a Domingo
                  </label>
                  <input
                    type="number"
                    id="price-friday-sunday"
                    name="price_friday_to_sunday"
                    value={selectedPackage?.price_friday_to_sunday || ''} // Autocompletado
                    placeholder="Precio Viernes a Domingo"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly // Campo de solo lectura
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <label className="block text-sm font-medium text-gray-700">Seleccionar Cabañas</label>
                <div className="grid grid-cols-2 gap-4">
                  {help?.cottages?.map((cottage) => (
                    <div
                      key={cottage.id}
                      className={`cursor-pointer border rounded-lg shadow-sm p-4 flex flex-col items-center transition duration-300 ease-in-out ${selectedCottage.includes(cottage.id)
                        ? 'border-blue-500 shadow-lg bg-blue-100'
                        : 'border-gray-300'
                        }`}
                      onClick={() => toggleCottageSelection(cottage.id)} // Permite seleccionar o deseleccionar
                    >
                      <img
                        src={cottage.image || '/static/media/cabana1.8e04b2adcdb7638eb97e.jpg'}
                        alt={cottage.name_cottage || 'Cottage Option'}
                        className="w-full rounded-md"
                      />
                      <p className="mt-2 text-center text-sm font-medium text-gray-700">
                        {cottage.name_cottage || 'Sin nombre'}
                      </p>
                    </div>
                  ))}
                </div>
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
                    onChange={handleDateStartChange}
                    placeholder="Check in"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${!selectedPackage ? "bg-gray-200 cursor-not-allowed" : ""
                      }`}
                    disabled={!selectedPackage} // Deshabilitar si no hay paquete seleccionado
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
                    onChange={(e) => {
                      setDateEnd(e.target.value);
                    }}
                    placeholder="Check out"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${!selectedPackage ? "bg-gray-200 cursor-not-allowed" : ""
                      }`}
                    disabled={!selectedPackage} // Deshabilitar si no hay paquete seleccionado
                  />
                </div>
                <button
                  type="button"
                  className={`mt-5 px-2 py-2 text-white rounded-md w-1/2 ${!selectedPackage
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  onClick={calculateTotal}
                  disabled={!selectedPackage} // Deshabilitar si no hay paquete seleccionado
                >
                  Calcular Total
                </button>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 ">
                  Total a Pagar
                </label>
                <input
                  type="number"
                  name="total"
                  value={total}
                  placeholder="Total a pagar"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  readOnly
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsActive(1)}
                    className={`px-4 py-2 rounded-lg border ${isActive === 1 ? "bg-green-100 border-green-500 text-green-500" : "border-gray-300 text-gray-500"}`}
                  >
                    Pagado
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsActive(0)}
                    className={`px-4 py-2 rounded-lg border ${isActive === 0 ? "bg-red-100 border-red-500 text-red-500" : "border-gray-300 text-gray-500"}`}
                  >
                    Pendiente
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-100 flex justify-end space-x-4 py-4 border-t ">
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancelar
            </Button>
            <Button color="blue" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

    </Card >
  );
};

export default Reservas;
