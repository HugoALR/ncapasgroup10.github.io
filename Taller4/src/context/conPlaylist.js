const URL = "http://localhost:8080";

const context = {};

context.addPlaylist = async ( token, title, description ) => {
    const Response = await fetch(`${URL}/playlist/createplaylist`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json",
        
        },
        
        body: JSON.stringify({/* Convert the data to json */
            title: `${title}`,
            description: `${description}`
        
        })
    });
    const response = await Response
  }

 
export default context;

