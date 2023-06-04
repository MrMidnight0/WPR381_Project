const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// Weather API key
const API_KEY = 'ADD YOUR API KEY HERE';


// Routes
app.post('/weather', (req, res) => {
  const { zipCode } = req.body;
  console.log('Received zip code:', zipCode);

  
    // Perform the API request to fetch weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${zipCode}&APPID=${API_KEY}&units=metric`;
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
        if (error.response && error.response.status === 404) {
          console.log('Invalid zip code:', zipCode);
          res.status(404).json({ error: 'Invalid zip code' });
        } else {
          console.error('Error fetching weather data:', error);
          res.status(500).json({ error: 'Error fetching weather data' });
        }
      })
});


app.get('/', (req, res) => {
  res.send('Welcome to the Weather App!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

