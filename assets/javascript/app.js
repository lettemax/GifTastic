// GIPHY API key
const APIKEY = "2SE8H77Ot8zPVnM0WRMAKWnj1SelpwxN";

// Interesting topics
var topics = ["bitcoin", "stocks", "warm socks", 
                        "dogs", "netflix", "space", "kanye west", "donald glover",
                        "big mouth", "nonprofit", "saving the world", "new movies", 
                        "charity", "nonprofits", "startups"];

// Function to loop through topics and create+append button for each
function addAllTopicsButtons () {
    // Set up loop
    for (var i=0; i<topics.length; i++) {
        // Assign button element to variable btn
        var btn = $("<button>");
        // Set btn text to topic string
        btn.text(topics[i]);
        // Set attribute, type, to "button" per bootstrap
        btn.attr("type", "button");
        // Set btn padding and margin to 5px
        btn.css("padding", "5px");
        btn.css("margin", "5px");
        // Add class "btn btn-info" per bootstrap
        btn.addClass("btn btn-info");
        // Append btn to end of btn-div
        $("#btns-div").append(btn);
        // Log the btn's innerHTML
        console.log(btn[0].innerHTML);
        console.log(i);
    }
}

// Function to create and add gifs to gifs-div
function addGifs (result) {
    // Loop through all gifs in response and create gif element for each
    for (var i=0; i<result.data.length; i++) {
        // Log the passed gifs' original still urls
        console.log("adding "+result.data[i].images.original_still.url);
        // Assign original still url to variable
        var stillSrc = result.data[i].images.original_still.url;
        // Assign animated gif url to variable
        var animatedSrc = result.data[i].images.original.url;
        // Create an img element and assign it to img variable
        var gif = $("<img>");
        // Add class to gif element
        gif.addClass("gif");
        // Set src attribute to stillSrc
        gif.attr("src", stillSrc);
        // Add and set data-still attribute 
        gif.attr("data-still", stillSrc);
        // Add and set data-animated attribute
        gif.attr("data-animated", animatedSrc);
        // Add and set data-state attribute
        gif.attr("data-state", "still");
        // Create div element and assign to div variable
        var div = $("<div>");
        // Add class to div
        div.addClass("gif-div");
        // Add gif to gif-div
        div.append(gif);
        // Add gif's rating to div
        div.prepend($("<p>"+result.data[i].rating+"</p>"));
        // Append the div to the gifs div
        $(".gifs-div").append(div);
    }
}

// When document is ready
$(document).ready( function () {
    // Add all hard-coded topics buttons
    addAllTopicsButtons();
    // When user clicks search button
    $("#add-topic").on("click", function(){
        // Clear the btns-div
        $("#btns-div").empty();
        // Log message to let us know add topic clicked
        console.log("clicked add topic");
        // Assign input string to newTopic variable
        var newTopic = $("#topic-input").val();;
        // Log the variable
        console.log(newTopic);
        // Add new topic to topics array
        topics.push(newTopic);
        // Recreate all buttons
        addAllTopicsButtons();
    });
    // When user clicks a topic button
    $(document).on("click", ".btn-info", function(){
        // Log message to know btn btn-info was clicked
        // Empty gifs-div
        $(".gifs-div").empty();
        // Empty gif-divs
        $(".gif-div").empty(); 
        console.log("emptying gifs-div");
        // Log the topic on button
        console.log($(this)[0].innerHTML);
        // Set topic to search topic variable
        var topicToSearch = $(this)[0].innerHTML;
        // Query button topic to get GIFs
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topicToSearch+"&api_key="+APIKEY+"&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(result){
            // Log the result
            console.log(result);
            // Call addGifs function
            addGifs(result);
        });
    });
    // When user clicks a gif
    $(document).on("click", ".gif", function(){
        console.log("Come on man work!")
        //Log to know gif was clicked 
        console.log($(this));
        //Assign data-state of gif to variable state
        var state = $(this).attr("data-state");
        // If data-state of gif is still, change to animated, and vice versa
        if (state=="still") {
            $(this).attr("data-state", "animated");
            $(this).attr("src", $(this)[0].dataset.animated);
            console.log($(this)[0].dataset.animated);
        } else if (state=="animated") {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this)[0].dataset.still);
            console.log($(this)[0].dataset.still);
        }
    });
});

