import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import CreatePost from "./pages/CreatePost"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { auth } from "./firebase"
import User from "./pages/User"

function App() {

  const ProtectedRoute = ({ children }) => {
    if (auth.currentUser === null) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<div>
								<Navbar />
								<Home />
							</div>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/create"
					element={
						<ProtectedRoute>
							<div>
								<Navbar />
								<CreatePost />
							</div>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/user/:id"
					element={
						<ProtectedRoute>
							<div>
								<Navbar />
								<User />
							</div>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
