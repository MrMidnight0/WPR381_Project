import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Weather.css"


const CurrentWeather = () => {
  const location = useLocation();
  const { weatherData } = location.state;
  let navigate = useNavigate();
  const routeChange = () =>{
    let path = '/';
    navigate(path);
  }
  const unitTypeSymbol = {
    'imperial': '°F',
    'metric': '°C',
    '': 'K',
  };

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  if (!weatherData || !weatherData.main || !weatherData.weather || weatherData.weather.length === 0) {
    return <p>Invalid zipcode or city name</p>;
  }

  const celsiusCurrent = () => {
    return Math.round(main.temp - 273.15);
  }
  const celsiusFeel = () => {
    return Math.round(main.feels_like - 273.15);
  }

  const { main, weather } = weatherData;
  const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  return (
    <div>
      <div>
      <button className='button' onClick={routeChange}> Go back</button>
      
      </div>
    <div className='data'>
      <h2>Current Weather for {weatherData.name}</h2>
      <div className="d-flex justify-content-center">
        <img src={weatherIcon} alt="Weather Icon" />
      </div>
      <p>Temperature: {celsiusCurrent(main.temp) + "°C"}</p>
      <p>Weather: {weather[0].description}</p>
       <p>Feels like: {celsiusFeel(main.feels_like)+ "°C"}</p>
       <button className='toggle-button'>Change Unit</button>             
    </div>
    </div>
  );
};

export default CurrentWeather;