$( ".marker.slider" ).draggable({
  axis: "x",
  containment: [380, 0, 624, 0]
});
$( ".marker.toggle" ).click(function(){
	if ($(this).css("opacity") == 1){
		$(this).css("opacity", 0);
	} else {
		$(this).css("opacity",1);
	}
});