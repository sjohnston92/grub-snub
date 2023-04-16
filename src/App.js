import React, {useState, useEffect} from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css';
import Grubs from './components/Grubs';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/cities/:id" element={<Grubs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
