const constants = require("./utils/constants");
const app = require("./config/app");
const data = require("./data")(constants)

require('./routers')(app, data);

app.listen(constants.port, function() {
    console.log('Example app listening on port 3000!')
})