import React, { useState,useEffect } from 'react';
import { useAPIContext } from './context/context';
import  {useForm} from "react-hook-form";
import Navbar from './NavBar';
import Swal from 'sweetalert2';

export default function PlayListSongs() {
  const context = useAPIContext();
  const [array,setArray] = useState([]);
  const [num,setNum]= useState(0);
  const [maxpages,setmaxpages] = useState(0);
  const [text, setText] = useState("");
  
  const [arrayPlaylist,setArrayPlaylist] = useState([]);
  const [numPlaylist,setNumPlaylist]= useState(0);
  const [maxpagesPlaylist,setMaxpagesPlaylist] = useState(0);


  const [playlist, setPlaylist] = useState(undefined);
  const [total, setTotal] = useState("");

  const { register, handleSubmit } = useForm();
  
  const id = window.location.pathname.split('/').pop();

const allData = async () =>{
    const data = await context.getAllSongs(num,text);
    if(data){
        const pages = data.totalPages;
        setmaxpages(pages);
        setArray(data.content)
    }
}

const getPlaylistInfo = async () => {
    const data = await context.getPlaylist(id,numPlaylist);
    if(data){
      const pages = data.songs.totalPages;
      setMaxpagesPlaylist(pages);
      setArrayPlaylist(data.songs.content)
      setPlaylist(data.playlist);
      setTotal(data.sum);
  }
}

const sum = ()=>{
    if(num < maxpages-1)
    {
      setNum(num + 1);
    }
}
const subtraction = ()=>{
    if(num >0){
      setNum(num - 1);
    }
}

const sumPlaylist = ()=>{
  if(numPlaylist < maxpagesPlaylist-1)
  {
    setNumPlaylist(numPlaylist + 1);
  }
}
const subtractionPlaylist = ()=>{
  if(numPlaylist >0){
    setNumPlaylist(numPlaylist - 1);
  }
}


const onSubmit = (data) => {
    setText(data.search)
    setNum(0);
  };

useEffect(()=>{
    getPlaylistInfo(id);
    allData();
},[num,numPlaylist,text]);

const addSongToPlaylist = async (songId) =>{
  const data = await context.addSong(songId,playlist.code);
  console.log(data);
  if(data === "created"){
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
    Toast.fire({
      icon: 'success',
      title: 'Canción agregada correctamente',
      text: 'La canción se ha agregado a la playlist exitosamente.'
    })
    getPlaylistInfo(id);
  }else{
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
    Toast.fire({
      icon: 'error',
      title: 'Error al agregar la canción',
      text: 'Hubo un error al intentar agregar la canción a la playlist. Por favor, inténtalo nuevamente.'
    })
  }
}

const handleClick = (songName,duration,songId) =>{
  Swal.fire({
    title: '¿Desea añadir esta canción a su playlist?',
    text: `Canción: ${songName}, Duración: ${duration}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('Se seleccionó "Sí"');
      addSongToPlaylist(songId);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      console.log('Se seleccionó "No"');
      // Realizar la acción de no añadir la canción a la playlist
    }
  });
}

  return (
    <div className="text-white h-screen w-screen bg-black overflow-auto">
    {
    playlist === undefined && <Navbar username={""} route="/playlist" />
    }
    {
    playlist && <Navbar username={playlist.user.username} route="/playlist" />
    }
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 ">
        <div className="flex justify-center  items-start">
          <div className="border border-gray-800 rounded p-8 shadow-md ">
            <div className='w-80'>
                {
                playlist === undefined && <h5>Titulo: undefined</h5>   
                }
                {
                playlist && <h5>{playlist.title}</h5>   
                }
                
            </div>
            <div className="mt-5 flex justify-between items-center w-full">
                {
                playlist === undefined && <h5 className="mr-10  ">Descripcion: undefined</h5> 
                }
                {
                playlist && <h5 className="mr-10  ">{playlist.description}</h5> 
                }
            </div>
            <h5>Numero de listas: {maxpagesPlaylist}</h5>
            <div className="mt-4 flex justify-between items-center text-white">
              <button className="pointer-events-auto" onClick={subtractionPlaylist}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
              </button>
              {numPlaylist+1}
              <button className="pointer-events-auto"  onClick={sumPlaylist}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
            </div>
            <div>
              <h1>Total de minutos: {total}</h1>
              {arrayPlaylist.map(data => (
                <div key={data.id} className="w-80 mt-4 bg-white rounded-lg h-8 w-full pointer-events-auto">
                  <div className="flex justify-between text-black">
                    <h4 className="ml-1">{data.title}</h4>
                    <h4 className="mr-1">{data.duration}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-start">
          <div className="mb-40 border border-gray-800 rounded p-8 shadow-md ">
            <div className="text-white w-80 ">
              <div className="mb-5  flex justify-center items-center">
                <h5>Listado de canciones Disponibles</h5>
              </div>
              <div className="mb-5  flex justify-center items-center">
              <form onSubmit={handleSubmit(onSubmit)}>
              <input className="text-black rounded-md w-full py-0" type="text" placeholder="Buscar PlayList" 
               {...register("search",{required:false})}
              />
              <button type="submit">BUSCAR</button>
              </form>
              </div>
            </div>
            <h5>Numero de listas: {maxpages}</h5>
            <div className="mt-4 flex justify-between items-center text-white">
              <button className="pointer-events-auto" onClick={subtraction}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
              </button>
              {num+1}
              <button className="pointer-events-auto"  onClick={sum}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
            </div>

            <div className="">
            {
                array.map( data =>
              <div key={data.id} className="grid  mt-4 mb-5 justify-center w-full">
                <div className="bg-white rounded-lg h-8 w-80">
                  <div className="flex justify-between text-black">
                    <h4 className="ml-2">{data.title}</h4>
                    <h4 className="ml-10 mr-2">{data.duration}</h4>
                  </div>
                </div>

                <div className="text-white">
                  <button className="mt-1 flex justify-center border-pink-600 bg-pink-600 text-white py-1 w-full rounded-md hover:bg-pink-900 hover:text-white font-semibold pointer-events-auto"
                  onClick={()=>{handleClick(data.title,data.duration,data.id)}}
                  >
                    <h4 className="ml-2">Agregar</h4>
                    <h4 className="ml-1 mr-1">Cancion</h4>
                  </button>
                </div>
              </div>
                )
            }
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
