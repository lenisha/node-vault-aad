'use strict';
var tedious = require('tedious'); //More information can be found here: http://tediousjs.github.io/tedious/index.html
var express = require('express');
var request = require("request");
var Config = require("./config.js");

var Connection = tedious.Connection; //More information about Connection object can be found here: http://tediousjs.github.io/tedious/api-connection.html
var Request = tedious.Request; //More information about Request object can be found here: http://tediousjs.github.io/tedious/api-request.html
var TYPES = tedious.TYPES; //More information about TYPES can be found here: http://tediousjs.github.io/tedious/api-datatypes.html
var config = Config.config;

console.log("loading Node: process arch:" + process.arch);

 
//TODO: Externalize config
//var fs = require('fs');
//var config = JSON.parse(fs.readFileSync(require('os').homedir()+ '/.tedious/test-connection.json', 'utf8')).config;



var app = express();
app.get('/', function (req, res) {

 var connection = new Connection(config);

 //Set on 'çonnect' event to execute query
 connection.on('connect', function (err) {
  if (err) {
    console.log(err);
    res.send(err);
  } else {
      executeStatement(connection, req, res);
  }
 });
});

function executeStatement(connection, req, res) {
    // If no error, then good to proceed.
    console.log("Connected");
 
    var results = [];
    var request = new Request("SELECT * FROM dbo.assessment", function (err, rowCount, rows) {
      if (err) {
        //Error occured 
        console.log('Error performing select: ');
        console.log(err);
        res.send(err);
      } else 
 
      //Successful request
      rows.forEach(function(row) {
        var assessment_id = row.assessment_id.value;
        var assessment_status = row.assessment_status.value;
        results.push({assessment_id, assessment_status})
      });
 
      //Display results
      console.log('Row count = ' + rowCount);
      console.log('Results = ' +  JSON.stringify(results));
 
      res.send( JSON.stringify(results) );
    });
 
    connection.execSql(request);
  }

// Start application
var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("Server running at http://localhost:%d", port);
});


 