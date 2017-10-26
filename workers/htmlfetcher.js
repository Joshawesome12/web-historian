// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var request = require('request');

exports.fetch = function(url, taco) {
  // Fetches HTML from url
  request(url, function(error, response, body) {
    console.log(response.body);
    taco.writeHead(200, {'Content-Type': 'text/html'});
    taco.end(response.body);
  });
}
