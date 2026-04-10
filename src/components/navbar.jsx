'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../app/styles/navbar.css';


export default function Navbar() {
    const router = useRouter()
    const [user, setUser] = useState(null);

    const syncUser = () => {
        const savedUser = localStorage.getItem('user');
        setUser(savedUser ? JSON.parse(savedUser) : null);
    }

    useEffect(() => {
        syncUser();

        window.addEventListener('authChange', syncUser)
        return () => window.removeEventListener('authChange', syncUser) 
    }, []);

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('user')
        window.dispatchEvent(new Event('authChange'));
        router.push('/')
    }

    if(!user) return null;
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/favorites">Favorites</Link></li>
                <button onClick={handleLogout}>Logout</button>
            </ul>
        </nav>
    )
}