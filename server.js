/**
 * Importing express module
 */
const express = require('express');

/**
 * importing .env,mongoose.js files
 */
require('dotenv').config();
const connectingToDatabase = require('./config/mongoose.js');

/**
 * Creating express app
 * -> creating an object for the express module/library
 */
const app = express();

/**
 * parse request of content-type - application/x-www-form-urlencoded
 */
app.use(express.urlencoded({ extended: true }));

/**
 * parse request of content-type - application/json
 */
app.use(express.json());

/**
 * Connection to the database
 * ->returns connection
 */
connectingToDatabase.connectToDatabase();

/**
 * defining a simple route to
 * display a welcome message when at the home page.
 */
app.get('/', (req, res) => {
  res.send('Welcome to employee payroll app 🙋‍♂️');
});

/**
 * routes required for the CRUD operations
 */
require('./app/routes/payroll-routes.js')(app);

/**
 * running a server at port 9000
 */
app.listen(process.env.PORT, () => {
  console.log('Server running at port number 9000');
});
