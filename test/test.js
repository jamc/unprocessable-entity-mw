var should      = require('chai').should();
var sinon       = require('sinon');
var sandbox     = sinon.sandbox.create();

var unprocessableEntityMW  = require('../index');

describe('Unprocessable Entity Middleware', function() {

  afterEach(function() {
    sandbox.restore();
  });

  describe('returns a 422 message when', function() {

    it('the failedValidation variable is on true', function () {
      var error               = new Error('Validation error');
      error.code              = 'SCHEMA_VALIDATION_FAILED';
      error.failedValidation  = true;
      error.paramName         = 'paramName';

      var expectedResponse = [
        {
          status  : error.code,
          path    : error.paramName,
          message : error.message
        }
      ];
      var res = {
        status: sandbox.stub(),
        json  : sandbox.stub()
      };
      unprocessableEntityMW(error, null, res);
      res.status.calledWith(422).should.be.true;
      res.json.calledWith(expectedResponse).should.be.true;
    });

    // @TODO More tests

  });
});