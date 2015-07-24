# Unprocessable Entity Middleware

Express middleware that handles the unprocessable entity responses based on Swagger Express middleware input.

## Usage

```javascript
var express = require('express');
var app = express();
var unprocessableEntityMW = require('unprocessable-entity-mw');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(unprocessableEntityMW);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```