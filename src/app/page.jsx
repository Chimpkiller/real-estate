'use client';
import Listings from "./listing";
import '../app/styles/base.css';
import { useEffect, useState } from "react";
import Login from "./login";



export default function Page() {
  const[user, setUser] = useState(null);
  const[initializing, setInitializing] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if(savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setInitializing(false)
  }, [])

  if(initializing) return <div className="loader">Loading...</div>
  if(!user) {
    return <Login onLoginSuccess={(data) => setUser(data)}/>
  }
  return (
    <Listings/>
  );
};