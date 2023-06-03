import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CurrentWeather = () => {
  const location = useLocation();
  const { weatherData } = location.state;

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Current Weather for {location.pathname}</h2>
      <p>Temperature: {weatherData.main.temp}</p>
      <p>Weather: {weatherData.weather[0].description}</p>
    </div>
  );
};

export default CurrentWeather;