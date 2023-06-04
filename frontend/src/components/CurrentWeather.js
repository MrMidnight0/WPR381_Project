import React, { useEffect, useState } from 'react';
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

  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  if (!weatherData || !weatherData.main || !weatherData.weather || weatherData.weather.length === 0) {
    return (
      <div>
      <p>Invalid zipcode or city name</p>
      
        <div>
          <button className='button' onClick={routeChange}> Try Again</button>
        </div>
      </div>
      )   
  }

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const TempCurrent = (temp, currentUnit) => {
    if (currentUnit === 'metric') {
      // Temperature is already in Celsius
      return temp;
    } else {
      // Convert from Celsius to Fahrenheit
      return (temp * 9) / 5 + 32;
    }
  };

  const TempFeels = (feels_like, currentUnit) => {
    if (currentUnit === 'metric') {
      // Temperature is already in Celsius
      return feels_like;
    } else {
      // Convert from Celsius to Fahrenheit
      return (feels_like * 9) / 5 + 32;
    }
  };
  
  const { main, weather } = weatherData;
  const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

//ensure that the temperature displayed to the user is in the selected unit
  const TempCurrentCon = TempCurrent(main.temp, unit);
  const TempFeelsCon = TempFeels(main.feels_like, unit);

  return (

<div className="weather-container">
<div>
<button className='button' onClick={routeChange}> Go back</button>
</div>
<div className='data'>
<h2>Current Weather for {weatherData.name}</h2>
<div className="d-flex justify-content-center">
  <img src={weatherIcon} alt="Weather Icon" />
</div>

<p>Temperature: {TempCurrentCon.toFixed(2)}°{unit === 'metric' ? 'C' : 'F'}</p>

<p>Weather: {weather[0].description}</p>

 <p>Feels like: {TempFeelsCon.toFixed(2)}°{unit === 'metric' ? 'C' : 'F'}</p>

 <button onClick={toggleUnit}>
  Change Temperature to: {unit === 'metric' ? 'Imperial' : 'Metric'}
</button> 
</div>

</div>

  );
};

export default CurrentWeather;