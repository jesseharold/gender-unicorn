var myInfos = {};

function createShareURL(){
	// get all data from the page and write it
	// to a query string
	var querystring = "?";
	for (prop in myInfos){
		querystring += prop + "=" + encodeURIComponent(myInfos[prop]) + "&";
	}
	return querystring;
}
function initPage(){
	// look to see if there's a query string
	// init page with those values, if they
	// exist

	var url = $(location).attr('href'); //get current url
	var decodedUrl = decodeURIComponent(url).split("?").pop();
	if (typeof decodedUrl === "string" && decodedUrl.length > 1){
		var urlParams = decodedUrl.split("&");
		for (var i = 0; i < urlParams.length; i++) {
			var thisProp = urlParams[i].split("=");
			if (thisProp[0].length > 1){
				myInfos[thisProp[0]] = thisProp[1];
			}
		}
		populateForm(myInfos);
	}

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
	$( ".okButton" ).click(function(){
		// find the text input that's a sibling
		// if it has text, show an overlay a div that has that text
		// and a nice style
		// and a button to edit/hide overlay
		var label = $(this).prev("input").attr("id");
		if (typeof label === "undefined") {
			label = "";
		} else {
			label += ": ";
		}
		var words = $(this).prev("input").val();
		if (words.length > 1){
			$(this).parent().append("<div class='overlay'>" + label + words + "<span class='editButton'>edit</span></div>");
		}
		var prop = $(this).parent("div").attr("id");
		myInfos[prop] = words;
	});
	$("#unicorn").on("click", ".editButton", function(){
		//console.log($(this).parent(".overlay"));
		$(this).parent(".overlay").remove();
	});
	$(".editButton.showForm").on("click", function(){
		$(this).next(".otherForm").show();
		$(this).css("opacity", 0);
		$(".customOther .overlay .editButton").css("left", 0);
	});
}
function populateForm(obj){

}
$(document).ready(initPage);