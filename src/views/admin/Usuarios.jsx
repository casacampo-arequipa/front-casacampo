import React, { useState, useEffect } from "react";

import { Card } from "../../components/Card";
import useFetch from "../../useFetchAdmin";
import { Button, Modal } from "flowbite-react";
import { getNames } from "country-list";
import Select from 'react-select';
import axios from "axios";
import { API_URL } from "../../env";
import { token } from "../../helpers/auth";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";

const Usuarios = () => {
  const countries = getNames().map((country) => ({ value: country, label: country }));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, loading } = useFetch("users-admin")
  const [openModal, setOpenModal] = useState(false);
  const [TypeUser, setTypeUser] = useState(2);

  useEffect(() => {
  }, []);



  const handleEditClick = (user) => {
    setSelectedUser(user);
    const matchedCountry = countries.find((c) => c.value === user.country);
    setSelectedCountry(matchedCountry || null);
    setTypeUser(user.rol_id);
    setOpenModal(true);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const lastname = e.target.lastname.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const country = selectedCountry?.value || "";
    const password = e.target.password.value.trim();
    const passwordConfirmation = e.target.password_confirmation.value.trim();
    if (!name || !lastname || !email || !phone || !country || !password || !passwordConfirmation) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de guardar.",
        icon: "warning",
      });
      return; // Detener el envío si falta algún dato
    }

    // Validar que las contraseñas coincidan
    if (password !== passwordConfirmation) {
      Swal.fire({
        title: "Error en las contraseñas",
        text: "Las contraseñas no coinciden. Por favor, verifica e inténtalo de nuevo.",
        icon: "error",
      });
      return; // Detener el envío si las contraseñas no coinciden
    }
    let data = {
      name,
      lastname,
      email,
      phone,
      country,
      password,
      rol_id: TypeUser,
      password_confirmation: passwordConfirmation,
    };

    if (selectedUser) {
      await axios.put(
        `${API_URL}/users-admin/${selectedUser.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token()}`, // Añade el token al header
          }
        }
      );

      alert("Información actualizada exitosamente");
      setOpenModal(false);
      window.location.reload();
    } else {
      await axios.post(
        `${API_URL}/users-admin`,
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
    }
  };

  const clearForm = () => {
    setSelectedUser('');
    setSelectedCountry(null);
    setTypeUser(2);
  };

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
          `${API_URL}/users-admin/${id}`,
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
        if (error.response && error.response.data.message === "No se puede eliminar el usuario porque tiene reservas asociadas.") {
          Swal.fire({
            title: "Advertencia",
            text: "El usuario tiene reservas asociadas y no puede ser eliminado.",
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Hubo un error al eliminar los datos.",
            icon: "error",
          });
        }
      }
    }
  };
  if (loading) {
    return <Loader />
  }
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Buscar usuario"
            className="p-2 border border-gray-300 rounded-lg w-1/3 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setOpenModal(true)} className=" text-black p-2 rounded border border-black hover:bg-green-800 hover:text-white">
            Agregar Usuario
          </button>
        </div>

        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-left table-auto min-w-max text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 font-normal">Id</th>
                <th className="p-3 font-normal">Nombre</th>
                <th className="p-3 font-normal">Apellidos</th>
                <th className="p-3 font-normal">Paiz</th>
                <th className="p-3 font-normal">Correo electronico</th>
                <th className="p-3 font-normal">Telefono</th>
                <th className="p-3 font-normal">Rol</th>
                <th className="p-3 font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data?.users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.id}
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.lastname}</td>
                  <td className="p-3">{user.country || 'No especificado'}  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">
                    {user.rol_id === 1 ? "Admin" : user.rol_id === 2 ? "Cliente" : "Desconocido"}
                  </td>

                  <td className="p-2">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditClick(user)} className="px-3 py-2 rounded-lg text-white bg-green-500 hover:bg-green-700">
                        <i className="fa-solid fa-pen "></i>
                      </button>
                      <button onClick={() => handledeleteClick(user.id)} className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-700">
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
              onClose={() => { setOpenModal(false); clearForm(); }}
            >
              <form onSubmit={handleSave}>
                <Modal.Header>{selectedUser ? "Editar Usuario" : "Nuevo Usuario"} </Modal.Header>
                <Modal.Body className="flex-2 overflow-y-auto h-full">
                  <div className="space-y-6">
                    {/* Campos de edición */}
                    <div className="flex flex-col space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          defaultValue={selectedUser?.name}
                          placeholder="Tavo Albert"
                          required
                          name="name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Apellido Completo
                        </label>
                        <input
                          type="text"
                          id="lastname"
                          defaultValue={selectedUser?.lastname}
                          placeholder="Perez Perez"
                          required
                          name="lastname"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Número de Celular
                        </label>
                        <input
                          type="number"
                          id="phone"
                          required
                          name="phone"
                          defaultValue={selectedUser?.phone}
                          placeholder="967342343"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          name="email"
                          defaultValue={selectedUser?.email}
                          placeholder="tavoperez@gmail.com"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
                        <Select
                          options={countries}
                          placeholder="Selecciona tu país"
                          value={selectedCountry} // Usar el objeto completo
                          onChange={(selectedOption) => setSelectedCountry(selectedOption)} // Captura el objeto completo
                        />
                      </div>
                      {!selectedUser && (
                        <>  <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            id="password"
                            required
                            name="password"
                            defaultValue={selectedUser?.password}
                            placeholder="Mayor a 8 caracteres"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Confirmar contraseña
                            </label>
                            <input
                              type="password"
                              id="password_confirmation"
                              required
                              name="password_confirmation"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div></>
                      )}


                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={() => setTypeUser(1)}
                            className={`px-4 py-2 rounded-lg border ${TypeUser === 1 ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                          >
                            Admin
                          </button>
                          <button
                            type="button"
                            onClick={() => setTypeUser(2)}
                            className={`px-4 py-2 rounded-lg border ${TypeUser === 2 ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                          >
                            Cliente
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="gray" onClick={() => { clearForm(); setOpenModal(false); }}>
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
      </Card>
    </>
  );
};

export default Usuarios;
