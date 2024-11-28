import React from 'react';

const WeatherNow = ({ weather, WeatherIcon, isDarkMode }) => {
    return (
        <div className={`${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'} shadow-lg rounded-xl p-4 text-center w-full max-w-md mx-auto`}>
            <h2 className="text-2xl font-semibold mb-4">
                {weather.city}, {weather.country}
            </h2>
            <div className="flex items-center justify-center gap-6">
                <WeatherIcon
                    iconCode={weather.current.icon}
                    className={`w-20 h-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                />
                <div className="text-6xl font-bold">
                    {Math.round(weather.current.temperature)}°C
                </div>
            </div>
            <p className="text-lg capitalize mt-1">
                {weather.current.description}
            </p>
            <div className="mt-3 text-left space-y-2">
                <p className="text-lg">
                    <span className="font-semibold">Humidity:</span> {weather.current.humidity}%
                </p>
                <p className="text-lg">
                    <span className="font-semibold">Feels Like:</span> {Math.round(weather.current.feels_like)}°C
                </p>
            </div>
        </div>
    );
};

export default WeatherNow;