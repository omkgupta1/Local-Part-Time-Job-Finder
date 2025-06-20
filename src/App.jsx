import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './login.jsx'; // adjust path if needed
import Register from "./register.jsx";


function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Nitin bihari World</h1>
      <Link to="/login">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold">
          Login
        </button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
