var midi = require("midi");
var input = new midi.input();
var clients = [];
input.getPortCount();
input.getPortName(1);
input.on('message',function(deltaTime,message){
	console.log("m:" + message + " d:" + deltaTime);
	clients.forEach(function(client){client.emit('messages',message + ", d:" + deltaTime);
	})
});
input.openPort(1);
express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(__dirname + '/tonejs-instruments'));

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(client) {

	client.on('join',function(data) {
		console.log(data);
		clients.push(client);
		client.emit('messages','Hello from server');
	});
});
server.listen(3000);

