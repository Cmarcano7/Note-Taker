// Obtaining Express dependency
const express = require("express");

const app = express();

// Setting port to existing or local port 5000
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pulls required CRUD code to main server
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// To serve static files such as CSS files and JavaScript files.
app.use(express.static('public'))

// Validating correct server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
  