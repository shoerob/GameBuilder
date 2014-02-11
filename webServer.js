var connect = require('connect');
connect.createServer(
    connect.static('web')
).listen(8080);