var searchTerm = "";
var searchCount = 0;
var startYear = 0;
var endYear = 0;

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

//
function retriveNews(queryURL,count){

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(NTrecords){

		//console.log(NTrecords,parseInt(count));

		for(var i = 0; i < parseInt(count); i++){

			var article = $("<div>");
			article.attr("id","article-id-" + i);
			$("#search-result").append(article);

			if(NTrecords.response.docs[i].headline.main){
			 	$("#article-id-" + i).append("<h4><span class='label label-primary'>" + (i+1) + ".</span> " + NTrecords.response.docs[i].headline.main +"</h4>");
			}

			if(NTrecords.response.docs[i].byline && NTrecords.response.docs[i].byline.original){
				$("#article-id-" + i).append("<h6> " + NTrecords.response.docs[i].byline.original + "</h6>");
			}

			if(NTrecords.response.docs[i].snippet){
				$("#article-id-" + i).append("<span> " + NTrecords.response.docs[i].snippet + "</span>");
			}

			if(NTrecords.response.docs[i].web_url){
				$("#article-id-" + i).append("<br><strong>Link : </strong><a href='" + NTrecords.response.docs[i].web_url + "' target='_blank'>Go to the page</a> OR ");

				//Button for popup window to the Newyork times web page
				var button = $("<button>").text("View").attr("id", "buton-" + i).addClass("view");
				button.attr("article-url",NTrecords.response.docs[i].web_url);
				$("#article-id-" + i).append(button);
			}

			$("#article-id-" + i).append("<hr>");
			
		}

	});

}

//Function for popup window
function popupWindow(){
	var url = $(this).attr("article-url");
	window.open(url, "Newyork Times", "width=800,height=600");
}

//On submitting search parameters
$("#submit").on("click", function(){

	//Change layout, empty the result section and display.
	$(".search-section ").removeClass("col-md-4 col-md-offset-4");
	$(".search-section ").addClass("col-md-3 col-md-offset-1");
	$(".result-section ").addClass("col-md-7");	
	$("#search-result").empty();	
	$(".result-section ").show();
	
	//Get the user inputs
	searchTerm = $("#search-term").val().trim();
	searchCount = $("#num-records").val().trim();
	startYear = parseInt($("#start-year").val().trim());
	endYear = parseInt($("#end-year").val().trim());

	//If empty search field alert
	if(!searchTerm)
		alert("Enter a search term");

	//Attach search term to the query
	queryURL = queryURLBase + searchTerm;

	//If the user has given start year or end year, attch them to the query
	if(startYear)
		queryURL += "&begin_date=" + startYear + "0101";

	if(endYear)
		queryURL += "&end_date=" + endYear + "0101";

	//Pass final url along with the search count to the function
	retriveNews(queryURL,searchCount);

	// console.log(searchTerm,searchCount,startYear,endYear,queryURL);

});

//When click on view button on article section goto function for popup window
$(document).on("click",".view", popupWindow);

