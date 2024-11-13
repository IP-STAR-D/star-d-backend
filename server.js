const express = require("express");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());


// simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Star-D backend." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});