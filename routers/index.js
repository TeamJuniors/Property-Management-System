const fs = require('fs');
const path = require('path');

module.exports = function(app, data) {
    require('./api-router')(app, data);
    require('./core-app-router')(app, data);
};