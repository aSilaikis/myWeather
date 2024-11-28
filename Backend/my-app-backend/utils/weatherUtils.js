const axios = require('axios');

const getWeather = async (req, res) => {
  const { city, lat, lon } = req.query;
  
  if (!city && (!lat || !lon)) {
    return res.status(400).json({ 
      error: 'Either city or both latitude and longitude are required' 
    });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error('OpenWeather API key is not configured');
    return res.status(500).json({ 
      error: 'Weather service configuration error' 
    });
  }

  let url;
  if (city) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  }

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!data || !data.list || data.list.length === 0) {
      throw new Error('Invalid response format from weather service');
    }

    const currentWeather = data.list[0];
    
    const dailyForecasts = data.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
      if (!acc[date]) {
        acc[date] = {
          temps: [],
          descriptions: [],
          icons: [],
          humidity: [],
          hourly: []
        };
      }
      acc[date].temps.push(item.main.temp);
      acc[date].descriptions.push(item.weather[0].description);
      acc[date].icons.push(item.weather[0].icon);
      acc[date].humidity.push(item.main.humidity);
      acc[date].hourly.push({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: false }),
        temp: item.main.temp,
        humidity: item.main.humidity,
        rain: item.rain ? item.rain['3h'] || 0 : 0,
        snow: item.snow ? item.snow['3h'] || 0 : 0,
        description: item.weather[0].description,
        icon: item.weather[0].icon
      });
      return acc;
    }, {});

    const forecast = Object.entries(dailyForecasts).map(([date, data]) => ({
      date,
      temp: {
        high: Math.max(...data.temps),
        low: Math.min(...data.temps)
      },
      description: getMostFrequent(data.descriptions),
      icon: getMostFrequent(data.icons),
      humidity: Math.round(data.humidity.reduce((sum, val) => sum + val, 0) / data.humidity.length),
      hourly: data.hourly
    })).slice(0, 5);

    const formattedResponse = {
      country: data.city.country,
      city: data.city.name,
      current: {
        temperature: currentWeather.main.temp,
        feels_like: currentWeather.main.feels_like,
        humidity: currentWeather.main.humidity,
        description: currentWeather.weather[0].description,
        icon: currentWeather.weather[0].icon,
      },
      forecast
    };

    res.json(formattedResponse);

  } catch (error) {
    console.error('Weather API Error:', error.message);

    if (error.response) {
      if (error.response.status === 404) {
        return res.status(404).json({ 
          error: 'Location not found' 
        });
      }
      if (error.response.status === 401) {
        return res.status(500).json({ 
          error: 'Invalid API key' 
        });
      }
    }

    res.status(500).json({ 
      error: 'Error fetching weather data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

function getMostFrequent(arr) {
  return arr.sort((a,b) =>
    arr.filter(v => v === a).length
    - arr.filter(v => v === b).length
  ).pop();
}

module.exports = { getWeather };
