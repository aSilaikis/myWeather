import React from 'react';

export default function WeatherSelectionButtons({ setSelectedData, selectedData, weather, selectedDay, isDarkMode }) {
    const { hourly } = weather.forecast[selectedDay];
    const hasRain = hourly.some((hour) => hour.rain > 0);
    const hasSnow = hourly.some((hour) => hour.snow > 0);

    const getButtonStyles = (type) => {
        const baseStyles = 'px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm';
        const selectedStyles = {
            temp: 'bg-blue-600 text-white hover:bg-blue-700',
            humidity: 'bg-green-600 text-white hover:bg-green-700',
            rain: 'bg-amber-600 text-white hover:bg-amber-700',
            snow: 'bg-sky-600 text-white hover:bg-sky-700'
        };
        const unselectedStyles = isDarkMode
            ? 'bg-gray-800 text-gray-100 hover:bg-gray-900 border border-gray-600'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200';

        return `${baseStyles} ${selectedData === type ? selectedStyles[type] : unselectedStyles}`;
    };

    return (
        <div className="flex flex-wrap gap-3 mt-2 mb-6">
            <button
                onClick={() => setSelectedData('temp')}
                className={getButtonStyles('temp')}
            >
                Temperature
            </button>
            <button
                onClick={() => setSelectedData('humidity')}
                className={getButtonStyles('humidity')}
            >
                Humidity
            </button>
            {hasRain && (
                <button
                    onClick={() => setSelectedData('rain')}
                    className={getButtonStyles('rain')}
                >
                    Rain
                </button>
            )}
            {hasSnow && (
                <button
                    onClick={() => setSelectedData('snow')}
                    className={getButtonStyles('snow')}
                >
                    Snow
                </button>
            )}
        </div>
    );
}