require('dotenv').config();
const axios = require('axios');

const getWeather = async (req, res) => {
  const { city, lat, lon } = req.query;

  if (!city && (!lat || !lon)) {
    return res.status(400).json({
      error: 'Either city or both latitude and longitude are required',
    });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error('OpenWeather API key is not configured');
    return res.status(500).json({
      error: 'Server configuration error. Please contact support.',
    });
  }

  let url;
  if (city) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  }

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!data || !data.city || !data.list || data.list.length === 0) {
      throw new Error('Incomplete or invalid weather data received');
    }

    const cityTimezoneOffset = data.city.timezone;

    const adjustTimezone = (time) => {
      return new Date((time + cityTimezoneOffset) * 1000);
    };

    const { sunrise, sunset } = data.city;

    const isDaytime = () => {
      const now = Math.floor(Date.now() / 1000);
      const currentTime = adjustTimezone(now);
      const sunriseTime = adjustTimezone(sunrise);
      const sunsetTime = adjustTimezone(sunset);
      
      const daytime = currentTime >= sunriseTime && currentTime < sunsetTime;
      return daytime;
    };

    const adjustIcon = (icon) => {
      if (!icon.includes('d') && !icon.includes('n')) {
        return icon;
      }
      return isDaytime() ? icon.replace('n', 'd') : icon.replace('d', 'n');
    };

    const getPriorityIcon = (icons) => {
      const priority = ['50', '13', '11', '10', '09', '04', '03', '02', '01'];
      for (let prio of priority) {
        const match = icons.find((icon) => icon.startsWith(prio));
        if (match) return match;
      }
      return icons[0];
    };

    const currentWeather = data.list[0];

    const dailyForecasts = data.list.reduce((acc, item) => {
      const date = adjustTimezone(item.dt).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric',
      });
      const time = adjustTimezone(item.dt).getTime();

      if (!acc[date]) {
        acc[date] = {
          temps: [],
          descriptions: [],
          icons: [],
          humidity: [],
          hourly: [],
        };
      }

      acc[date].temps.push(item.main.temp);
      acc[date].descriptions.push(item.weather[0].description);
      acc[date].icons.push(item.weather[0].icon);
      acc[date].humidity.push(item.main.humidity);
      acc[date].hourly.push({
        time: adjustTimezone(time).toLocaleTimeString('en-US', {
          hour: 'numeric',
          hour12: false,
        }),
        temp: item.main.temp,
        humidity: item.main.humidity,
        rain: item.rain?.['3h'] || 0,
        snow: item.snow?.['3h'] || 0,
      });

      return acc;
    }, {});

    const forecast = Object.entries(dailyForecasts)
      .map(([date, data]) => ({
        date,
        temp: {
          high: Math.max(...data.temps),
          low: Math.min(...data.temps),
        },
        description: getMostFrequent(data.descriptions),
        icon: getPriorityIcon(data.icons).replace('n', 'd'),
        humidity: Math.round(
          data.humidity.reduce((sum, val) => sum + val, 0) / data.humidity.length
        ),
        hourly: data.hourly,
      }))
      .slice(0, 5);

    const formattedResponse = {
      country: data.city.country,
      city: data.city.name,
      current: {
        temperature: currentWeather.main.temp,
        feels_like: currentWeather.main.feels_like,
        humidity: currentWeather.main.humidity,
        description: currentWeather.weather[0].description,
        icon: adjustIcon(currentWeather.weather[0].icon),
      },
      forecast,
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error('Weather API Error:', error.message);

    if (error.response) {
      if (error.response.status === 404) {
        return res.status(404).json({
          error: 'Location not found',
        });
      }
      if (error.response.status === 401) {
        return res.status(500).json({
          error: 'Invalid API key',
        });
      }
    }

    res.status(500).json({
      error: 'Error fetching weather data',
      details: error.message,
    });
  }
};

function getMostFrequent(arr) {
  const frequency = {};
  arr.forEach((item) => (frequency[item] = (frequency[item] || 0) + 1));
  return Object.keys(frequency).reduce((a, b) =>
    frequency[a] > frequency[b] ? a : b
  );
}

module.exports = { getWeather };