const URL = "http://localhost:8080/users";

export const user = {
  getPlaylistsByUser: async (token, num, title) => {

    
    try {
      const response = await fetch(
        `${URL}/playlists`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },

  
  getUserInfo: async (token) => {
    try {
      const response = await fetch(`${URL}/info`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },

  

 login: async (id,password) => {
  try{
    const response = await fetch(`${URL}/auth/login`, {
      method : "POST",
      headers : {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        password : password,
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return response;
  }
 },

  register: async (username, email, password) => {
    try {
      const response = await fetch(`${URL}/auth/singup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        
      });
      console.log(response)
      
      const data = await response.json();
      console.log(username, email, password); // Handle the response as per your needs

      return data;
    } catch (error) {
     
      console.log(error);
      
      return data;
    }
  }
};
