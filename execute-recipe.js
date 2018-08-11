'use strict';

const brainRoutes = require('./lib/routes');
const brainAPI = require('./lib/brainAPI');

module.exports = function(RED) {
  brainRoutes.initializeIfNeeded(RED);
  
  RED.nodes.registerType('execute-recipe', ExecuteRecipeNode);

  function ExecuteRecipeNode(config) {
    RED.nodes.createNode(this,config);
    const node = this;

    node.brain = RED.nodes.getNode(config.brain);

    if (!node.brain) {
      node.warn('No NEEO Brain configured!');
    }

    node.on('input', () => {
      const noBrainIp = !node.brain || !node.brain.ip;

      if (noBrainIp) {
        node.error('No NEEO Brain configured!');
        return;
      }
      
      brainAPI.executeRecipe(node.brain.ip, config.roomkey, config.recipekey)
        .catch((error) => {
          node.error(`Failed to execute recipe: ${error.message}`);
        });
    });
  }
};
