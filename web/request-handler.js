var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('http');
var qs = require('qs');
var request = require('request');
var htmlFetcher = require('../workers/htmlfetcher');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var googleOptions = {
    host: 'www.google.com',
    port: 80,
    path: '/index.html'
  }

  // Request method actions
  if (req.method === 'GET') {

    fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });

    // console.log(archive.downloadUrls())
    // htmlFetcher.fetch('http://ceciliagoss.com/', res);

    // Good way to get HTML:
    // request('http://www.ceciliagoss.com/', function(error, response, body) {
    //   res.writeHead(200, {'Content-Type': 'text/html'});
    //   res.end(response.body);
    // });

  } else if (req.method === 'POST') {
    var statusCode = 201;
    body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    res.writeHead(201, {'Content-Type': 'text/plain'});
    //res.end('Method: Posting');
  } else {
    var statusCode = 404;
    res.writeHead(statusCode);
    res.end('Bad request!');
  } // OPTIONS
};
