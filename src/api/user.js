const baseUrl = `http://localhost:3001`;


export const fetchUser = async (email) => {
    const response = await fetch(`${baseUrl}/api/login`, {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({email : email})
    });
    console.log(response)
    if(!response) throw new Error('Oops! something went wrong.');
    return response.json()
}
