var myInfos = {};
var urlParams;

function initPage(){
	// look to see if there's a query string
	// init page with those values, if they
	// exist
	decodeQueryString();
	populateForm(urlParams);
	$( ".marker.slider" ).draggable({
	  axis: "x",
	  containment: [380, 0, 624, 0]
	}).mouseup(function(){
		// add slider positions to the data object
		myInfos[$(this).attr("id")] = $(this).css("left");
	});

	// event listeners
	$( ".marker.toggle" ).click(function(){
		if ($(this).css("opacity") == 1){
			$(this).css("opacity", 0);
			myInfos[$(this).attr("id")] = "false";
		} else {
			$(this).css("opacity",1);
			myInfos[$(this).attr("id")] = "true";
		}
	});
	$( ".okButton" ).click(function(){
		showOverlay($(this).parents(".overlayMe").attr("id"), $(this).prev("input").val());
	});
	$("#unicorn").on("click", ".editButton", function(){
		$(this).parents(".overlayMe").find("input").focus();
		$(this).parent(".overlay").remove();
	});
	$(".editButton.showForm").on("click", function(){
		$(this).next(".otherForm").show().find("input").focus();
		$(this).css("opacity", 0);
		$(".customOther .overlay .editButton").css("left", 0);
	});
	$("#shareButton").on("click", createShareURL);
	$("#popupBG").on("click", function(){
		$("#popup").hide();
	});
}

function showOverlay(id, text){
	// find the text input that's a sibling
	// if it has text, show an overlay a div that has that text
	// and a button to edit/hide overlay
	//console.log(id+", "+text);
	var label = $("#"+id).find("input").attr("id");
	if (typeof label === "undefined") {
		label = "";
	} else {
		label += ": ";
	}
	if (text.length > 1){
		$("#"+id).append("<div class='overlay'>" + label + text + "<span class='editButton'>edit</span></div>");
	} else {
		$("#"+id).find(".otherForm").hide();
		$("#"+id).find(".showForm").css("opacity", 1);
	}
	myInfos[id] = text;
}

function decodeQueryString() {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
}

function populateForm(obj){
	//console.log(obj);
	// show overlays where needed, set the text, and set slider values
	for (prop in obj){
		//console.log(prop);
		if (prop === "expr-1" || prop === "expr-2" || prop === "expr-3" ||
			prop === "id-1" || prop === "id-2" || prop === "id-3" ||
			prop === "romor-1" || prop === "romor-2" || prop === "romor-3" ||
			prop === "sexor-1" || prop === "sexor-2" || prop === "sexor-3"
			)
		{

			$("#"+prop).css("left", obj[prop]);
			myInfos[prop] = obj[prop];
		}
		else if (prop === "name" || prop === "pron" || prop === "genderID" || 
			prop === "genderExp" || prop === "genderAssign" || prop === "romOrient" || prop === "sexOrient") 
		{
			showOverlay(prop, obj[prop]);
		}
		else if (prop.indexOf("assign-") > -1)
		{
			if (obj[prop] === "true"){
				$("#"+prop).css("opacity", 1);
			}
		}
		else if (prop.indexOf("other") === 0){
			showOverlay(prop, obj[prop]);
		}
	}
}

function createShareURL(){
	// get all data from the page and write it
	// to a query string
	var querystring = "?";
	for (prop in myInfos){
		if (prop != undefined && myInfos[prop] != undefined){
			querystring += prop + "=" + encodeURIComponent(myInfos[prop]) + "&";
		}
	}
	// add full URL and pop up an overlay with a selectable copyable link
	var url = [location.protocol, '//', location.host, location.pathname].join('');
	$("#popup").show().find("textarea").val(url+querystring);
}

$(document).ready(initPage);