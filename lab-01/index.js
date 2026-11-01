// Import Express
const express = require('express');

// Create an Express application
const app = express();

// Disable ETag to avoid 304 cache responses
app.set('etag', false);

// Define the port number
const PORT = process.env.PORT || 3000;

// Middleware to log request details and status codes
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`${req.method} ${req.url} - Status: ${res.statusCode}`);
    });
    next();
});

// GET route for the home page
app.get('/', (req, res) => {
    res.status(200).send('Welcome to my Node.js and Express Server!');
});

// GET route for about page
app.get('/about', (req, res) => {
    res.status(200).json({
        name: 'N. Venkat Sagarika',
        section: 'AIDE - 2B'
    });
});

// GET route to display current date and time
app.get('/time', (req, res) => {
    const currentTime = new Date();
    res.status(200).send(currentTime.toString());
});

// Handle unknown routes (404)
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});