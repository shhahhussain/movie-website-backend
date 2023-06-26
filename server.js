const express = require("express");
const app = express();

const winston = require('winston');

require('./startup/routes')(app);
require('./startup/db');
require('./startup/logging')();
require('./startup/config')();

const port = 3000;

app.listen(port, () => {
  winston.info(`Server is running on port ${port}`);
});
