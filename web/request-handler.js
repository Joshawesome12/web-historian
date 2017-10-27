var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('http');
var qs = require('qs');
var request = require('request');
var htmlFetcher = require('../workers/htmlfetcher');
var url = require('url');
var helpers = require('./http-helpers');
// require more modules/folders here!


//Solution code
exports.handleRequest = function (req, res) {
  var handler = actions[req.method];
 if (handler) {
   handler(req, res);
 } else {
   helpers.send404(response);
 }
};


var actions = {
  'GET': function(request, response){
    // response.end(archive.paths.list);
    var urlPath = url.parse(request.url).pathname;

   // / means index.html
   if (urlPath === '/') { urlPath = '/index.html'; }

   helpers.serveAssets(response, urlPath, function() {
     // trim leading slash if present
     if (urlPath[0] === '/') { urlPath = urlPath.slice(1); }

     archive.isUrlInList(urlPath, function(found) {
       if (found) {
         helpers.sendRedirect(response, '/loading.html');
       } else {
         helpers.send404(response);
       }
     });
   });

  },
  'POST': function (request, response) {

    helpers.collectData(request, function(data) {
      var url = data.split('=')[1].replace('http://', '');
      // check sites.txt for web site
      archive.isUrlInList(url, function(found) {
        if (found) { // found site
          // check if site is on disk
          archive.isUrlArchived(url, function(exists) {
            if (exists) {
              // redirect to site page (/www.google.com)
              helpers.sendRedirect(response, '/' + url);
            } else {
              // Redirect to loading.html
              helpers.sendRedirect(response, '/loading.html');
            }
          });
        } else { // not found
          // add to sites.txt
          archive.addUrlToList(url, function() {
            // Redirect to loading.html
            helpers.sendRedirect(response, '/loading.html');
          });
        }
      });
    });

  }//end POST
};//end actions






//Sprint code with Ceci
// exports.handleRequest = function (req, res) {
//   var statusCode;
//   // Request method actions
//   if (req.method === 'GET') {
//
//   } else if (req.method === 'POST') {
//     statusCode = 201;
//     body = '';
//     res.writeHead(201, {'Content-Type': 'text/plain'});
//     req.on('data', function(urlSnippet) {
//       var url = String(urlSnippet).substring(4);
//       archive.addUrlToList(url);
//     });
//   } else {
//     statusCode = 404;
//     res.writeHead(statusCode);
//     res.end('Bad request!');
//   } // OPTIONS
//   fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(data);
//   });
// };
