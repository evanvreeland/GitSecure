var mkdirp = require('mkdirp');
var clone = require("nodegit").Clone.clone;
var mainApp = require('../../../app.js');
var async = require('async');

exports.readListOfFiles = function(urlList, callback) {
  var directoryList = [];

  async.eachSeries(urlList, function(urlObj, itemCallback) {
    console.log(urlObj);
    mkdirp("services/parsing/git_data/" + urlObj.id.toString(), function(err){
    });
    clone(urlObj.git_url, "services/parsing/git_data/" + urlObj.id.toString()).then(function(repo){
      directoryList.push(urlObj.id.toString());
      itemCallback();
    });
  }, function() {
    console.log('in the final callback for each');
    callback(directoryList);
  });

};
  
