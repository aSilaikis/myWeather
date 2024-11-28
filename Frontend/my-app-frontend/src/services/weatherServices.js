import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
});

export const getWeather = async (city) => {
  try {
    const response = await api.get('/weather', {
      params: { city },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await api.get('/weather', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const handleAxiosError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.error || 'Error fetching weather data');
  } else if (error.request) {
    throw new Error('No response received from the server. Please check your internet connection.');
  } else {
    throw new Error('Error setting up the request. Please try again later.');
  }
};
