function Note(data) {
  this.data = data;
  this.y = 0;
  this.height = 0;
}
var socket = io.connect('http://172.20.10.3:3000/');
let pixels = []
lastTime = (new Date()).getTime()
socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
        socket.on('messages',function(data){
            //draw()
            pixels.push(new Note(data));
        console.log(data);
    })
    });
    //0 2 3 5 8 10 11
function draw() {
  let winUnit = window.innerWidth/89
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d")
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  sprites = [];
  for(i = 19; i <88+20;i++){
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
  ctx.fillStyle = "#ff0000"
  pixels.forEach(function(note,index){
    if(note.data[2] > 0){
      currentTime = (new Date()).getTime();
      delta = (currentTime - lastTime) / 1000;
      note.y += delta
      note.height += delta
      console.log(winUnit*note.data[1]-19*winUnit)
      ctx.fillRect(winUnit*note.data[1]-19*winUnit,window.innerHeight-100 - note.y, window.innerWidth/88, note.height);
      ctx.stroke();
    }
  })
  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)