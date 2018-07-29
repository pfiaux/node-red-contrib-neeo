'use strict';

module.exports = function(RED) {
  function NEEOBrainNode(config) {
    RED.nodes.createNode(this,config);
    const node = this;

    node.ip = config.ip;
    node.name = config.name;
    node.hostname = config.hostname;
  }

  RED.nodes.registerType('neeo-brain', NEEOBrainNode);
};