import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAPIContext } from './context/context';

const Login = () => {
  const context = useAPIContext();
  const navigate = useNavigate();
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    e.target.reset();

    console.log(data);
    const response = await context.login(data.user, data.password);
    console.log(response);
    if (response === 'ok') {
  
      return navigate('/playlist');
      console.log('Login completed');
    }
    if (response === 'unauthorized') {
      setPasswordError(true);
      console.log('Incorrect password');
    }
    if (response === 'notFound') {
      setUserError(true);
      console.log('User not found');
    }
    if (response === 'badRequest') {
      setError(true);
      console.log('badRequest');
    }
    
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="bg-white rounded shadow-md p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Iniciar sesión</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {error === true && (
            <div className="text-red-500 text-sm text-center">Inicio de sesión fallido</div>
          )}
          <div className="flex flex-col">
            <label className="text-gray-800 text-sm font-bold mb-2">Usuario o correo:</label>
            <input
              className="border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              placeholder="User or email"
              {...register('user', { required: true })}
            />
            {userError === true && (
              <div className="text-red-500 text-sm">Usuario no encontrado</div>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 text-sm font-bold mb-2">Contraseña:</label>
            <input
              className="border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            {passwordError === true && (
              <div className="text-red-500 text-sm">Contraseña errónea</div>
            )}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
            type="submit"
          >
            Iniciar sesión
          </button>
          <p className="text-gray-800 text-sm text-center">
           {' '}
            <a
              className="text-blue-500 hover:text-blue-800"
              onClick={() => {
                navigate('/register');
              }}
            >
            Crear Cuenta
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
