const express = require("express");
const app = express();
const winston = require("winston");

const configureLogging = require("./startup/logging");
const connectToDatabase = require("./startup/db");
const setupRoutes = require("./startup/routes");
require("./startup/config")();

const port = 3000;

configureLogging();
connectToDatabase();
setupRoutes(app);

app.listen(port, () => {
    winston.info(`Server is running on port ${port}`);
});
