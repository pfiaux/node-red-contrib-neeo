'use strict';

const sinon = require('sinon');
const nock = require('nock');
const expect = require('chai').expect;

const brain = require('../../lib/brain.js');

const BRAIN_IP = '0.0.0.0';
const API_URL = `http://${BRAIN_IP}:3000/v1`;
 
describe('lib/brain.js', function() {
  const sandbox = sinon.createSandbox();
  let nockScope;

  beforeEach(function() {
    nockScope = nock(API_URL);
  });
 
  afterEach(function() {
    nockScope.done();
    sandbox.restore();
    nock.cleanAll();
  });
 
  it('should request and parse json', function() {
    const uri = 'unit/test/uri';
    const data = {
      testData: 'for unit test',
    };

    nockScope
      .get(`/${uri}`)
      .reply(200, data);

    return brain.getJSON(BRAIN_IP, uri)
      .then((jsonData) => {
        expect(jsonData).to.deep.equal(data);
      });
  });
});