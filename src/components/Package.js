// src/components/Descuentos.js
import React, { useEffect, useState } from 'react';
import useFetch from '../useFetchAdmin';
import { Button, Card, Modal } from 'flowbite-react';
import { FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import CabinCards from './CabinCards';
import axios from 'axios';
import { API_URL } from '../env';
import { token } from '../helpers/auth';

const Package = () => {
    const { data, loading, error } = useFetch("packages-admin");
    const [openModal, setOpenModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [imagePhoto, setImagePhoto] = useState(null);
    const [FILE_AVATAR, setFILE_AVATAR] = useState(null);
    useEffect(() => {
        if (!openModal) {
            setSelectedPackage(null);
            setImagePhoto(null);
        }
    }, [openModal]);

    const handleEditClick = (packege) => {
        setSelectedPackage(packege); // Almacena el paquete seleccionado
        setImagePhoto(packege.img);
        setOpenModal(true); // Abre el modal
    };

    const processPhoto = (event) => {
        const file = event.target.files[0];
        if (file && file.type.indexOf("image") >= 0) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePhoto(reader.result);
            setFILE_AVATAR(file);
            reader.readAsDataURL(file);
        } else {
            alert("Solo se aceptan imágenes");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', e.target.name?.value);
        formData.append('description', e.target.description?.value);
        formData.append('max_person', e.target.max_person?.value);
        formData.append('price_monday_to_thursday', e.target.price_monday_to_thursday?.value);
        formData.append('price_friday_to_sunday', e.target.price_friday_to_sunday?.value);
        formData.append('guarantee', e.target.guarantee?.value);
        formData.append('cleaning', e.target.cleaning?.value);
        formData.append('imagen', FILE_AVATAR);

        if (selectedPackage) {
            try {
                const response = await axios.post(
                    `${API_URL}/packages-admin/${selectedPackage.id}`,
                    formData,
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
                const response = await axios.post(
                    `${API_URL}/packages-admin`,
                    formData,
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
                `${API_URL}/packages-admin/${id}`,
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
                    Nuevo Paquete
                </button>
            </div>

            <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-left table-auto min-w-max text-sm">
                    <thead className="bg-gray-200">
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Id</th>
                            <th className="border px-4 py-2">Imagen</th>
                            <th className="border px-4 py-2">Nombre Paquete</th>
                            <th className="border px-4 py-2">Capacidad</th>
                            <th className="border px-4 py-2">Precio de L- J</th>
                            <th className="border px-4 py-2">Precio de V - D</th>
                            <th className="border px-4 py-2">Precio de Garantia</th>
                            <th className="border px-4 py-2">Precio de Limpieza</th>
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.packeges.map((packege, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="p-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </td>
                                <td className="p-3">  <img src={packege.img} alt={packege.name} className="object-cover w-24 h-24 rounded-lg border" />
                                </td>
                                <td className="p-3">{packege.name}</td>
                                <td className="p-3">{packege.max_person} Personas</td>
                                {/* <td className="p-3 ">{packege.description.length > 100
                                    ? `${packege.description.slice(0, 40)}...`
                                    : packege.description}</td> */}
                                <td className="p-3">{packege.price_monday_to_thursday} </td>
                                <td className="p-3">{packege.price_friday_to_sunday}</td>
                                <td className="p-3">{packege.guarantee}</td>
                                <td className="p-3">{packege.cleaning}</td>
                                <td className="p-2">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-2 rounded-lg text-white bg-green-500 hover:bg-green-700" onClick={() => handleEditClick(packege)}>
                                            <i className="fa-solid fa-pen "></i>
                                        </button>
                                        <button className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-700" onClick={() => handledeleteClick(packege.id)}>
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
                            <Modal.Header> {selectedPackage ? "Editar Paquete" : "Nuevo Paquete"}</Modal.Header>
                            <Modal.Body>
                                <div className="space-y-6">
                                    {/* Imagen de avatar */}
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="relative">
                                            <img
                                                src={imagePhoto} // Ruta a la imagen de avatar
                                                alt="Avatar"
                                                className="w-24 h-24 rounded-full object-cover"
                                            />
                                            <span className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 text-gray-600"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 2.487c.403-.252.915-.03.93.482l.302 9.031a.75.75 0 01-.75.75h-9.72a.75.75 0 01-.75-.75L7.5 2.97a.75.75 0 01.93-.482l1.125.561 1.612-.537a.75.75 0 01.686 0l1.612.537 1.125-.561z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 12.75v8.25m-4.5-4.5H16.5"
                                                    />
                                                </svg>
                                                <input
                                                    type="file"
                                                    name="avatar"
                                                    accept=".png, .jpg, .jpeg"
                                                    onChange={processPhoto}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">Allowed file types: png, jpg, jpeg.</p>
                                    </div>
                                    {/* Campos de edición */}
                                    <div className="flex flex-col space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Nombre Paquete
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                defaultValue={selectedPackage?.name}
                                                placeholder="Nombre Paquete"
                                                required
                                                name="name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Descripción del paquete
                                            </label>
                                            <textarea
                                                placeholder="Descripción detallada del paquete"
                                                id="description"
                                                required
                                                name="description"
                                                defaultValue={selectedPackage?.description}
                                                rows={5} // Ajusta la cantidad de filas según el espacio necesario
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Capacidad
                                            </label>
                                            <input
                                                type="number"
                                                id="max_person"
                                                required
                                                name="max_person"
                                                defaultValue={selectedPackage?.max_person}
                                                placeholder="número maximo de personas"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        {/* <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            numeros de cabañanas aptas
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="número maximo de personas"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div> */}
                                        <div className="flex gap-x-4">
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Precio de Lunes a Jueves
                                                </label>
                                                <input
                                                    type="text"
                                                    id="price_monday_to_thursday"
                                                    required
                                                    name="price_monday_to_thursday"
                                                    defaultValue={selectedPackage?.price_monday_to_thursday}
                                                    placeholder="Precio de Lunes a Jueves"
                                                    pattern="^\d+(\.\d{1,2})?$" // Permite números decimales con hasta 2 decimales
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Precio de Viernes a Domingo
                                                </label>
                                                <input
                                                    type="text"
                                                    id="price_friday_to_sunday"
                                                    required
                                                    name="price_friday_to_sunday"
                                                    defaultValue={selectedPackage?.price_friday_to_sunday}
                                                    placeholder="Precio de Viernes a Domingo"
                                                    pattern="^\d+(\.\d{1,2})?$"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-x-4">
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Precio de Garantía
                                                </label>
                                                <input
                                                    type="text"
                                                    id="guarantee"
                                                    required
                                                    name="guarantee"
                                                    defaultValue={selectedPackage?.guarantee}
                                                    placeholder="Precio de Garantía"
                                                    pattern="^\d+(\.\d{1,2})?$"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Precio de Limpieza
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cleaning"
                                                    required
                                                    name="cleaning"
                                                    defaultValue={selectedPackage?.cleaning}
                                                    placeholder="Precio de Limpieza"
                                                    pattern="^\d+(\.\d{1,2})?$"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>


                                        {/* <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Role
                                        </label>
                                        <div className="mt-2 space-y-2">
                                            {["Administrator", "Developer", "Analyst"].map((role) => (
                                                <label
                                                    key={role}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        value={role}
                                                        checked={selectedRole === role}
                                                        onChange={() => setSelectedRole(role)}
                                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-gray-700">
                                                        {role}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div> */}
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
        </Card >
    );
};

export default Package;
