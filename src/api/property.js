const baseUrl = `http://localhost:3001`;


const getHeaders = () => {
    if( typeof window === 'undefined' ) return { 'Content-Type' : 'application/json' }
    const saveUser = localStorage.getItem('user');
    const user = saveUser ? JSON.parse(saveUser) : null;
    const header = user?.is_admin ? 'admin' : 'user';

    return {
        'Content-Type' : 'application/json',
        'user-role' : header
    }
}


export const fetchProperties = async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${baseUrl}/api/listings?${params.toString()}`, {
        headers : getHeaders()
    });
    if(!response) throw new Error('Oops! something went wrong.');
    return response.json()
}


export const fetchPropertyById  = async (id) => {

    const response = await fetch(`${baseUrl}/api/listings/${id}`, {
        headers : getHeaders()
    });
    if(!response.ok) throw new Error('Oops! something went wrong.');
    return response.json()
}