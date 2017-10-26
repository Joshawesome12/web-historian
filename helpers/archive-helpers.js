var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var qs = require('qs');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list,  function(err, data) {
    var dataString = String(data);
    dataString = dataString.split('\n');
    callback(dataString);
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    var dataString = String(data).split('\n');
    if (dataString.indexOf(url) === -1) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(exports.paths.list, url);
  callback();
};

exports.isUrlArchived = function(url, callback) {
  var arr = fs.readdirSync(exports.paths.archivedSites);
  if (arr.indexOf(url) === -1) {
    callback(false);
  } else {
    callback(true);
  }
};

exports.downloadUrls = function(urls) {
  for (var n = 0; n < urls.length; n++) {
    request('http://' + urls[n]).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + urls[n]));
  }
};
