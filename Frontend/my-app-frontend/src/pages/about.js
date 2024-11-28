import React, { useState, useEffect } from 'react';
import { Snowflake, Thermometer, CloudRainWind, Sun, Moon } from 'lucide-react';

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', newDarkMode);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-300 dark:bg-gray-900 transition-colors duration-200">
      <button
        onClick={toggleDarkMode}
        className="absolute top-75 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
      <div className="mt-14 md:mt-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg w-full max-w-2xl transition-colors duration-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">About myWeather</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          myWeather is a modern weather app offering precise, up-to-date weather forecasts for cities worldwide. It features a user-friendly interface to help users easily access weather details or prepare for daily activities.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Key Features</h2>
        <ul className="space-y-4 mb-6">
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <Thermometer className="h-6 w-6 mr-2 text-blue-500" />
            <span>Live temperature data with feels-like temperature</span>
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <Snowflake className="h-6 w-6 mr-2 text-blue-500" />
            <span>5-day forecasts and detailed condition summaries</span>
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <CloudRainWind className="h-6 w-6 mr-2 text-blue-500" />
            <span>Hourly forecasts with temperature, humidity, rain, and snow</span>
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <Sun className="h-6 w-6 mr-2 text-blue-500" />
            <span>Dynamic location search with "Use My Location" support</span>
          </li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          Stay informed with myWeather's clean interface and dynamic forecasts, making weather insights easily accessible for your needs.
        </p>
      </div>
    </div>
  );
};

export default About;

