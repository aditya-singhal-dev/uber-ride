const dotenv = require('dotenv'); // Load environment variables from .env file, these are the variables that are used in the application and are not committed to the repository for security reasons.
dotenv.config();
const cors = require('cors'); // allow frontend to access backend resources, this is a security feature that allows only specific domains to access the backend resources.
const express = require('express');
const app = express();
const connectToDB = require('./db/db'); // Import the connectToDB function from the db.js file, this function is used to connect to the MongoDB database.
const userRoutes = require('./routes/user.routes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
connectToDB(); // Call the connectToDB function to establish a connection to the MongoDB database.

app.get('/', (req, res) => {
    res.send('Hello world !!');
});
app.use('/users',userRoutes);

module.exports = app;
