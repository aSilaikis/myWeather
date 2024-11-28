import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Weather from './pages/weather';
import './index.css';
import Footer from './components/footer';
import About from './pages/about';
import Contact from './pages/contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/weather" replace />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);
