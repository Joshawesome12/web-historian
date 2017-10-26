// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var request = require('request');
var fs = require('fs');

// exports.fetch = function(url, res) {
//   // Fetches HTML from url
//   request(url, function(error, response, body) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(response.body);
//   });
// }


// exports.fetch = function(url) {
//   console.log('-------------------------------');
//   return request(url, function(error, response, body) {
//     exports.write(url, response.body);
//   });
// }
//
// exports.write = function(url, html) {
//   var path = archive.paths.archivedSites + '/' + url;
//   // Use regex here to get everything after www. or http://, then
//   // append .html to the file
//   fs.writeFile(path, html, function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Writing success!");
//     }
//   })
// }
