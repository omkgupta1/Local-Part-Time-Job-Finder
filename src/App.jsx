import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './login.jsx';
import Register from './register.jsx';
import SeekerHome from "./SeekerHome.jsx";

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-2">Worknest</h1>
        <p className="text-xl text-gray-300 italic">"Where opportunity finds a home."</p>
      </div>

      <div className="mb-10 max-w-xl text-center text-gray-400">
        <p>
          Worknest is your trusted hub for connecting students with local part-time jobs and
          helping employers find passionate young talent. Whether you're a student looking to gain
          experience or a business looking for flexible help — we’re here to make it happen.
        </p>
      </div>

      <div className="flex gap-6">
        <Link to="/login">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-semibold transition">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl font-semibold transition">
            Register
          </button>
        </Link>
      </div>
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
        <Route path="/seeker/dashboard" element={<SeekerHome />} />
      </Routes>
    </Router>
  );
}

export default App;
