var searchTerm = "";
var searchCount = 0;
var startYear = 0;
var endYear = 0;

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

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
			 	$("#article-id-" + i).append("<h3> " + (i+1) + ". " + NTrecords.response.docs[i].headline.main +"</h3>");
			}

			if(NTrecords.response.docs[i].byline && NTrecords.response.docs[i].byline.original){
				$("#article-id-" + i).append("<h5> " + NTrecords.response.docs[i].byline.original + "</h5>");
			}

			if(NTrecords.response.docs[i].snippet){
				$("#article-id-" + i).append("<span> " + NTrecords.response.docs[i].snippet + "</span>");
			}

			if(NTrecords.response.docs[i].web_url){
				$("#article-id-" + i).append("<br><a href='" + NTrecords.response.docs[i].web_url + "'>" + Go to URL + "</a> OR ");

				var button = $("<button>").text("View").attr("id", "buton-" + i).addClass("view");
				button.attr("article-url",NTrecords.response.docs[i].web_url);
				$("#article-id-" + i).append(button);
			}
			
		}

	});

}

function popupWindow(){
	var url = $(this).attr("article-url");
	window.open(url, "Newyork Times", "width=800,height=600");
}

//On submitting search parameters
$("#submit").on("click", function(){

	//Empty the result section
	$("#search-result").empty();

	//Get the user inputs
	searchTerm = $("#search-term").val().trim();
	searchCount = $("#num-records").val().trim();
	startYear = parseInt($("#start-year").val().trim());
	endYear = parseInt($("#end-year").val().trim());

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

$(document).on("click",".view", popupWindow);

