$(document).ready(function(){
        $('ul.tabs').tabs('select_tab', 'tab_id');

        makePoliticalButtons();
        makeInterestButtons();
    });

    $(document).ready(function(){
        $('.collapsible').collapsible();
    });

    var pTerms = ["constitution", "socialism", "environment", "military"];

    function makePoliticalButtons() {
        $(".pButtonsDiv").empty();

        for (var i = 0; i < pTerms.length; i++) {
            var b = $("<a>");
            b.addClass("waves-effect waves-light red btn termBtns");
            b.attr("data-term", pTerms[i]);
            b.text(pTerms[i]);
            $(".pButtonsDiv").append(b);
            console.log(b);
        }
    }

    $(".addP").on("click", function(event) {
        event.preventDefault();

        var pTerm = $("#politicalTopicInput").val().trim();
        pTerms.push(pTerm);
        makePoliticalButtons();
        $("#politicalTopicInput").val("");
    });

    var iTerms = ["evolution", "JavaScript", "poetry", "film"];

    function makeInterestButtons() {
        $(".iButtonsDiv").empty();

        for (var i = 0; i < iTerms.length; i++) {
            var b = $("<a>");
            b.addClass("waves-effect waves-light red btn termBtns");
            b.attr("data-term", iTerms[i]);
            b.text(iTerms[i]);
            $(".iButtonsDiv").append(b);
        }
    }

    $(".addI").on("click", function(event) {
        event.preventDefault();

        var iTerm = $("#interestTopicInput").val().trim();
        iTerms.push(iTerm);
        makeInterestButtons();
        $("#interestTopicInput").val("");
    });
    
    $(document).on("click", ".termBtns", function(event) {
        event.preventDefault();
        $("#podcastDiv").html("");
        $("#youTubeDiv").html("");
        
        var q = $(this).attr("data-term");
        var searchTerm = q.replace(/ /g, "+");
        console.log(searchTerm);
        var apiKey = 'AIzaSyC9u9p589T-kb7CDunFP9ykos-fl0vtjtI';
        var queryURL = 'https://www.googleapis.com/youtube/v3/search?q=' + searchTerm + '&key=' + apiKey + '&fields=items&part=snippet';
        console.log(queryURL);

     $.ajax({
         type: "GET",
         url: queryURL,
         dataType: 'jsonp'
     })
    .done(function(data) {
        console.log(data); 

        for (var i = 0; i < 5; i++) {
            var youTubeResults = $("<div>");
            youTubeResults.addClass("resultsDiv");
            var title = $("<h2>");
            title.addClass("title");
            title.append(data.items[i].snippet.title);
            var description = $("<h5>");
            description.addClass("description");
            description.append(data.items[i].snippet.description);
            var video = $("<iframe>");
            video.attr("src", "https://www.youtube.com/embed/" + data.items[i].id.videoId);
            video.attr("frameborder", "0");
            video.attr("width", "100%");
            video.attr("height", "400")
            var url = $("<a>");
            url.addClass("url");
            url.append("https://www.youtube.com/watch?v=" + data.items[i].id.videoId);
            url.attr("href", "https://www.youtube.com/watch?v=" + data.items[i].id.videoId);
            url.attr("target", "_blank");
            var saveBtn = $("<button>");
            saveBtn.addClass("waves-effect waves-light red btn saveBtn");
            saveBtn.html("Save for Later");
            youTubeResults.append(title);
            youTubeResults.append(description);
            youTubeResults.append(saveBtn);
            youTubeResults.append(video);
            youTubeResults.append(url);
            $("#youTubeDiv").append(youTubeResults);
            // $("#youTubeDiv").append(description + "<br>");
            // $("#youTubeDiv").append(url + "<br>" + "<br>");
        }
    });    
});