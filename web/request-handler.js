var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('http');
var qs = require('qs');
var request = require('request');
var htmlFetcher = require('../workers/htmlfetcher');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  // Request method actions
  if (req.method === 'GET') {

  } else if (req.method === 'POST') {
    var statusCode = 201;
    body = '';
    res.writeHead(201, {'Content-Type': 'text/plain'});
    req.on('data', function(urlSnippet) {
      var url = String(urlSnippet).substring(4);
      archive.addUrlToList(url);
    });
  } else {
    var statusCode = 404;
    res.writeHead(statusCode);
    res.end('Bad request!');
  } // OPTIONS
  fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
};
