import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAPIContext } from './context/context';
import conRegister from '../src/context/conRegister';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const context = useAPIContext();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
        });
      }
      else{
            const response = await conRegister.register(data.username, data.email, data.password);
            if (response) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
            });
            navigate('/');
            Toast.fire({
                icon: 'success',
                title: "¡Registro exitoso!",
                text: 'El usuario ha sido registrado correctamente.',
            });
            e.target.reset();
            navigate('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: 'Ha ocurrido un error al intentar registrar el usuario. Por favor, verifica que todos los campos estén correctamente llenados.',
                });
                
            }
      }
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="max-w-md w-full bg-white rounded shadow-md p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Registro de usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre de usuario
            </label>
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              required
              {...register('username')}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo electrónico
            </label>
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
              id="email"
              type="email"
              placeholder="Correo electrónico"
              required
              {...register('email')}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
              id="password"
              type="password"
              placeholder="Contraseña"
              required
              {...register('password')}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirmar contraseña
            </label>
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
              id="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
              required
              {...register('confirmPassword')}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Registrarse
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                navigate('/');
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
