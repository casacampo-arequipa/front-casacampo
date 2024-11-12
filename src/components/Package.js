// src/components/Descuentos.js
import React, { useState } from 'react';
import useFetch from '../useFetchAdmin';
import { Button, Card, Modal } from 'flowbite-react';
import { FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import CabinCards from './CabinCards';

const Package = () => {
    const { data, loading, error } = useFetch("packages-admin");
    const [openModal, setOpenModal] = useState(false);
    console.log(data);
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
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Id</th>
                            <th className="border px-4 py-2">Imagen</th>
                            <th className="border px-4 py-2">Nombre Paquete</th>
                            <th className="border px-4 py-2">Capacidad</th>
                            <th className="border px-4 py-2">Precio de L- J</th>
                            <th className="border px-4 py-2">Precio de V - D</th>
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
                                <td className="p-2">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-2 rounded-lg text-white bg-green-500 hover:bg-green-700" onClick={() => setOpenModal(true)}>
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
                    <Modal
                        size="4xl"
                        show={openModal}
                        onClose={() => setOpenModal(false)}
                    >
                        <Modal.Header>Editar Paquete</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                {/* Imagen de avatar */}
                                <div className="flex flex-col items-center justify-center">
                                    <div className="relative">
                                        <img
                                            src="/images/avatar-placeholder.jpg" // Ruta a la imagen de avatar
                                            alt="Avatar"
                                            className="w-24 h-24 rounded-full object-cover"
                                        />
                                        <span className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md">
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
                                            defaultValue="Nombre Paquete"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Capacidad
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="número maximo de personas"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
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
                                Discard
                            </Button>
                            <Button color="blue" onClick={() => alert("Información guardada")}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </table>
            </div>
        </Card >
    );
};

export default Package;
