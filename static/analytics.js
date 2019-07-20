// PROCESS:
// access contents of /data
	// place contents of /data into an array
	// find largest number in the array with the apply() method
// var heat = Math.ceil()
// for loop that draws each rectangle, but the fillStyle is rgb(255,0,0,Math.ceil(i/x)*255)

// stats from the last server restart
var basis = undefined;
var live;
var transparency = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
$.getJSON("http://172.20.10.3:3000/data.json", function(data) {
	basis = data;
	live = data;
})
// do socket shit

//get color

var socket = io.connect('http://172.20.10.3:3000/');
socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
        socket.on('messages',function(data){
	    // update live
		if (data[2] > 0) {
		   var keyVal = data[1] - 21;
		   live[keyVal]++;
		}
	    // find largest
		window.largest = live.reduce(function(a,b){
			return a + b;
})
	    // fill style for each notes
		for (i=0;i<88;i++){
		    transparency[i] = Math.ceil((live[i]/largest)*510);
		}
		
	    // draw rectangle
		function drawKeys() {
			console.log("drawn again")
		    var canvas = document.getElementById("canvas");
		    var ctx = canvas.getContext("2d")
		  ctx.canvas.width  = window.innerWidth;
		  ctx.canvas.height = window.innerHeight;
		  for(i = 19; i <88+20;i++){
		    let winUnit = window.innerWidth/89
		      if(i % 12 === 0 || i % 12 === 2 || i % 12 === 3 || i % 12 === 5 || i % 12 === 7 || i % 12 === 9 || i % 12 === 10){
		        ctx.fillStyle = "rgb(" + transparency[i-19] + ",0,0)"
		        ctx.fillRect(winUnit*i-19*winUnit,window.innerHeight-100, window.innerWidth/8, 100);
		      } else{
		        ctx.fillStyle = "rgb(" + transparency[i-19] + ",0,0)"
		        ctx.fillRect(winUnit*i-19*winUnit,window.innerHeight-100, window.innerWidth/88, 50);
		        ctx.stroke();
		        ctx.fillStyle = "rgb(" + transparency[i-19] + ",0,0)"
		        ctx.fillRect(winUnit*i-19*winUnit,window.innerHeight-50, window.innerWidth/88, 50);
		      }
		      //x,y,width,heigh
		      ctx.stroke();
		  }
		  //...drawing code...
		}
		function drawBars(){

}
		drawKeys();
    })
});
//requestAnimationFrame(draw)
