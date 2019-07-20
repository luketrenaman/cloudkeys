var midi = require("midi");
var fs = require("fs");
var clients = [];
var enabled = false;
var input = new midi.input();
var data = JSON.parse(fs.readFileSync("midi2.json"));
var anal = JSON.parse(fs.readFileSync("static/anal.json"));

function poll() {
    fs.writeFileSync("static/midi2.json", JSON.stringify(data))
    fs.writeFileSync("static/anal.json",JSON.stringify(anal))
    data = JSON.parse(fs.readFileSync("midi2.json"))
    anal = JSON.parse(fs.readFileSync("static/anal.json"));
    if (input.getPortCount() < 2) {
        //Set to false so that when the port count reaches 2, the else condition will not open the port multiple times
        if (enabled) {
            try {
                input.closePort(1);
            } catch {}
        }
        enabled = false

        //In this position only the midi cable is connected
        //console.log("awaiting");
    } else {
        //In this position both the piano and midi cable are connected... The logic here needs to figure out what ports are still open
        if (!enabled) {
            input = new midi.input()
            input.on('message', function(deltaTime, message) {
                //calculations
		if (message[2] > 0){
		var keyVal = message[1] - 21;
		anal[keyVal]++;
		}
		console.log(message);
                clients.forEach(function(client) {
                    client.emit('messages', message)
                });

                message.push(Date.now());
                data.push(message)
            });

            enabled = true;
            input.openPort(1);
        }
    }
    //console.log(input.getPortCount())
    setTimeout(poll, 500)
}
poll()




express = require('express');


var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//app.use(express.static(__dirname + '/tonejs-instruments'));
var clients = []
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/static/index.html');
});
app.get('/data.json', function(req, res, next) {
    res.sendFile(__dirname + '/static/anal.json');
});
app.get('/analytics', function(req, res, next) {
    res.sendFile(__dirname + '/static/analytics.html');
});
app.get('/realtime', function(req, res, next) {
    res.sendFile(__dirname + '/static/realtime.html');
});
io.on('connection', function(client) {
    client.on('join', function(data) {

app.use(express.static('static'))
        console.log(data);
        clients.push(client);
        client.emit('messages', 'Hello from server');

    });
});
server.listen(3000);
