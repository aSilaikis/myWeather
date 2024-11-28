import React from 'react';
import { Search, MapPin, CloudSun } from 'lucide-react';

const WeatherForm = ({ city, setCity, isLoading, getUserLocation, handleSubmit, isDarkMode }) => {
    return (
        <form
            onSubmit={handleSubmit}
            className={`mt-14 md:mt-4 flex flex-col items-center space-y-2 w-full max-w-lg ${
                isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-400'
            } border-2 p-6 rounded-xl shadow-lg`}
        >
            <label
                htmlFor="city"
                className={`text-2xl ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                } font-bold text-center flex items-center space-x-2 mb-2`}
            >
                <CloudSun className="w-12 h-12 mr-3"/>Search Weather by City
            </label>
            <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                required
                className={`p-3 w-full border-2 ${
                    isDarkMode
                        ? 'border-blue-400 bg-gray-700 focus:bg-gray-600 text-gray-100'
                        : 'border-blue-500 bg-blue-50 focus:bg-blue-100 text-gray-900'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 text-xl`}
            />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex items-center justify-center flex-1 ${
                        isDarkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white py-3 px-6 rounded-lg disabled:bg-blue-300 transition duration-300`}
                >
                    <Search className="inline-block mr-2" />
                    {isLoading ? 'Loading...' : 'Get Weather'}
                </button>
                <button
                    type="button"
                    onClick={getUserLocation}
                    disabled={isLoading}
                    className={`flex items-center justify-center flex-1 ${
                        isDarkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'
                    } text-white py-3 px-6 rounded-lg disabled:bg-green-300 transition duration-300`}
                >
                    <MapPin className="inline-block mr-2" />
                    Use My Location
                </button>
            </div>
        </form>
    );
};

export default WeatherForm;