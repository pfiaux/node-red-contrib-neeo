'use strict';

const brainAPI = require('../brainAPI');

let initialized = false;

module.exports = {
  initializeIfNeeded,
};

function initializeIfNeeded(RED) {
  if (initialized) {
    return;
  }

  RED.httpAdmin.get('/neeo/recipes', (req, res) => {
    const brainNodeId = req.query.brainNodeId;
    const brainNode = RED.nodes.getNode(brainNodeId);

    brainAPI.getRecipeList(brainNode.ip)
      .then((recipes) => {
        const simplifiedList = recipes.map((recipe) => {
          return {
            name: getRecipeName(recipe),
            recipeKey: recipe.key,
            roomKey: recipe.roomKey,
          };
        });

        res.json(simplifiedList);
      })
      .catch((error) => {
        res.status(500);
        res.json({msg: error.message});
      });
  });

  initialized = true;
}

function getRecipeName(recipe) {
  const roomAndRecipeName = recipe.roomName + ': ' + recipe.name;
  if (recipe.type === 'poweroff') {
    return roomAndRecipeName + ' (stop)';
  }
  else if (recipe.type === 'launch' && !recipe.isCustom) {
    return roomAndRecipeName + ' (start)';
  }
  return roomAndRecipeName;
}
