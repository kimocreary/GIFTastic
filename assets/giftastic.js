var topics = ["A Different World", "The Office", "The Goldbergs", "Blackish", "Fresh Prince of Bel Air"];
var numberOfGifs = 10;
var cutOffRating = "PG";

function createButtons (){
    $("#buttonsContainer").text(" ")
    for (var i = 0; i < topics.length; i++){
        $("#buttonsContainer").append(`<button class='sitcomButton' data-searchtxt = '${topics[i]}'>${topics[i]}</button>`);
        
    }
}
createButtons()
$("#buttonsContainer").on("click", ".sitcomButton", function(event){
    event.preventDefault()
    var searchTerm = $(this).attr("data-searchtxt")
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+searchTerm+"&api_key=7yhcGzTOsjVkXNKP4OPM1VT7D4mwqFZp&limit=10"
    $.ajax({
        url:queryUrl,
        method:"GET"
    }).then(function(response){
        console.log(response)
        var giphy = response.data
        for (var i = 0; i < giphy.length; i++){
            $("#gifContainer").append(`
            <img src="${giphy[i].images.fixed_height.url}" data-still = "${giphy[i].images.fixed_height_still.url}" data-animate = "${giphy[i].images.fixed_height.url}" data-state = "animate"
            />
            `)
        }

    }).catch(function(error){
        console.log(error)
    })
    
        
})
function addButton(show){
    if (topics.indexOf(show) === -1) {
        topics.push(show);
        $("#buttonsContainer").empty();
        createButtons();
    }
} 
$("#gifContainer").on("click", function() {
    var topics = $(this).attr("data-state");
    if (topics === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

$(document).ready(function(){
    createButtons();
    $("#submit").on("click", function(){
        event.preventDefault();
        addButton($("#comedy-show").val().trim());
        $("#comedy-show").val(" ");
    })
})
// create an array of strings
// Save it to a variable called topics
// App takes the topics in the array and created buttons in the html
// Create a loop that appends a button for each string in the array
// When the user clicks the button, page should grab 10 static gif images and place them on the page
// When the user clicks on the still gif image, the image should animate
// If the user clicks again, it should stop
// Add a form that tkes a value from user input and adds it to your topics array
// Make a function that takes each topic in the array and remakes the buttons on the page