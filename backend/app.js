const dotenv = require('dotenv'); // Load environment variables from .env file, these are the variables that are used in the application and are not committed to the repository for security reasons.
dotenv.config();
const cors = require('cors'); // allow frontend to access backend resources, this is a security feature that allows only specific domains to access the backend resources.
const express = require('express');
const app = express();
const connectToDB = require('./db/db'); // Import the connectToDB function from the db.js file, this function is used to connect to the MongoDB database.
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser'); // Import the cookie-parser middleware, this middleware is used to parse the cookies that are sent from the frontend to the backend.
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); // Use the cookie-parser middleware, this middleware is used to parse the cookies that are sent from the frontend to the backend. 
connectToDB(); // Call the connectToDB function to establish a connection to the MongoDB database.

app.get('/', (req, res) => {
    res.send('Hello world !!');
});
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);

module.exports = app;
