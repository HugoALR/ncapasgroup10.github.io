const URL = "http://localhost:8080";

const context = {};

context. getAllSongs = async ( token, title, duration, date ) => {
    console.log(title)
    const Response = await fetch(`${URL}/song`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        
        },
        
        body: JSON.stringify({/* Convert the data to json */
             title: `${title}`,
            duration: `${duration}`,
            date: `${date}`,
        
        })
    });
    const response = await Response
  }

 
export default context;

