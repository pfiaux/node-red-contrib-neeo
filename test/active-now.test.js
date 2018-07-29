'use strict';

const helper = require('node-red-node-test-helper');
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;

const brain = require('../lib/brain.js');
const NEEOBrainNode = require('../neeo-brain.js');
const ActiveNowNode = require('../active-now.js');

const NODE_TYPE = 'active-now';

const testNodes = [
  NEEOBrainNode,
  ActiveNowNode,
];
 
helper.init(require.resolve('node-red'));
 
describe('active-now Node', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    sandbox.stub(brain, 'getJSON')
      .resolves([]);
  });
 
  afterEach(function() {
    helper.unload();
    sandbox.restore();
  });
 
  it('should be loaded', function(done) {
    const flow = [
      { id: 'n1', type: NODE_TYPE, name: 'active-now', brain: 'n0' }
    ];
    helper.load(ActiveNowNode, flow, () => {
      const activeNowNode = helper.getNode('n1');
      activeNowNode.should.have.property('name', 'active-now');
      done();
    });
  });
 
  it('should make activeNow request', function(done) {
    const flow = [
      { id: 'n0', type: 'neeo-brain', name: 'Brain', ip: 'localhost' },
      { id: 'n1', type: NODE_TYPE, name: 'active-now', brain: 'n0', wires:[['n2']] },
      { id: 'n2', type: 'helper' }
    ];
    const activeNow = [1];
    brain.getJSON.resolves(activeNow);
    
    helper.load(testNodes, flow, () => {
      const activeNowNode = helper.getNode('n1');
      const nextNode = helper.getNode('n2');
      nextNode.on('input', (msg) => {
        msg.should.have.property('payload', activeNow);
        expect(brain.getJSON).to.have.been.calledWith('localhost');
        done();
      });
      activeNowNode.receive({ payload: '' });
    });
  });

  it('should handle errors', function(done) {
    const flow = [
      { id: 'n0', type: 'neeo-brain', name: 'Brain', ip: 'localhost' },
      { id: 'n1', type: NODE_TYPE, name: 'active-now', brain: 'n0', wires:[['n2']] },
      { id: 'n2', type: 'helper' }
    ];
    brain.getJSON.rejects(new Error('unit test'));
    
    helper.load(testNodes, flow, () => {
      const activeNowNode = helper.getNode('n1');
      const nextNode = helper.getNode('n2');
      nextNode.on('input', (msg) => {
        msg.should.have.property('payload', []);
        done();
      });
      activeNowNode.receive({ payload: '' });
    });
  });

  it('should no brain set', function(done) {
    const flow = [
      { id: 'n1', type: NODE_TYPE, name: 'active-now', wires:[['n2']] },
      { id: 'n2', type: 'helper' }
    ];
    
    helper.load(testNodes, flow, () => {
      const activeNowNode = helper.getNode('n1');
      const nextNode = helper.getNode('n2');
      nextNode.on('input', (msg) => {
        msg.should.have.property('payload', []);
        done();
      });
      activeNowNode.receive({ payload: '' });
    });
  });
});