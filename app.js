'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;
require('dotenv').config();
const {logger} = require('./api/helpers/logger');

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// swagger setup
var SwaggerExpress = require('swagger-express-mw');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
var config = {
  appRoot: __dirname // required config
};

var swaggerDocument = yaml.load('./api/swagger/swagger.yaml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api', function (req, res) {
  res.redirect('/swagger');
  // res.redirect(req.baseurl + '/swagger');
});

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  app.listen(PORT);
  logger.info(`Banking Service API started on ${PORT}`);
});


module.exports = { app }

