const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request')

const app = express();
const PORT = process.env.PORT || 5000;

const USDA_SEARCH = 'https://api.nal.usda.gov/ndb/search/?';
const USDA_REPORT = 'https://api.nal.usda.gov/ndb/reports/?';

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Welcome to MyFoodPal!"}');
});

// Use the USDA Search API to lookup foods based on keywords
app.post('/api/search', function (req, res) {
    let urlParams = Object.keys(req.body).map(val =>
        encodeURIComponent(val) + '=' + encodeURIComponent(req.body[val])
    ).join('&')
    let searchURL = USDA_SEARCH + urlParams;
    request(searchURL, function(error, resp, body) {
        console.log(body);
    })
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
