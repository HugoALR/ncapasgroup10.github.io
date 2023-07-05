const URL = "http://localhost:8080";

export const playlist = {
  
  getPlaylist: async (token, id, totalPages) => {
    try {
      const response = await fetch(`${URL}/users/playlists/${id}?page=${totalPages}&size=7`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
     
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },

  getTotalDuration: async (token, id,  count) => {
    try {
      const response = await fetch(`${URL}/playlist/songs${id}?page=${count}&size=7`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
     
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },

  addSong: async (token, songId, id) => {
    try {
      const response = await fetch(`${URL}/playlist/addsong/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          song: songId,
        }),
      });
      return response;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },

  addPlaylist: async (token, title, description  ) => {
    try {
      const response = await fetch(`${URL}/playlist/createplaylist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      console.log("hola")
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
};
