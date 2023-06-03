import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [zipCode, setZipCode] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = event => {
    event.preventDefault();
  
    // Make a POST request to the backend API
    fetch('http://localhost:8080/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ zipCode })
    })
      .then(response => response.json())
      .then(data => {
        // Redirect to the CurrentWeather page with the weather data
        navigate('/current-weather', { state: { weatherData: data, location: zipCode } });
      })
      .catch(error => {
        console.log(error);
        // Handle error scenarios
      });
  };
  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={event => setZipCode(event.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
};

export default Home;