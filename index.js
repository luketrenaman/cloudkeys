var midi = require("midi");
var fs = require("fs");
var clients = [];
var enabled = false;
var input = new midi.input();
var num;
num = fs.readdirSync("static/sessions/",[]).length / 2; 
console.log(num);

var data = [];
var anal = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
function poll() {
    fs.writeFileSync("static/sessions/midi-"+num+".json", JSON.stringify(data))
    fs.writeFileSync("static/sessions/anal-"+num+".json",JSON.stringify(anal))
    ts = JSON.parse(fs.readFileSync("static/sessions/midi-"+num+".json"))
    anal = JSON.parse(fs.readFileSync("static/sessions/anal-"+num+".json"));
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
let ejs = require('ejs');
	number = num;
var path = require("path");
var app = express();
app.use(express.static('static'))
app.use(express.static('landing_page'))


var server = require('http').createServer(app);
var io = require('socket.io')(server);
//app.use(express.static(__dirname + '/tonejs-instruments'));
var clients = []
app.set('view engine', 'ejs')
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/landing_page/index.html');
});
app.get('/data.json', function(req, res, next) {
    res.sendFile(__dirname + '/static/anal.json');
});
app.get('/analytics', function(req, res) {
    res.render("analytics"), {
	number: num,
}
});

//ejs.renderFile("static/analytics.html", {number: number},
//	{delimiter: '%'}
//);

app.get('/realtime', function(req, res) {
    res.render("realtime"),{
	number:num
};
});
io.on('connection', function(client) {
    client.on('join', function(data) {

        console.log(data);
        clients.push(client);
        client.emit('messages', 'Hello from server');

    });
});
server.listen(3000);

