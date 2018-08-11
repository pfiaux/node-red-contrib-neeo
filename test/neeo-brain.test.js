'use strict';

const helper = require('node-red-node-test-helper');
const sinon = require('sinon');

const brainAPI = require('../lib/brainAPI.js');
const NEEOBrainNode = require('../neeo-brain.js');

const NODE_TYPE = 'neeo-brain';
 
helper.init(require.resolve('node-red'));
 
describe('neeo-brain Node', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    sandbox.stub(brainAPI, 'getJSON')
      .resolves([]);
  });
 
  afterEach(function() {
    helper.unload();
    sandbox.restore();
  });
 
  it('should be loaded', function(done) {
    const flow = [
      { id: 'n1', type: NODE_TYPE, name: 'brain', brain: 'n0' }
    ];
    helper.load(NEEOBrainNode, flow, () => {
      const brainNode = helper.getNode('n1');
      brainNode.should.have.property('name', 'brain');
      done();
    });
  });
});