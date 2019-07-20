// access contents of /data
	// place contents of /data into an array
	// find largest number in the array with the apply() method
// var heat = Math.ceil()
// for loop that draws each rectangle, but the fillStyle is rgb(255,0,0,Math.ceil(i/x)*255)
var socket = io.connect('http://172.20.10.3:3000/');
socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
        socket.on('messages',function(data){
            let dex = -1;
            if(sprites.some(function(sprite,index){
                index = dex
                return sprite[0] === data[1]
            })){
                sprites.splice()
            }
            sprites.push([data[1],data[2]])
        console.log(data);
    })
    });
    //0 2 3 5 8 10 11
function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d")
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  sprites = [];
  for(i = 19; i <88+20;i++){
    let winUnit = window.innerWidth/89
      if(i % 12 === 0 || i % 12 === 2 || i % 12 === 3 || i % 12 === 5 || i % 12 === 7 || i % 12 === 9 || i % 12 === 10){
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(winUnit*i-19*winUnit,window.innerHeight-100, window.innerWidth/8, 100);
      } else{
        ctx.fillStyle = "#000000"
        ctx.fillRect(winUnit*i-19*winUnit,window.innerHeight-100, window.innerWidth/88, 50);
        ctx.stroke();
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(winUnit*i-19*winUnit,window.innerHeight-50, window.innerWidth/88, 50);
      }
      //x,y,width,heigh
      ctx.stroke();
  }
  //...drawing code...
}
draw()
//requestAnimationFrame(draw)
