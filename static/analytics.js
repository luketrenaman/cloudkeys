// PROCESS:
// access and populate dropdown
// dropdown will be populated by a list of analyze files
// button clears the canvas and draws the stats
// one of the sessions will be realtime which ignores the existence of other sessions
// stats from the last server restart
var live = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var baseTrans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d")
var loop = true;
// do socket shit
//get color
function drawKeys(arrName) {
	console.log("drawn again")
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	for (i = 19; i < 88 + 20; i++) {
		var winUnit = window.innerWidth / 89
		// white key
		if (i % 12 === 0 || i % 12 === 2 || i % 12 === 3 || i % 12 === 5 || i % 12 === 7 || i % 12 === 9 || i % 12 === 10) {
			ctx.strokeStyle = "#FFFFFF"
			ctx.strokeRect(winUnit * i - 19 * winUnit, window.innerHeight - 100, window.innerWidth / 88, 100);
			ctx.fillStyle = "rgb(" + arrName[i - 19] + ",0,0)"
			ctx.fillRect(winUnit * i - 19 * winUnit, window.innerHeight - 100, window.innerWidth / 88, 100);
		} else {
			ctx.strokeStyle = "#FFFFFFF"
			ctx.strokeRect(winUnit * i - 19 * winUnit, window.innerHeight - 100, window.innerWidth / 88, 50);
			ctx.fillStyle = "rgb(" + arrName[i - 19] + ",0,0)"
			ctx.fillRect(winUnit * i - 19 * winUnit, window.innerHeight - 100, window.innerWidth / 88, 50);
			ctx.stroke();
			ctx.strokeStyle = "#0000000"
			ctx.strokeRect(winUnit * i - 19 * winUnit, window.innerHeight - 50, window.innerWidth / 88, 50);
			ctx.fillStyle = "#000000"
			ctx.fillRect(winUnit * i - 19 * winUnit, window.innerHeight - 50, window.innerWidth / 88, 50);
		}
		//x,y,width,heigh
		ctx.stroke();
	}
	//...drawing code...
}

function drawBars(arrName, biggest) {
	for (i = 0; i < 88; i++) {
		ctx.fillStyle = "rgb(255,120,0)";
		let barHeight = arrName[i] / biggest * (window.innerHeight - 100)
		console.log(barHeight);
		ctx.fillRect((window.innerWidth / 89) * i, window.innerHeight - 100, window.innerWidth / 88, -barHeight/2)
	}
}
var socket = io.connect('http://172.20.10.3:3000/');
socket.on('connect', function(data) {
	socket.emit('join', 'Hello World from client');
	socket.on('messages', function(data) {
		if (loop) {
			// update live
			if (data[2] > 0) {
				var keyVal = data[1] - 21;
				live[keyVal]++;
			}
			// find largest
			var largest = live.reduce(function(a, b) {
				return a + b;
			})
			// do transparency calculations
			var liveBright = baseTrans;
			for (i = 0; i < 88; i++) {
				liveBright[i] = Math.ceil((live[i] / largest) * largest * 5);
			}
			drawKeys(liveBright);
			drawBars(liveBright, largest)
			// draw rectangle
		}
		//		drawBars();
	})
});

function displaySess(x) {
	if (x === "live") {
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		loop = true;
	} else {
		loop = false;
		var tempKeys;
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		$.getJSON("http://172.20.10.3:3000/sessions/analyze-" + x + ".json", function(data) {
			tempKeys = data
			// make it brightness scaled
			var realBright = baseTrans;
			var totalKeys = tempKeys.reduce(function(a, b) {
				return a + b;
			});
			for (i = 0; i < 88; i++) {
				realBright[i] = Math.ceil((tempKeys[i] / totalKeys) * totalKeys * 5);
			}
			drawKeys(realBright)
			drawBars(realBright, totalKeys)
		});
	}
}
//requestAnimationFrame(draw)
