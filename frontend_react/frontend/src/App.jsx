import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Base from "./pages/Base"
import PokeWea from "./pages/PokeWea"
import Inicio from "./pages/Inicio"
import Post from "./pages/Post"
import ToDo from "./pages/Post"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/NavBar"
import BusacrId from "./pages/BusacarId"


function App() {
  return (
    <div className="container">
        
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Inicio />} />
          <Route path="/post" element={<Post />} />
          <Route path="/PokeWea" element={<PokeWea />} />
          <Route path="/buscarid" element={<BusacrId />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App