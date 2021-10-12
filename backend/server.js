const http = require('http');
const app = require('./app');
const server = http.createServer();

server.listen(3000,console.log("server started"));