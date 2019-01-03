// make function to print out articles
function printArticles(articleArray) {
  // empty out article holder
  $("#article-grid").empty();

  articleArray.forEach(function(article) {
    // create bootstrap column
    var $articleCol = $("<div class='col-12 col-sm-6 col-md-4'>");

    // create article card
    var $card = $("<div class='card'>");

    // article header
    var $cardHeader = $("<h4 class='card-header bg-dark text-light'>").text(article.headline.main).appendTo($card);

    // article body
    var $cardBody = $("<div class='card-body'>");
    $cardBody
      .append(`<p class="card-title">${article.byline ? article.byline.original : ""}</p>`)
      .append(`<p>${article.snippet}</p>`)
      .append(`<a href=${article.web_url} target="_blank">Read Article</a>`)
      .appendTo($card);

    $articleCol.append($card);
    $("#article-grid").append($articleCol);
  
  })

}

// make function to handle form submit and perform ajax request to NYT
function handleFormSubmit(event) {

  event.preventDefault();

  // gather our form field values
  var searchTerm = $("#search-term").val().trim();
  var articleLimit = $("#article-limit").val();
  var startYear = $("#start-year").val();
  var endYear = $("#end-year").val();

  // check if search term exists
  if (!searchTerm) {
    alert("Fill out the form!");
    return false;
  }

  // build our query
  var queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=eae7407fee8d450589f3b327a198477a&q=${searchTerm}&limit=${articleLimit}`;


  if (startYear) {
    queryUrl += `&begin_date=${startYear}0101`;
  }

  if (endYear) {
    queryUrl += `&end_date=${endYear}1231`;
  }


  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function(nytResponse) {
    console.log(nytResponse);
    // get array of articles out of nytResponse
    var articleData = nytResponse.response.docs;
    printArticles(articleData);
  });
}



$(document).ready(function () {

    // add submit button event listener
    $("#submit-search").on("click", handleFormSubmit);

});