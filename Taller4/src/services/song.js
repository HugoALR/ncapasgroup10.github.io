import axios from "axios";

const URL = "http://localhost:8080";

export const song = {
  getAllSongs: async (token, title, duration) => {
    try {
      const response = await fetch(`${URL}/song/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
};

