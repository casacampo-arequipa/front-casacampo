// src/components/Cabanas.js
import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaTable, FaTh } from 'react-icons/fa';
import { Button, Modal } from 'flowbite-react';
import useFetch from '../useFetchAdmin';
import axios from 'axios';
import { API_URL } from '../env';
import { token } from '../helpers/auth';
import Swal from 'sweetalert2';
import Loader from './Loader';

const Comments = () => {
    const [isTableView, setIsTableView] = useState(true);
    const { data, loading, error } = useFetch("opinion");
    console.log(data)
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
                );

                Swal.fire({
                    title: "¡Buen trabajo!",
                    text: "La cabaña ha sido actualizado exitosamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                setOpenModal(false);

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
                );

                setOpenModal(false);

                Swal.fire({
                    title: "¡Buen trabajo!",
                    text: "La cabaña ha sido creada exitosamente.",
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

    };

    const handledeleteClick = async (id) => {
        // Mostrar la confirmación primero
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

        // Si el usuario confirma, elimina el dato
        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/cottage-admin/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token()}`, // Añade el token al header
                    },
                });

                // Notificar éxito
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

                // Actualizar estado o realizar lógica de limpieza
                setOpenModal(false);
                // Aquí puedes actualizar el estado de los datos localmente si no deseas recargar:
                // setData(data.filter(item => item.id !== id));

                // Recargar la página solo si es estrictamente necesario
                // window.location.reload();
            } catch (error) {
                console.error("Error al eliminar los datos:", error);

                // Notificar error
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
                    placeholder="Buscar Comentario"
                    className="p-2 border border-gray-300 rounded-lg w-1/3 "
                    value=""
                // onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-left table-auto min-w-max text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 font-normal">ID</th>
                            <th className="p-3 font-normal">Autor</th>
                            <th className="p-3 font-normal">Comentario</th>
                            <th className="p-3 font-normal">Fecha de Creación</th>
                            <th className="p-3 font-normal">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {data?.opinions.map((cottage, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="p-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </td>
                                <td className="p-3">{cottage.user.name} {cottage.user.lastname}</td>
                                <td className="p-3">{cottage.coment}</td>
                                <td className="p-3">
                                    {new Date(cottage.created_at).toLocaleDateString()}{" "}
                                    {new Date(cottage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </td>

                                <td className="p-2">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-700" onClick={() => handledeleteClick(cottage.id)}>
                                            <i className="fa-solid fa-trash "></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </Card >
    );
};

export default Comments;
