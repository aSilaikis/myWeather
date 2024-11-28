import React from 'react';
import { 
  Sun, 
  Moon, 
  Cloud, 
  CloudRain, 
  CloudDrizzle,
  CloudLightning,
  Snowflake,
  Cloudy,
  CloudFog,
} from 'lucide-react';

const WeatherIcon = ({ iconCode, className = "w-6 h-6" }) => {
  const getIcon = (code) => {
    const iconMap = {
      '01d': <Sun className={className} />,
      '01n': <Moon className={className} />,
      '02d': <Cloud className={className} />,
      '02n': <Cloud className={className} />,
      '03d': <Cloudy className={className} />,
      '03n': <Cloudy className={className} />,
      '04d': <Cloudy className={className} />,
      '04n': <Cloudy className={className} />,
      '09d': <CloudDrizzle className={className} />,
      '09n': <CloudDrizzle className={className} />,
      '10d': <CloudRain className={className} />,
      '10n': <CloudRain className={className} />,
      '11d': <CloudLightning className={className} />,
      '11n': <CloudLightning className={className} />,
      '13d': <Snowflake className={className} />,
      '13n': <Snowflake className={className} />,
      '50d': <CloudFog className={className} />,
      '50n': <CloudFog className={className} />,
    };

    return iconMap[code] || <Cloud className={className} />;
  };

  return getIcon(iconCode);
};

export default React.memo(WeatherIcon);