import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 dark:bg-gray-950 p-4 transition-colors duration-200">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    myWeather
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/weather" className="text-white hover:bg-gray-700 dark:hover:bg-gray-900 px-3 py-2 rounded transition-colors duration-200">Weather</Link>
                    <Link to="/about" className="text-white hover:bg-gray-700 dark:hover:bg-gray-900 px-3 py-2 rounded transition-colors duration-200">About</Link>
                    <Link to="/contact" className="text-white hover:bg-gray-700 dark:hover:bg-gray-900 px-3 py-2 rounded transition-colors duration-200">Contact</Link>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <Link to="/weather" className="block text-white hover:bg-gray-700 dark:hover:bg-gray-800 px-3 py-2 my-1 rounded transition-colors duration-200">Weather</Link>
                    <Link to="/about" className="block text-white hover:bg-gray-700 dark:hover:bg-gray-800 px-3 py-2 my-1 rounded transition-colors duration-200">About</Link>
                    <Link to="/contact" className="block text-white hover:bg-gray-700 dark:hover:bg-gray-800 px-3 py-2 my-1 rounded transition-colors duration-200">Contact</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

