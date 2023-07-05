import React, { useMemo, useState, createContext, useContext,useEffect} from 'react';
import { song } from '../services/song';
import { user } from '../services/user';
import { playlist } from '../services/playlist';
const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);
  const [username, setUsername] = useState(undefined);

/*
  useEffect(() => {
    async function fetchData() {
      const data = localStorage.getItem('TOKEN');
      console.log(data)
      if (data !== undefined) {
        setToken(data);
        const userInfo = await user.getUserInfo(localStorage.getItem("TOKEN"));
        if (userInfo) {
          setUsername(userInfo.data.username);
        }
      }
    }
    fetchData();
  }, [token]);

  */
  const getAllSongs = async (title ,duration, date) => {
    const data = await song.getAllSongs(localStorage.getItem("TOKEN"),title, duration, date );
    return data;
  };

  const getPlaylistsByUser = async (num,title) => {
    const data = await user.getPlaylistsByUser(localStorage.getItem("TOKEN"), num, title);
    return data;
  }

  const getPlaylist = async (id,num) =>{
    const data = await playlist.getPlaylist(localStorage.getItem("TOKEN"),id,num);
    return data;
  }

  const getTotalDuration = async (count) => {
    const data = await playlist.getTotalDuration(localStorage.getItem("TOKEN"), id, count);
    return data;
  }
  const isLoggedIn = () => {
    return token;
  };

  const register = async (username,email,password) =>{
    try {
      const data = await register(username,email,password);
      console.log(data)
      if (!data.status ) {
        return "created";
      }
      
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  const addPlaylist = async (title,description) =>{
    try {
      const data = await playlist.addPlaylist(localStorage.getItem("TOKEN"),title,description);
      if (!data.status ) {
        return "created";
      }
      if (data.status === 401) {
        return "unauthorized";
      }
      if (data.status === 404) {
        return "notFound";
      }
      if (data.status === 404) {
        return "badRequest";
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  const addSong = async (songId,playlistId) => {
    try {
      const data = await playlist.addSong(localStorage.getItem("TOKEN"),songId, playlistId);
      console.log(data);
      if (data.status === 201) {
        return "created";
      }
      if (data.status === 401) {
        return "unauthorized";
      }
      if (data.status === 404) {
        return "notFound";
      }
      if (data.status === 404) {
        return "badRequest";
      }
      
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (id, password) => {
    try {
      const data = await user.login(id, password);
      console.log(data);
      if (!data.status ) {
        localStorage.setItem('TOKEN', data.token);
        setToken(data.token);
        console.log(data.token);
        return "ok";
      }
      if (data.status === 401) {
        return "unauthorized";
      }
      if (data.status === 404) {
        return "notFound";
      }
      if (data.status === 404) {
        return "badRequest";
      }
      
      return false;
    } catch (error) {
      console.log(error);
    }
  };
  



  const logout = () => {
    localStorage.setItem('TOKEN', undefined);
    setToken(undefined);
  };

  const data = useMemo(
    () => ({
      username:username,
      addSong:addSong,
      isLoggedIn: isLoggedIn,
      token: token,
      login: login,
      logout: logout,
      getPlaylistsByUser: getPlaylistsByUser,
      getAllSongs: getAllSongs,
      getPlaylist: getPlaylist,
      addPlaylist: addPlaylist,
      getTotalDuration : getTotalDuration,
      register: register,
    }),
    [username,token, login, getAllSongs, getPlaylistsByUser,getPlaylist, logout, isLoggedIn,addSong, addPlaylist,register, getTotalDuration]
  );

  return <APIContext.Provider value={data}>{children}</APIContext.Provider>;
};

export const useAPIContext = () => {
  const context = useContext(APIContext);
  return context;
};
