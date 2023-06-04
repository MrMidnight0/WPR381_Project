import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CurrentWeather = () => {
  const location = useLocation();
  const { weatherData } = location.state;

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  if (!weatherData || !weatherData.main || !weatherData.weather || weatherData.weather.length === 0) {
    return <p>Invalid zipcode or city name</p>;
  }

  const { main, weather } = weatherData;

  return (
    <div>
      <h2>Current Weather for {location.pathname}</h2>
      <p>Temperature: {main.temp}</p>
      <p>Weather: {weather[0].description}</p>
    </div>
  );
};

export default CurrentWeather;