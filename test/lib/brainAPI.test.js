'use strict';

const sinon = require('sinon');
const nock = require('nock');
const expect = require('chai').expect;

const brainAPI = require('../../lib/brainAPI.js');

const BRAIN_IP = '0.0.0.0';
const API_URL = `http://${BRAIN_IP}:3000/v1`;
 
describe('lib/brainAPI.js', function() {
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

  describe('executeRecipe', function() {
    it('should request and parse json', function() {
      const uri = 'projects/home/rooms/roomKey/recipes/recipeKey/execute';
  
      nockScope
        .get(`/${uri}`)
        .reply(200);
  
      return brainAPI.executeRecipe(BRAIN_IP, 'roomKey', 'recipeKey');;
    });
  });

  describe('getRecipeList', function() {
    it('should request and parse json', function() {
      const uri = 'projects/home/recipes/';
      const data = {
        testData: 'for unit test',
      };
  
      nockScope
        .get(`/${uri}`)
        .reply(200, data);
  
      return brainAPI.getRecipeList(BRAIN_IP)
        .then((jsonData) => {
          expect(jsonData).to.deep.equal(data);
        });
    });
  });

  describe('getActiveNow', function() {
    it('should request and parse json', function() {
      const uri = 'projects/home/activescenariokeys';
      const data = {
        testData: 'for unit test',
      };
  
      nockScope
        .get(`/${uri}`)
        .reply(200, data);
  
      return brainAPI.getActiveNow(BRAIN_IP)
        .then((jsonData) => {
          expect(jsonData).to.deep.equal(data);
        });
    });
  });

  describe('getJSON', function() {
    it('should request and parse json', function() {
      const uri = 'unit/test/uri';
      const data = {
        testData: 'for unit test',
      };
  
      nockScope
        .get(`/${uri}`)
        .reply(200, data);
  
      return brainAPI.getJSON(BRAIN_IP, uri)
        .then((jsonData) => {
          expect(jsonData).to.deep.equal(data);
        });
    });
  });
});