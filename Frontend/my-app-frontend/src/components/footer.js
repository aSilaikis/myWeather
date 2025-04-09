import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Github, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">About</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                        myWeather provides accurate and up-to-date weather information to help you plan your day.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Contact</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <a href="mailto:arnas.silaikis@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-2 hover:font-semibold hover:underline underline-offset-1">
                                    <Mail className="w-5 h-5 mr-2" />arnas.silaikis@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/weather" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:font-semibold hover:underline underline-offset-1">
                                    Weather
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:font-semibold hover:underline underline-offset-1">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:font-semibold hover:underline underline-offset-1">
                                Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Follow Me</h3>
                        <div className="flex space-x-4">
                            <a href="https://github.com/aSilaikis" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Github className="w-8 h-8 hover:w-9 hover:h-9" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://instagram.com/arnas.silaikis" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Instagram className="w-8 h-8 hover:w-9 hover:h-9" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://www.linkedin.com/in/arnas-silaikis" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Linkedin className="w-8 h-8 hover:w-9 hover:h-9" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} myWeather.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

