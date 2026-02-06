import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import Login from './components/Login/Login'
import Home from './pages/Home.jsx/Home.jsx'



export default function App() {
 
  
  const [showLogin, setShowLogin] = useState(false);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setShowLogin={setShowLogin} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
