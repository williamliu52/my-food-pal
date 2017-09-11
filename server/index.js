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
    let urlParams = {
        'api_key': process.env.USDA_API_KEY,
        'q': req.body.food,
        'format': 'json'
    }
    // turn params object into a proper query string and create the URL
    queryString = Object.keys(urlParams).map(val =>
        encodeURIComponent(val) + '=' + encodeURIComponent(urlParams[val])
    ).join('&')
    let searchURL = USDA_SEARCH + queryString;
    // perform search and return result
    request(searchURL, function(error, resp, body) {
        let parsedBody = JSON.parse(body);
        parsedBody.message = parsedBody.list.q;
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(parsedBody));
    })
});

// Use the USDA Report API to get the nutrient of a specific food
app.post('/api/report', function (req, res) {
    let urlParams = {
        'api_key': process.env.USDA_API_KEY,
        'format': 'json',
        'ndbno': req.body.ndbno,
        'type': 'b'
    }
    // turn params object into a proper query string and create the URL
    queryString = Object.keys(urlParams).map(val =>
        encodeURIComponent(val) + '=' + encodeURIComponent(urlParams[val])
    ).join('&')
    let reportURL = USDA_REPORT + queryString;
    // call API and return result
    request(reportURL, function(error, resp, body) {
        let parsedBody = JSON.parse(body);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(parsedBody));
    });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
