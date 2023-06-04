import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  const [zipCode, setZipCode] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');


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
        if (error.message === 'Invalid zip code') {
          // Display an error message to the user indicating an invalid zip code
          // For example, you can update the state to show the error message
          setError('Invalid zip code entered');
        } else {
          // Display a generic error message for other errors
          setError('Error fetching weather data');
        }
      });
  };
  return (
    <div>
      <h1>Weather App</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <p>Enter a city name or a Zip Code </p>
        <input
          type="text"
          placeholder="City or Zip Code"
          value={zipCode}
          onChange={event => setZipCode(event.target.value)}
        />
        <button className='button-style' type="submit">Get Weather</button>
      </form>
    </div>
  );
};

export default Home;