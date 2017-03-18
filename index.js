'use strict';

const https = require('https');
const jsYaml = require('js-yaml');
const fs = require('fs');

return https.get({
  host: 'raw.githubusercontent.com',
  path: '/FortAwesome/Font-Awesome/master/src/icons.yml'
}, function (response) {
  var body = '';
  var icons = {};

  response.on('data', function (data) {
    body += data;
  });

  response.on('end', function () {
    body = jsYaml.safeLoad(body);
    body.icons.forEach(function(icon) {
      icons['fa fa-' + icon.id] = icon.name;
    });
    writeFile(JSON.stringify(icons));
  });
},
function (err) {
  throw(err);
});	

function writeFile (data) {
  fs.writeFile('./icons.json', data, function(err){
    if (err) throw(err);
  });
}