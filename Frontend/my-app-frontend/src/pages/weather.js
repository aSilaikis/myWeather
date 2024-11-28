import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { getWeather, getWeatherByCoords } from '../services/weatherServices';
import WeatherForm from '../components/weatherComponents/weatherForm';
import WeatherNow from '../components/weatherComponents/weatherNow';
import WeatherDaily from '../components/weatherComponents/weatherDaily';
import WeatherSelectionButtons from '../components/weatherComponents/weatherSelectionButtons';
import WeatherIcon from '../components/weatherComponents/weatherIcon';
import { Loader2, Sun, Moon } from 'lucide-react';

const WeatherGraph = React.lazy(() => import('../components/weatherComponents/weatherGraph'));

const Weather = () => {
    const [state, setState] = useState({
        city: '',
        weather: null,
        error: '',
        isLoading: false,
        selectedDay: 0,
        selectedData: 'temp',
        isDarkMode: false,
    });

    const { city, weather, error, isLoading, selectedDay, selectedData, isDarkMode } = state;

    const updateState = (newState) => {
        setState((prevState) => ({ ...prevState, ...newState }));
    };

    const resetSelection = () => {
        updateState({ selectedData: 'temp' });
    };

    const fetchWeatherByCoords = useCallback(async (lat, lon) => {
        try {
            const data = await getWeatherByCoords(lat, lon);
            setState((prevState) => ({
                ...prevState,
                weather: data,
                city: data.city,
                isLoading: false,
            }));
        } catch (err) {
            console.error('Error fetching weather:', err);
            setState((prevState) => ({
                ...prevState,
                error: 'Failed to fetch weather data.',
                isLoading: false,
            }));
        }
    }, []);

    const getUserLocation = useCallback(() => {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setState((prevState) => ({
                        ...prevState,
                        error: 'Unable to get your location. Please enter a city manually.',
                        isLoading: false,
                    }));
                }
            );
        } else {
            setState((prevState) => ({
                ...prevState,
                error: 'Geolocation is not supported by your browser. Please enter a city manually.',
                isLoading: false,
            }));
        }
    }, [fetchWeatherByCoords]);

    useEffect(() => {
        getUserLocation();
    }, [getUserLocation]);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            updateState({ error: '', weather: null, isLoading: true });

            try {
                const data = await getWeather(city);
                updateState({ weather: data });
            } catch (err) {
                console.error('Error fetching weather:', err);
                updateState({ error: 'Failed to fetch weather data.' });
            } finally {
                updateState({ isLoading: false });
            }
        },
        [city]
    );

    const toggleDarkMode = () => {
        updateState({ isDarkMode: !isDarkMode });
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', !isDarkMode);
    };

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        updateState({ isDarkMode: savedDarkMode });
        if (savedDarkMode) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    return (
        <div className={`flex flex-col items-center p-4 min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-300'}`}>
            <button
                onClick={toggleDarkMode}
                className="absolute top-75 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <WeatherForm
                city={city}
                setCity={(newCity) => updateState({ city: newCity })}
                isLoading={isLoading}
                getUserLocation={getUserLocation}
                handleSubmit={handleSubmit}
                isDarkMode={isDarkMode}
            />
            {error && (
                <div className="text-red-500 mt-4 p-4 border border-red-300 rounded-lg bg-red-50 dark:bg-red-900 dark:border-red-700 shadow-sm w-full max-w-md">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                </div>
            )}
            {isLoading && (
                <div className="flex justify-center items-center mt-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-800 dark:text-gray-200" />
                </div>
            )}
            {weather && (
                <div className="mt-4 p-3 border-2 border-gray-400 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-lg w-full max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-[1.5fr,3fr] gap-4">
                        <div>
                            <WeatherNow weather={weather} WeatherIcon={WeatherIcon} isDarkMode={isDarkMode} />
                            <WeatherDaily
                                weather={weather}
                                WeatherIcon={WeatherIcon}
                                selectedDay={selectedDay}
                                setSelectedDay={(day) => updateState({ selectedDay: day })}
                                resetSelection={resetSelection}
                                isDarkMode={isDarkMode}
                            />
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
                                Hourly Forecast for {weather.forecast[selectedDay].date}
                            </h3>
                            <h4 className="text-lg text-gray-800 dark:text-gray-200 font-semibold pl-4 pt-4">
                                Select Data:
                            </h4>
                            <WeatherSelectionButtons
                                selectedData={selectedData}
                                setSelectedData={(data) => updateState({ selectedData: data })}
                                weather={weather}
                                selectedDay={selectedDay}
                                isDarkMode={isDarkMode}
                            />
                            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-gray-800 dark:text-gray-200" />}>
                                <WeatherGraph
                                    weather={weather}
                                    selectedDay={selectedDay}
                                    selectedData={selectedData}
                                    isDarkMode={isDarkMode}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};    

export default Weather;