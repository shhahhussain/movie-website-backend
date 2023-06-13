const express = require("express");
const mongoose = require("mongoose");

const genres = require('./routes/genre');
const customer = require('./routes/customer');
const movie =require('./routes/movies')
const rental=require('./routes/rental')

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1/vidly')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => console.error("Could not connect to MongoDB", error));

app.use(express.json());
app.use(express.urlencoded())
app.use("/api/genres", genres);
app.use("/api/customers", customer);
app.use("/api/movies", movie);
app.use("/api/rental", rental);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
