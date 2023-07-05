const URL = "http://localhost:8080/users";

const context = {};

context.register = async ( username , email, password ) => {
    console.log(username, email, password)
    const Response = await fetch(`${URL}/auth/singup`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        
        body: JSON.stringify({/* Convert the data to json */
            username: `${username}`,
            email: `${email}`,
            password: `${password}`
        })
    })
    const response = await Response
  }

 
export default context;

