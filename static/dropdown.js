let flag = true;
		    $("#dropdown").click(function(event){
			event.stopPropagation()
			    if(flag){
			    $("#value, #display").show()
				    $("#value").animate( 
					  {
					    width:"+=50px",
						  opacity:"1"
					    },200)
				    $("#display").animate({
				    	width:"+=300px",
					left:"+=54px",
					opacity:"1"
				    })
				} else{
				$("#value").animate({width:"-=50px",opacity:0},200,function(){$("#value").hide()})
				$("#display").animate({width:"-=300px",left:"-=54px",opacity:0},200,function(){$("#display").hide()})
				}
			    flag = !flag
		    })
$("#value").on("change keyup",function(){
	$.getJSON("http://localhost:3000/sessions/midi-" + (Number($("#value").val()) - 1).toString() + ".json", function(data) {
	if(data[0] != undefined){
	let start = new Date(data[0][3])
	let end = new Date(data[data.length-1][3])
	$("#start-end").text(start.toLocaleString(start) + " - " + end.toLocaleString(end));
	$("#total").text(data.length)
	} else {
		$("#start-end").text("N/A - N/A")
		$("#total").text("0");
	}
	})
})
