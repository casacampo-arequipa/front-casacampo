// src/components/ProtectedAdminRoute.jsx
import React from 'react';
import { getUserData, token } from '../../helpers/auth';
import { Navigate } from 'react-router-dom';


const ProtectedAdminRoute = ({ element, ...rest }) => {
    // Verificar si hay un token en localStorage
    const userToken = token();
    const user = getUserData(); // Obtener los datos del usuario (desencriptados)
    console.log(user)
    // Verificar si el token existe y si el rol_id es 1 (admin)
    if (!userToken || !user) {
        // Si no está autenticado o el rol no es admin, redirigir al login
        return <Navigate to="/login" replace />;
    }
    if (user.role !== "Admin") {
        return <Navigate to="/access-denied" replace />;
    }

    return element; // Si pasa la validación, permitir el acceso a la ruta
};

export default ProtectedAdminRoute;
