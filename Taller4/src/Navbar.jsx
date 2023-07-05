import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAPIContext } from './context/context';

const Navbar = ({ username, route }) => {
  const navigate = useNavigate();
  const context = useAPIContext();
  const goBack = (route) => {
    navigate(route);
    console.log(route);
  };

  const logoutFuntion = () => {
    context.logout(); 
    navigate("/"); 
}

  return (
    <div className="sticky top-0 bg-slate-900 p-2">
    <div className="flex justify-between items-center container mx-auto">
      <div>
        <p className="text-lg font-bold text-black">{username}</p>
      </div>
      <div className="ml-4">
        <button className="bg-red-700 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 text-sm rounded-full"
        onClick={logoutFuntion}
        >
          Cerrar sesión
        </button>
        <button
          onClick={() => goBack(route)}
          className="bg-orange-400 hover:bg-gray-700 text-white font-bold py-1 px-2 text-sm rounded-full"
        >
          Volver atrás
        </button>
      </div>
    </div>
  </div>
  );
};

export default Navbar;

