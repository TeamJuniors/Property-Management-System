const constants = require("./utils/constants");
const app = require("./config/app");
const data = require("./data")(constants);
const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('./routers')(app, data);

require('./config/socket')(io, data);

server.listen(constants.port, function() {
    console.log('Example app listening on port 3000!');
});