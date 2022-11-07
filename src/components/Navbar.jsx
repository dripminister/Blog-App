import React from 'react'
import { Link } from 'react-router-dom'
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

export default function Navbar({setIsAuthenticated}) {

    const logOut = async () => {
        await signOut(auth)
        setIsAuthenticated(false)
        window.location.pathname = "/login"
    }

  return (
    <nav>
        <div>
            <Link to="/">Home</Link>
            <Link to="/create">Create Post</Link>
        </div>
        <button onClick={logOut}>Log out</button>
      </nav>
  )
}
