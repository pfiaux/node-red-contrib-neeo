'use strict';

const got = require('got');

module.exports = {
  getJSON,
};

function getJSON(brainIp, uri) {
  const apiUrl = `http://${brainIp}:3000/v1`;
  const url = `${apiUrl}/${uri}`;

  return got(url, { json: true })
    .then((response) => response.body);
}
