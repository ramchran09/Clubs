import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Home from './pages/Home.jsx/Home.jsx'
import { AuthProvider } from './context/AuthContext'

import Clubs from './components/Clubs/Clubs.jsx'
import Posts from './components/Posts/Posts.jsx'


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/clubs/:id" element={<Clubs/>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
