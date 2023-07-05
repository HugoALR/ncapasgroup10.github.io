import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import PlayListSongs from './PlayListSongs';
import Buscar from './Buscar';
import { APIProvider } from './context/context';
import './index.css';
import Private from './private';
import CreatePlaylist from './CreatePlaylist';
import Register from './Register';
import PrivateSongs from './PrivateSongs';
import FormPlaylist from './FormPlaylist';
import Songs from './Songs';


function App() {
  useEffect(() => {
    document.title = "Canciones y Playlists";
  }, []);

  return (
    <APIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/playlist" element={<Private><Buscar/></Private>} />
          <Route path="/formplaylist" element={<Private><FormPlaylist/></Private>} />
          <Route path="/playlist/create" element={<Private><CreatePlaylist/></Private>} />
          <Route path="/songs" element={<Private><Songs/></Private>} />
          <Route path="/playlist/songs/:id" element={<PrivateSongs><PlayListSongs/></PrivateSongs>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<Private/>}/>
        </Routes>
      </BrowserRouter>
    </APIProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
