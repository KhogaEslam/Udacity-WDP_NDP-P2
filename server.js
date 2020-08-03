// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Port Server will be running
const port = 3000;

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Callback to debug
const listening = () => {
    console.log(`Server Is Running on Port: ${port}
    got to: http://localhost:${port}/`);
}

// Spin up the server
app.listen(port, listening);

// Initialize all route with a callback function

// Callback function to complete GET '/all'
const getData = (request, response) => {

    console.log('=== getData ===');
    console.log(projectData);

    response.send(projectData);
}

// Post Route
const postData = (request, response) => {

    console.log('=== postData ===');
    console.log(request.body);

    projectData.push(request.body);
    response.send(request.body);
}

// Add POST route
app.post('/updateData', postData);

// Add GET route
app.get('/getAllData', getData);