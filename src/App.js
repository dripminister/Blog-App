import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import CreatePost from "./pages/CreatePost"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { auth } from "./firebase"
import { useState } from "react"
import User from "./pages/User"

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const ProtectedRoute = ({ children }) => {
    if (auth.currentUser === null) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated}/>}
      <Routes>
        <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>}/>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
        <Route path="/create" element={
          <ProtectedRoute>
            <CreatePost/>
          </ProtectedRoute>}/>
        <Route path="/user/:id" element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
