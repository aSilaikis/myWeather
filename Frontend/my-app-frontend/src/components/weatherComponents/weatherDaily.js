import React from 'react';

const WeatherDaily = ({ weather, WeatherIcon, selectedDay, setSelectedDay, resetSelection, isDarkMode }) => {
    return (
        <div className={`w-full mt-6 p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md`}>
            <h3 className={`text-2xl font-semibold mb-4 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                5-Day Forecast
            </h3>
            <div className="space-y-3">
                {weather.forecast.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSelectedDay(index);
                            resetSelection();
                        }}
                        className={`w-full p-2 rounded-lg flex justify-between items-center transition duration-300 ${
                            selectedDay === index
                                ? isDarkMode
                                    ? 'bg-blue-700 text-white shadow-lg'
                                    : 'bg-blue-600 text-white shadow-lg'
                                : isDarkMode
                                ? 'bg-gray-600 border border-gray-500 text-gray-100 hover:bg-gray-500'
                                : 'bg-gray-50 border border-gray-300 text-gray-900 hover:bg-gray-300'
                        }`}
                    >
                        <div>
                            <div className="text-lg font-bold">{day.date}</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <WeatherIcon
                                iconCode={day.icon}
                                className={`w-8 h-8 ${
                                    selectedDay === index
                                        ? 'text-white'
                                        : isDarkMode
                                        ? 'text-blue-400'
                                        : 'text-blue-500'
                                }`}
                            />
                            <div className="text-right">
                                <div className="text-lg font-bold">{Math.round(day.temp.high)}°C</div>
                                <div className="text-sm">{Math.round(day.temp.low)}°C</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WeatherDaily;