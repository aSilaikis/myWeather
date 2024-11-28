import axios from 'axios';

export const getWeather = async (city) => {
    try {
        const response = await axios.get('/api/weather', {
            params: { city },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Error fetching weather data');
        } else if (error.request) {
            throw new Error('No response received from the server. Please check your internet connection.');
        } else {
            throw new Error('Error setting up the request. Please try again later.');
        }
    }
};

export const getWeatherByCoords = async (lat, lon) => {
    try {
        const response = await axios.get('/api/weather', {
            params: { lat, lon },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Error fetching weather data');
        } else if (error.request) {
            throw new Error('No response received from the server. Please check your internet connection.');
        } else {
            throw new Error('Error setting up the request. Please try again later.');
        }
    }
};