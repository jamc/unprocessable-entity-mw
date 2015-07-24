var _ = require('lodash');

module.exports = function unprocessableEntityMW(error, req, res, next) {
  if (error.failedValidation) {
    var unprocessableEntityResponse = [];

    if (!!error.results && !!error.results.errors) {
      _.forEach(error.results.errors, function(resultError) {
        resultError.path.pop();
        unprocessableEntityResponse.push({
          status  : resultError.code,
          path    : resultError.path.join('.'),
          message : resultError.message
        });
      });
    } else {
      unprocessableEntityResponse.push({
        status  : error.code,
        path    : error.paramName,
        message : error.message
      });
    }

    res.status(422);
    return res.json(unprocessableEntityResponse);
  }

  next(error);
};