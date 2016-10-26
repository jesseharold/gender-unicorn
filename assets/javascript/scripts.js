var myInfos = {};

function createShareURL(){
	// get all data from the page and write it
	// to a query string
	var querystring = window.location.href+"?";
	for (prop in myInfos){
		if (prop != undefined && myInfos[prop] != undefined){
			querystring += prop + "=" + encodeURIComponent(myInfos[prop]) + "&";
		}
	}
	// add full URL and pop up an overlay with a selectable copyable link
	$("#popup").show().find("textarea").val(querystring);
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
	}).mouseup(function(){
		// add slider positions to the data object
		myInfos[$(this).attr("id")] = $(this).css("left");
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
	$("#shareButton").on("click", createShareURL);
	$("#popupBG").on("click", function(){
		$("#popup").hide();
	});
}
function populateForm(obj){
	console.log(obj);
	// show overlays where needed, set the text, and set slider values
}
$(document).ready(initPage);