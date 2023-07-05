const URL = "http://localhost:8080";

const context = {};

context. getAllSongs = async ( token, count ) => {
    console.log(count)
    const Response = await fetch(`${URL}/playlist/songs/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        
        },
        body: JSON.stringify({/* Convert the data to json */
             count: `${count}`         
        
        })
    });
    const response = await Response
  }

 
export default context;

