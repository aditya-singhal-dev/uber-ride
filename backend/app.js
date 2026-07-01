const dotenv = require('dotenv'); // Load environment variables from .env file, these are the variables that are used in the application and are not committed to the repository for security reasons.
dotenv.config();
const cors = require('cors'); // allow frontend to access backend resources, this is a security feature that allows only specific domains to access the backend resources.
const express = require('express');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world !!');
});

module.exports = app;
