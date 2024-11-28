const validateWeatherParams = (req, res, next) => {
    const { city, lat, lon } = req.query;
    
    if (!city && (!lat || !lon)) {
      return res.status(400).json({ 
        error: 'Either city or both latitude and longitude are required' 
      });
    }
  
    if (lat && (isNaN(lat) || lat < -90 || lat > 90)) {
      return res.status(400).json({ error: 'Invalid latitude' });
    }
  
    if (lon && (isNaN(lon) || lon < -180 || lon > 180)) {
      return res.status(400).json({ error: 'Invalid longitude' });
    }
  
    next();
  };
  
  module.exports = { validateWeatherParams };