import Navbar from './NavBar';
import { useAPIContext } from './context/context';
import React, { useState,useEffect } from 'react';
import  {useForm} from "react-hook-form";
import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import conPlaylist from './context/conPlaylist'


const CreatePlaylist= () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(undefined);
    const context = useAPIContext();
    const [username,setUsername] = useState(undefined);
    
    const onSubmit = async(data,e) =>{
        e.preventDefault();
        e.target.reset();

        console.log(data)

        const token = localStorage.getItem('TOKEN')
        const response = await conPlaylist.addPlaylist(token, data.title, data.description);
        console.log("hOLA")
       
        if(response){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              navigate("/playlist");
              
              Toast.fire({
                icon: 'success',
                title: 'Playlist agregada correctamente'
              })
              
              
              navigate("/playlist");
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error al agregar la Playlist',
            });
          }
      }

      useEffect(()=>{
        setUsername(context.username);
    },[username]);

      const {register,handleSubmit,} = useForm();

  return (
    <div className="text-white h-screen w-screen bg-slate-900 overflow-auto">
        {
        username === undefined && <Navbar username={""} route="/playlist" />
        }
        {
        username && <Navbar username={username} route="/playlist" />
        }
      <div className="ftext-black h-screen w-screen bg-slate-900">
        <div>
          <div className="flex justify-center bg-slate-900 ">
            <div className="mt-10 border rounded p-8 max-w-md w-full bg-white shadow-lg shadow-white ">
              <h2 className="text-xl font-bold mb-4 text-gray-400 text-center">Creación de playlist</h2>
              <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="username">Nombre</label>
                  <input className=" rounded-full appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nombre de la playlist" required 
                  {...register("title",{required:true})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2  " htmlFor="description">Descripción</label>
                  <input className=" rounded-full appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Descripción" required 
                  {...register("description",{required:true})}
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <button className="  bg-cyan-700 hover:bg-red-700 text-white py-1 w-full rounded-md hover:text-white font-semibold pointer-events-auto " type="submit">
                      Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default CreatePlaylist;
