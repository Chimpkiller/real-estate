import { useState } from "react"
import { fetchUser } from "../api/user";
import '../app/styles/form.css'


export default function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const data = await fetchUser(email)
            if(!data || data.error) {
                throw new Error('Oops! something went wrong.')
            }

            localStorage.setItem('user', JSON.stringify(data))
            window.dispatchEvent(new Event('authChange'));
            onLoginSuccess(data);
            location.reload()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-card" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '6px'
            }}>
                <form onSubmit={handleLogin}>
                    <div className="formFields" style={{margin: '1rem 0'}}>
                        <label>Enter your email</label>
                        <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required/>
                    </div>
                    <button type="submit" disabled={loading} style={{
                        marginLeft: 'auto'
                    }}>
                        {loading ? 'Processing' : 'Submit'}</button>
                    {error && <p style={{color: 'red}'}}>{error}</p>}
                </form>
            </div>
        </div>
    )
}