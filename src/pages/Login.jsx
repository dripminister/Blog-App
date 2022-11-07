import React from 'react'
import { auth, provider } from "../firebase"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Login({setIsAuthenticated}) {

    const navigate = useNavigate()

    const handleClick = async () => {
        await signInWithPopup(auth, provider)
        setIsAuthenticated(true)
        navigate("/")
    }

  return (
    <div className='loginPage'>
        <p>Sign In with Google</p>
        <button className='login-with-google-btn' onClick={handleClick}>Sign in with Google</button>
    </div>
  )
}
