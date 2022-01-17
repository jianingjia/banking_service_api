'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;


// swagger setup
var SwaggerExpress = require('swagger-express-mw');
var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 4000;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/swagger']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/swagger');
  }
});


// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.listen(PORT, () =>
//   console.log(`Your server is running on port ${PORT}`)
// )

module.exports = { app }

