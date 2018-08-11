'use strict';

const helper = require('node-red-node-test-helper');
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;

const brainRoutes = require('../lib/routes/index.js');
const brainAPI = require('../lib/brainAPI.js');
const NEEOBrainNode = require('../neeo-brain.js');
const ExecuteRecipeNode = require('../execute-recipe.js');

const NODE_TYPE = 'execute-recipe';

const testNodes = [
  NEEOBrainNode,
  ExecuteRecipeNode,
];
 
helper.init(require.resolve('node-red'));
 
describe('execute-recipe Node', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    sandbox.stub(brainAPI, 'executeRecipe')
      .resolves([]);
    sandbox.stub(brainRoutes, 'initializeIfNeeded');
  });
 
  afterEach(function() {
    helper.unload();
    sandbox.restore();
  });
 
  it('should be loaded', function(done) {
    const flow = [
      { id: 'n1', type: NODE_TYPE, name: 'execute-recipe' }
    ];
    helper.load(ExecuteRecipeNode, flow, () => {
      const node = helper.getNode('n1');
      node.should.have.property('name', 'execute-recipe');
      expect(brainRoutes.initializeIfNeeded).to.have.been.called;
      done();
    });
  });
 
  it('should make executeRecipe request', function(done) {
    const flow = [
      { id: 'n0', type: 'neeo-brain', name: 'Brain', ip: 'localhost' },
      {
        id: 'n1',
        type: NODE_TYPE,
        name: 'execute-recipe',
        brain: 'n0',
        roomkey: 'roomKey',
        recipekey: 'recipeKey',
        wires:[['n2']],
      },
    ];
    
    helper.load(testNodes, flow, () => {
      const node = helper.getNode('n1');
      node.receive({ payload: '' });
      expect(brainAPI.executeRecipe).to.have.been.calledWith('localhost', 'roomKey', 'recipeKey');
      done();
    });
  });

  it('should not execute when missing Brain', function(done) {
    const flow = [
      {
        id: 'n1',
        type: NODE_TYPE,
        name: 'execute-recipe',
        roomkey: 'roomKey',
        recipekey: 'recipeKey',
        wires:[['n2']],
      },
    ];
    
    helper.load(testNodes, flow, () => {
      const node = helper.getNode('n1');
      node.receive({ payload: '' });
      expect(brainAPI.executeRecipe).to.not.have.been.called;
      done();
    });
  });

  it('should handle errors', function(done) {
    const flow = [
      { id: 'n0', type: 'neeo-brain', name: 'Brain', ip: 'localhost' },
      {
        id: 'n1',
        type: NODE_TYPE,
        name: 'execute-recipe',
        brain: 'n0',
        roomkey: 'roomKey',
        recipekey: 'recipeKey',
        wires:[['n2']],
      },
    ];
    brainAPI.executeRecipe.rejects(new Error('unit test'));
    
    helper.load(testNodes, flow, () => {
      const node = helper.getNode('n1');
      node.receive({ payload: '' });
      done();
    });
  });
});