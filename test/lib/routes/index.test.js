'use strict';

const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;
const routes = require('../../../lib/routes/index.js');
const brainAPI = require('../../../lib/brainAPI.js');
 
describe('lib/routes/index.js', function() {
  const sandbox = sinon.createSandbox();
  let RED;

  beforeEach(function() {
    RED = getMockRED();
    sandbox.stub(brainAPI, 'getRecipeList')
      .resolves([]);
  });
 
  afterEach(function() {
    sandbox.restore();
  });

  describe('initializeIfNeeded', function() {
    it('should register /neeo/recipes route', function() {
      routes.initializeIfNeeded(RED);

      expect(RED.httpAdmin.get).to.have.been.calledWith(
        '/neeo/recipes',
        sinon.match.func
      );
    });

    it('should not register twice', function() {
      routes.initializeIfNeeded(RED);

      expect(RED.httpAdmin.get).to.not.have.been.called;
    });
  });

  function getMockRED() {
    return {
      httpAdmin: {
        get: sandbox.stub(),
      },
    };
  }
});

