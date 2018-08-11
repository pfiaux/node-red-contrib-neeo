'use strict';

const got = require('got');

const URI = {
  ACTIVE_NOW: 'projects/home/activescenariokeys',
  RECIPE_LIST: 'projects/home/recipes/',
  RECIPE_EXECUTE: 'projects/home/rooms/ROOM_KEY/recipes/RECIPE_KEY/execute',
};

module.exports = {
  executeRecipe,
  getRecipeList: (brainIp) => getJSON(brainIp, URI.RECIPE_LIST),
  getActiveNow: (brainIp) => getJSON(brainIp, URI.ACTIVE_NOW),
  getJSON,
};

function executeRecipe(brainIp, roomKey, recipeKey) {
  const executeUri = URI.RECIPE_EXECUTE
    .replace('ROOM_KEY', roomKey)
    .replace('RECIPE_KEY', recipeKey);

  return getJSON(brainIp, executeUri);
}

function getJSON(brainIp, uri) {
  const apiUrl = `http://${brainIp}:3000/v1`;
  const url = `${apiUrl}/${uri}`;

  return got.get(url, { json: true })
    .then((response) => response.body);
}
