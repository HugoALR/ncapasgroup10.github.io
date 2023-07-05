import React, { useState, useEffect } from 'react';
import { useAPIContext } from './context/context';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import conSongs from '../src/context/conSongs';

export default function Songs() {
  const context = useAPIContext();
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [num, setNum] = useState(0);
  const [maxpages, setMaxpages] = useState(0);
  const [text, setText] = useState("");
  const [username, setUsername] = useState(undefined);

  const { register, handleSubmit } = useForm();


  const handleSlideClick = (data) => {
    console.log(data)
    navigate(`/playlist/songs/${data.code}`);
  }
    
  const allData = async () => {
    const userInfo = context.username;
    if (userInfo) {
      setUsername(userInfo);
    }

    const data = await context.getAllSongs(num, text);
  
    if (data) {
      const pages = data.totalPages;
      setMaxpages(pages);
      setArray(data.content)
    }
  

  const dataCount = await context.getTotalDuration(id, count);
    if (dataCount) {
      const pages = dataCount.totalPages;
      setMaxpages(pages);
      setArray(dataCount.content)
    }
}  
  const sum = () => {
    if (num < maxpages - 1) {
      setNum(num + 1);
    }
  }
  const subtraction = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  }

  const onSubmit = (data) => {
    setText(data.search)
    setNum(0);
  };

  const sumatoria = data.reduce((total, data) => total + data, 0);

  useEffect(() => {
    allData();
  }, [num, text]);

  const handleSongsClick = () => {
    // Acción para el botón "Songs"
    // Aquí puedes redirigir a una página de canciones o realizar alguna otra acción relacionada con las canciones.
  }

  const handlePlaylistClick = () => {
    // Acción para el botón "Playlist"
    // Aquí puedes redirigir a una página de listas de reproducción o realizar alguna otra acción relacionada con las listas de reproducción.
  }

  const handleUserPlaylistClick = () => {
    // Acción para el botón "User Playlist"
    // Aquí puedes redirigir a una página de listas de reproducción del usuario o realizar alguna otra acción relacionada con las listas de reproducción del usuario.
  }

  // const items = ['Item 1', 'Item 2', 'Item 3']; // Array con los ítems
 
return (
<div className="text-black h-screen w-screen bg-slate-900">
  {username === undefined && <Navbar username={""} route="/playlist" />}
  {username && <Navbar username={username} route="/playlist" />}

  <div className="flex justify-center bg-slate-900 ">
    <div className="mt-10 border rounded p-8 max-w-md w-full bg-white shadow-lg shadow-white ">
      <div className="mb-5 flex justify-center items-center  ">
        <form onSubmit={handleSubmit(onSubmit)}>
         
        </form>
      </div>
      
      <h5 className='text-xl text-center font-bold'> Todas las canciones</h5>
      <h5 className='text-center'>Pagina de canciones: {maxpages}</h5>
      
      <div className="mt-4">
        <table className="min-w-full rounded border-gray-400 border ">
          <thead>
            <tr>
              <th className="py-2 rounded border-gray-400 border ">Title</th>
              
              <th className="py-2 rounded border-gray-400 border">Duration</th>

            </tr>
          
        
          </thead>
          <tbody>
            
            {array.map((data) => (
              <tr
                key={data.code}
                className="cursor-pointer bg-white hover:bg-gray-100"
                onClick={() => handleSlideClick(data)}
                
              >
                <td className="py-2 px-4">{data.title}</td>
                <td className="py-2 px-4">{data.duration}</td>
                <td className="py-2 px-4">{sumatoria}</td>
                
                
              </tr>
              
            ))}

           {array.map((dataCount) => (
              <tr
                key={dataCount.code}
                className="cursor-pointer bg-white hover:bg-gray-100"
                onClick={() => handleSlideClick(dataCount)}
                
              >
                <td className="py-2 px-4">{dataCount.count}</td>
              </tr>
           ))}

          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center text-black">
        <button className="pointer-events-auto" onClick={subtraction}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </button>
        {num + 1}
        <button className="pointer-events-auto" onClick={sum}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </button>
      </div>
        <div className="mt-6 flex justify-between items-center text-black ">
        
          <button
            className= " ml-2 bg-cyan-700 hover:bg-green-700 text-white py-1 w-full rounded-md hover:text-white font-semibold pointer-events-auto"
            onClick={() => {
              navigate("/playlist/create");
            }}
          >
            Playlist
          </button>
          <button
            className="ml-2  bg-cyan-700 hover:bg-red-700 text-white py-1 w-full rounded-md hover:text-white font-semibold pointer-events-auto"
            onClick={() => {
              navigate("/playlist/song");
            }}
          >
            Song
          </button>
          <button
            className="ml-2  bg-cyan-700 hover:bg-blue-700 text-white py-1 w-full rounded-md hover:text-white font-semibold pointer-events-auto"
            onClick={() => {
              navigate("/playlist/create");
            }}
          >
            PlaylistXSong
          </button>
        </div>
    </div>

  </div>
</div>

  );
}
