var midi = require("midi");
var fs = require("fs");
var clients = [];
var enabled = false;
var input = new midi.input();
var data = JSON.parse(fs.readFileSync("midi.json"));
function poll(){
	fs.writeFileSync("midi.json",JSON.stringify(data))
	
	data = JSON.parse(fs.readFileSync("midi.json"))
	if(input.getPortCount() < 2){
		//Set to false so that when the port count reaches 2, the else condition will not open the port multiple times
		if(enabled){
			try{input.closePort(1);}
			catch{}
		}
		enabled = false
		
		//In this position only the midi cable is connected
		console.log("awaiting");
	} else{
		//In this position both the piano and midi cable are connected... The logic here needs to figure out what ports are still open
		if(!enabled){
input = new midi.input()
input.on('message',function(deltaTime,message){
	console.log(message);	
	message.push(Date.now());
	data.push(message)
});

			enabled = true;
			input.openPort(1);
		}
	}
	console.log(input.getPortCount())
	setTimeout(poll,500)
}
poll()




express = require('express');


var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//app.use(express.static(__dirname + '/tonejs-instruments'));

//app.get('/', function(req, res,next) {
//    res.sendFile(__dirname + '/index.html');
//});
io.on('connection', function(client) {

	client.on('join',function(data) {
		console.log(data);
		clients.push(client);
		client.emit('messages','Hello from server');
	});
});
server.listen(3000);

