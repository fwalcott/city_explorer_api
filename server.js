'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const { response } = require('express');

// Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('Home Page!');
});

app.get('/bad', (request, response) => {
  throw new Error('poo');
});

// The callback can be a separate function. Really makes things readable
app.get('/about', aboutUsHandler);

function aboutUsHandler(request, response) {
  response.status(200).send('About Us Page');
}

// API Routes
app.get('/location', (request, response) => {
  let city = request.query.city;
  let data = require('./data/location.json')[0];
  let location = new Location(data, city);
  response.send(location); 
}); 

app.get('/weather', (request, response) => {
  let weather = request.query.weather;
  let data = require('.data/weather.json')[0]; 
  let weather = new weather(data, weather); 
  response.send(weather); 

app.get('/restaurants', handleRestaurants);

app.use('*', notFoundHandler);

// HELPER FUNCTIONS

function handleLocation(request, response) {
  try {
    const geoData = require('./server/data/location.json');
    const city = request.query.city;
    const locationData = new Location(city, geoData);
    response.send(locationData);
  }
  catch (error) {
    console.log('ERROR', error);
    response.status(500).send('So sorry, something went wrong.');
  }
}
//Constructor Functions 

 function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}   

const weather = []; 
  this.forecast= obj.description;
  this.time = obj.datetime;
 



function handleRestaurants(request, response) {
  try {
    const data = require('./server/data/restaurants.json');
    const restaurantData = [];
    data.nearby_restaurants.forEach(entry => {
      restaurantData.push(new Restaurant(entry));
    });
    response.send(restaurantData);
  }
  catch (error) {
    console.log('ERROR', error);
    response.status(500).send('So sorry, something went wrong.');
  }
}

function Location(obj, query){
  this.latitude = obj.lat;
  this.longitude = obj.lon;
  this.search_query = query;
  this.location = obj.display_name;
}

function Restaurant(entry) {
  this.restaurant = entry.restaurant.name;
  this.cuisines = entry.restaurant.cuisines;
  this.locality = entry.restaurant.location.locality;
} 


function notFoundHandler(request, response) {
  response.status(404).send('huh?');
}



// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
