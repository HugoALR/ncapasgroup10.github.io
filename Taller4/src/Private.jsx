import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAPIContext } from './context/context';

export default function Private({ children }) {
  const navigate = useNavigate();
  const context = useAPIContext();

  const logoutFunction = () => {
    context.logout();
    navigate('/');
  };
  


    if (context.token === "undefined" || context.username === "undefined") {
    return  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
        <p className="text-gray-600 mb-8">La página que estás buscando no existe.</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={logoutFunction}
          type="button"
        >
          Volver al inicio de sesión
        </button>
      </div>
    
  }

  return children;
}
