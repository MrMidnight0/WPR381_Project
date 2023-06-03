const express = require('express');
const fetch = require('isomorphic-fetch');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

// Weather API key
const API_KEY = 'c4e81e91cb3513cbe9376a1899040eff';

// Routes
app.post('/weather', (req, res) => {
  const { zipCode } = req.body;
  console.log('Received zip code:', zipCode);

  // Validate zip code (you can implement your own validation logic)
  if (!isValidZipCode(zipCode)) {
    console.log('Invalid zip code:', zipCode);
    return res.status(400).json({ error: 'Invalid zip code' });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${zipCode}&APPID=${API_KEY}`;

  axios.post(apiUrl)
    .then(response => {
      const data = response.data;
      console.log('Received weather data:', data);
      if (data.cod === '404') {
        throw new Error('Weather data not found');
      }
      res.json(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Error fetching weather data' });
    });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Weather App!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Helper function to validate zip code
function isValidZipCode(zipCode) {
  //pattern for a 5-digit zip code
  const zipCodePattern = /^\d{5}$/;
  
  return zipCodePattern.test(zipCode);
}