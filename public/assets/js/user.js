$(document).ready(function(){

    function completeUserProfile() {
        $('#currentUserName').text("Welcome, " + localStorage.getItem('username'));

        var userObject = {
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            politics: localStorage.getItem('politics'),
            background: localStorage.getItem('background')
        }

        $.ajax({
            type: "PUT",
            url: "/api/updateprofile",
            data: userObject
        }).done(function(data) {
            console.log(data);
        });
    }

    function completeStorage() {
        var email = localStorage.getItem('email');

        $.get("/api/completestorage/" + email, function(data) {
            console.log(data);
            $('#currentUserName').text("Welcome, " + data.name);

            //putting info into save areas
            data.saved_videos.forEach(fillSavedVideos);
            data.saved_articles.forEach(fillSavedArticles);

            localStorage.setItem('username', data.name);
            localStorage.setItem('politics', data.political_lean);
            localStorage.setItem('background', data.life_background);

            $('.delItem').on('click', function(event) {
                event.preventDefault();
                var itemType = $(this).attr('data-type');
                var itemId = $(this).attr('data-id');
                console.log("completeStorage click");

                $(this).parent().parent().html("<h6>deleted</h6>").css('color', 'red').attr('id', itemId);
                setTimeout(function() {
                    $('#' + itemId).remove();
                }, 2000);

                removeItem("/api/delete" + itemType + "/" + localStorage.getItem('email') + "/" + itemId);
            });
        });
    }

    if (localStorage.getItem('signup') === "true") {
        completeUserProfile();
    } else {
        completeStorage();
    }

    //CODE FOR DEALING WITH POLITICAL-LEAN AND LIFE-BACKGROUND GOES HERE :)

    $('ul.tabs').tabs('select_tab', 'tab_id');


    //if user is right STEM
    if (localStorage.getItem("politics") === "right-leaning" && localStorage.getItem("background") === "stem") {
        
        var lpTerms = ["social justice", "gender equality", "marriage equality", "welfare state", "socialism", "universal health care", "secularism", "environmentalism", "federalism", "pacifism"];

        function makePoliticalButtons() {
            $(".pButtonsDiv").empty();

            for (var i = 0; i < lpTerms.length; i++) {
                var b = $("<a>");
                b.addClass("waves-effect waves-light red btn-large termBtns pBtns");
                b.attr("data-term", lpTerms[i]);
                b.text(lpTerms[i]);
                $(".pButtonsDiv").append(b);
                // console.log(b);
            }

        }


        var hiTerms = ["music theory", "poetry", "knitting", "film criticism", "painting", "geography", "literary criticism", "American history", "European history", "philosophy", "Shakespeare"];

        function makeInterestButtons() {
            $(".iButtonsDiv").empty();

            for (var i = 0; i < hiTerms.length; i++) {
                var b = $("<a>");
                b.addClass("waves-effect waves-light red btn-large termBtns iBtns");
                b.attr("data-term", hiTerms[i]);
                b.text(hiTerms[i]);
                $(".iButtonsDiv").append(b);
            }

        }
        
        var newsTerms = ["the new york times", "associated press", "reuters", "entertainment weekly", "cnn", "usa today"];

        var widget1 = $("<iframe>");
        widget1.addClass("widget");
        widget1.attr("src", "http://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Culture Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=250500859,201671138,953290300,124960485,300238066,1010962669,1168154281,354668519,1257821731,304531053&wt=playlist&partnerId=&affiliate_id=&at=&ct=");
        widget1.attr("frameborder", 0);
        widget1.attr("style", "overflow-x:hidden;overflow-y:hidden;width:250px;height:300px;border:0px");

        var widget2 = $("<iframe>");
        widget2.addClass("widget");
        widget2.attr("src", "http://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Politics Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=1060761517,1057255460,135067274,158004641,1192761536,1200361736,1188724250,377785090,74840240,1235583717&wt=playlist&partnerId=&affiliate_id=&at=&ct=");
        widget2.attr("frameborder", 0);
        widget2.attr("style", "overflow-x:hidden;overflow-y:hidden;width:250px;height: 300px;border:0px");

        makePoliticalButtons();
        makeInterestButtons();
        makeNewsButtons(newsTerms);

        $("#podcastDiv").append(widget1);
        $("#podcastDiv").append("<br>");
        $("#podcastDiv").append(widget2);
        
    }


    //else if user is right humanities
    else if (localStorage.getItem("politics") === "right-leaning" && localStorage.getItem("background") === "humanities") {
        
        var lpTerms = ["social justice", "gender equality", "marriage equality", "welfare state", "socialism", "universal health care", "secularism", "environmentalism", "federalism", "pacifism"];

        function makePoliticalButtons() {
            $(".pButtonsDiv").empty();

            for (var i = 0; i < lpTerms.length; i++) {
                var b = $("<a>");
                b.addClass("waves-effect waves-light red btn-large termBtns pBtns");
                b.attr("data-term", lpTerms[i]);
                b.text(lpTerms[i]);
                $(".pButtonsDiv").append(b);
            }

        }

        var siTerms = ["biology", "computer science", "psychology", "architecture", "chemistry", "astronomy", "Albert Einstein", "algorithms", "Stephen Hawking", "Occam's razor", "game theory"];

        function makeInterestButtons() {
            $(".iButtonsDiv").empty();

            for (var i = 0; i < siTerms.length; i++) {
                var b = $("<a>");
                b.addClass("waves-effect waves-light red btn-large termBtns iBtns");
                b.attr("data-term", siTerms[i]);
                b.text(siTerms[i]);
                $(".iButtonsDiv").append(b);
            }

        }

        var newsTerms = ["the new york times", "associated press", "reuters", "national geographic", "cnn", "new scientist", "usa today"];


        var widget1 = $("<iframe>");
        widget1.addClass("widget");
        widget1.attr("src", "http://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Politics Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=1060761517,1057255460,135067274,158004641,1192761536,1200361736,1188724250,377785090,74840240,1235583717&wt=playlist&partnerId=&affiliate_id=&at=&ct=");
        widget1.attr("frameborder", 0);
        widget1.attr("style", "overflow-x:hidden;overflow-y:hidden;width:250px;height: 300px;border:0px");

        var widget2 = $("<iframe>");
        widget2.addClass("widget");
        widget2.attr("src", "http://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Feeling Techie&m=podcast&e=podcast&w=250&h=300&ids=617416468,665964031,959773870,326120877,458066753,955198749,842818711,360889910,561470997,305253468&wt=playlist&partnerId=&affiliate_id=&at=&ct=");
        widget2.attr("frameborder", 0);
        widget2.attr("style", "overflow-x:hidden;overflow-y:hidden;width:250px;height: 300px;border:0px");

        makePoliticalButtons();
        makeInterestButtons();
        makeNewsButtons(newsTerms);

        $("#podcastDiv").append(widget1);
        $("#podcastDiv").append("<br>");
        $("#podcastDiv").append(widget2);


    }


    //else if user is left STEM
    else if (localStorage.getItem("politics") === "left-leaning" && localStorage.getItem("background") === "stem") {

        var rpTerms = ["small government", "second amendment rights", "freedom of religion", "military", "originalism", "moral order", "anti-regulation", "familialism", "social hierarchy"];

        function makePoliticalButtons() {
            $(".pButtonsDiv").empty();

            for (var i = 0; i < rpTerms.length; i++) {
                var b = $("<a>");
                b.addClass("waves-effect waves-light red btn-large termBtns pBtns");
                b.attr("data-term", rpTerms[i]);
                b.text(rpTerms[i]);
                $(".pButtonsDiv").append(b);
            }

        }

        var hiTerms = ["music theory", "poetry", "knitting", "film criticism", "painting", "geography", "literary criticism", "American history", "European history", "philosophy", "Shakespeare"];

        function makeInterestButtons() {
            $(".iButtonsDiv").empty();

            for (var i = 0; i < hiTerms.length; i++) {
                var b = $("<a>");
                b.addClass("waves-effect waves-light red btn-large termBtns iBtns");
                b.attr("data-term", hiTerms[i]);
                b.text(hiTerms[i]);
                $(".iButtonsDiv").append(b);
            }

        }

        var newsTerms = ["daily mail", "fortune", "the wall street journal", "breitbart news", "entertainment weekly", "the telegraph"];
        
        var widget1 = $("<iframe>");
        widget1.addClass("widget");
        widget1.attr("src", "http://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Culture Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=250500859,201671138,953290300,124960485,300238066,1010962669,1168154281,354668519,1257821731,304531053&wt=playlist&partnerId=&affiliate_id=&at=&ct=");
        widget1.attr("frameborder", 0);
        widget1.attr("style", "overflow-x:hidden;overflow-y:hidden;width:250px;height: 300px;border:0px");

        var widget2 = $("<iframe>");
        widget2.addClass("widget");
        widget2.attr("src", "http://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Politics Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=620967489,418152882,1112194905,1126543994,1155318497,635045292,965293227,209377688,1065050908,699723863&wt=playlist&partnerId=&affiliate_id=&at=&ct=");
        widget2.attr("frameborder", 0);
        widget2.attr("style", "overflow-x:hidden;overflow-y:hidden;width:250px;height: 300px;border:0px");

        makePoliticalButtons();
        makeInterestButtons();
        makeNewsButtons(newsTerms);

        $("#podcastDiv").append(widget1);
        $("#podcastDiv").append("<br>");
        $("#podcastDiv").append(widget2);

    }


    //else if user is left humanities
    else if (localStorage.getItem("politics") === "left-leaning" && localStorage.getItem("background") === "humanities") {

        var rpTerms = ["small government", "second amendment rights", "freedom of religion", "military", "originalism", "moral order", "anti-regulation", "familialism", "social hierarchy"];

        function makePoliticalButtons() {
            $(".pButtonsDiv").empty();

            for (var i = 0; i < rpTerms.length; i++) {
                var b = $("<a>");
                b.addClass("waves-effect waves-light red btn-large termBtns pBtns");
                b.attr("data-term", rpTerms[i]);
                b.text(rpTerms[i]);
                $(".pButtonsDiv").append(b);
            }

    }

        var siTerms = ["biology", "computer science", "psychology", "architecture", "chemistry", "astronomy", "Albert Einstein", "algorithms", "Stephen Hawking", "Occam's razor", "game theory"];

        function makeInterestButtons() {
            $(".iButtonsDiv").empty();

            for (var i = 0; i < siTerms.length; i++) {
                var b = $("<a>");
                b.addClass("waves-effect waves-light red btn-large termBtns iBtns");
                b.attr("data-term", siTerms[i]);
                b.text(siTerms[i]);
                $(".iButtonsDiv").append(b);
            }

        }

        var newsTerms = ["daily mail", "fortune", "the wall street journal", "breitbart news", "national geographic", "new scientist", "the telegraph"];

        var widget1 = $("<iframe>");
        widget1.addClass("widget");
        widget1.attr("src", "http://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Culture Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=1065051273,122415315,568115978,583661711,309787436,259917817,1065050908,1069889359,564302516,563316406,1183123221&wt=playlist&partnerId=&affiliate_id=&at=&ct=");
        widget1.attr("frameborder", 0);
        widget1.attr("style", "overflow-x:hidden;overflow-y:hidden;width:250px;height: 300px;border:0px");

        var widget2 = $("<iframe>");
        widget2.addClass("widget");
        widget2.attr("src", "http://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Science&m=podcast&e=podcast&w=250&h=300&ids=470623801,73329284,325404506,278981407,169540430,343580439,128859062,350359306,151485804,152249110&wt=playlist&partnerId=&affiliate_id=&at=&ct=");
        widget2.attr("frameborder", 0);
        widget2.attr("style", "overflow-x:hidden;overflow-y:hidden;width:250px;height: 300px;border:0px");

        makePoliticalButtons();
        makeInterestButtons();
        makeNewsButtons(newsTerms);

        $("#podcastDiv").append(widget1);
        $("#podcastDiv").append("<br>");
        $("#podcastDiv").append(widget2);

    }




    $(document).on("click", ".iBtns", function(event) {
        event.preventDefault();
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
                var youTubeResults = $("<div class='card'>");
                var cardVideo = $("<div class='card-image'>");
                var video = $("<iframe>");
                video.attr("src", "https://www.youtube.com/embed/" + data.items[i].id.videoId);
                video.attr("frameborder", "0");
                video.attr("width", "100%");
                video.attr("height", "400");                
                cardVideo.append(video);
                var cardBody = $("<div class='card-content'>");
                var title = $("<h6>");
                title.text(data.items[i].snippet.title);
                var description = $("<p>");
                description.addClass("description");
                description.text(data.items[i].snippet.description);
                cardBody.append(title);
                cardBody.append(description);
                var link = $("<div class='card-action'>");
                var url = $("<a>");
                url.addClass("url");
                url.attr("href", "https://www.youtube.com/watch?v=" + data.items[i].id.videoId);
                url.attr("target", "_blank");                
                url.append("https://www.youtube.com/watch?v=" + data.items[i].id.videoId);
                url.text("Watch the Video");
                link.append(url);
                var saveBtn = $("<button>");
                saveBtn.addClass("waves-effect waves-light red btn saveBtn");
                saveBtn.html("Save for Later");
                link.append(saveBtn);
                youTubeResults.append(cardVideo);
                youTubeResults.append(cardBody);
                youTubeResults.append(link);
                $("#youTubeDiv").append(youTubeResults);
            }

            $('.saveBtn').on('click', function(event) {
                event.preventDefault();
                console.log("inside");
                var videoTitle = $(this).prev().prev().text();
                var videoLink = $(this).next().next().attr('href');
                console.log(videoTitle, videoLink);

                var saveObject = {
                    title: videoTitle,
                    link: videoLink
                }

                var queryUrl = "/api/savevideo/" + localStorage.getItem('email');
                console.log(queryUrl);

                saveItem(queryUrl, saveObject, "Video");
            });
        });
    });



    $(document).on("click", ".pBtns", function(event) {
        event.preventDefault();
        $("#youTubeDiv").html("");
        
        var q = $(this).attr("data-term");
        var searchTerm = q.replace(/ /g, "+");
        console.log(searchTerm);
        var apiKey = 'AIzaSyC9u9p589T-kb7CDunFP9ykos-fl0vtjtI';
        var queryURL = 'https://www.googleapis.com/youtube/v3/search?q=pro-' + searchTerm + '&key=' + apiKey + '&fields=items&part=snippet';
        console.log(queryURL);

         $.ajax({
             type: "GET",
             url: queryURL,
             dataType: 'jsonp'
         })
        .done(function(data) {
            console.log(data); 

            for (var i = 0; i < 5; i++) {
                var youTubeResults = $("<div class='card'>");
                var cardVideo = $("<div class='card-image'>");
                var video = $("<iframe>");
                video.attr("src", "https://www.youtube.com/embed/" + data.items[i].id.videoId);
                video.attr("frameborder", "0");
                video.attr("width", "100%");
                video.attr("height", "400");                
                cardVideo.append(video);
                var cardBody = $("<div class='card-content'>");
                var title = $("<h6>");
                title.text(data.items[i].snippet.title);
                var description = $("<p>");
                description.addClass("description");
                description.text(data.items[i].snippet.description);
                cardBody.append(title);
                cardBody.append(description);
                var link = $("<div class='card-action'>");
                var url = $("<a>");
                url.addClass("url");
                url.attr("href", "https://www.youtube.com/watch?v=" + data.items[i].id.videoId);
                url.attr("target", "_blank");                
                url.append("https://www.youtube.com/watch?v=" + data.items[i].id.videoId);
                url.text("Watch the Video");
                link.append(url);
                var saveBtn = $("<button>");
                saveBtn.addClass("waves-effect waves-light red btn saveBtn");
                saveBtn.html("Save for Later");
                link.append(saveBtn);
                youTubeResults.append(cardVideo);
                youTubeResults.append(cardBody);
                youTubeResults.append(link);
                $("#youTubeDiv").append(youTubeResults);
            }

            $('.saveBtn').on('click', function(event) {
                event.preventDefault();
                console.log("inside");
                var videoTitle = $(this).prev().prev().text();
                var videoLink = $(this).next().next().attr('href');
                console.log(videoTitle, videoLink);

                var saveObject = {
                    title: videoTitle,
                    link: videoLink
                }

                var queryUrl = "/api/savevideo/" + localStorage.getItem('email');
                console.log(queryUrl);

                saveItem(queryUrl, saveObject, "Video");
            });
        });
    });

    function makeNewsButtons(terms) {
        $(".nButtonsDiv").empty();

        for (var i = 0; i < terms.length; i++) {
            var n = $("<a>");
            n.addClass("waves-effect waves-light red btn-large termBtns nBtns");
            n.attr("data-term", terms[i]);
            n.text(terms[i]);
            $(".nButtonsDiv").append(n);
        }
    }

    function newsCall (searchTerm) {
        var apiKey = "09061982c53e479993c7a432a6f05ced";
        var queryURL = "https://newsapi.org/v1/articles?source=" + searchTerm + "&apiKey=" + apiKey;
        console.log(queryURL);
        $.ajax({
             type: "GET",
             url: queryURL
         })
        .done(function(data) {
            console.log(data); 

        for (var i = 0; i < 5; i++) {
            var newsResults = $("<div class='card'>");
            var cardImage = $("<div class='card-image'>");
            var image = $("<img>");
            image.attr("id", "resultImg");
            image.attr("src", data.articles[i].urlToImage); 
            cardImage.append(image);
            newsResults.append(cardImage);
            var cardBody = $("<div class='card-content'>");                       
            var title = $("<h6>");
            title.text(data.articles[i].title);
            var description = $("<p>");
            description.addClass("description");
            description.text(data.articles[i].description);
            cardBody.append(title);
            cardBody.append(description);
            var link = $("<div class='card-action'>");
            var url = $("<a>");
            url.addClass("url");
            url.attr("href", data.articles[i].url);
            url.attr("target", "_blank");
            url.text("Read the Article");
            link.append(url);
            var saveBtn = $("<button>");
            saveBtn.addClass("waves-effect waves-light red btn saveBtn");
            saveBtn.html("Save for Later");  
            link.append(saveBtn);          
            newsResults.append(cardBody);
            newsResults.append(link);
            $("#youTubeDiv").append(newsResults);
        }

            $('.saveBtn').on('click', function(event) {
                event.preventDefault();
                console.log("inside");
                var articleTitle = $(this).prev().prev().text();
                var articleLink = $(this).next().next().attr('href');
                console.log(articleTitle, articleLink);

                var saveObject = {
                    title: articleTitle,
                    link: articleLink
                }

                var queryUrl = "/api/savearticle/" + localStorage.getItem('email');
                console.log(queryUrl);

                saveItem(queryUrl, saveObject, "Article");
            });
        });    
    }

    $(document).on("click", ".nBtns", function(event) {
        event.preventDefault();
        $("#youTubeDiv").html("");
        //get data-term from button and replace empty spaces with dashes for AJAX call
        var q = $(this).attr("data-term");
        var searchTerm = q.replace(/ /g, "-");
        newsCall(searchTerm);
    });

    function saveItem(queryUrl, object, type) {
        $.ajax({
            type: "PUT",
            url: queryUrl,
            data: object
        }).done(function(data) {
            console.log(data);
            Materialize.toast(type + " saved!", 4000);
            completeStorage();

            // if (type === "Video") {
            //     var vidArray = [];
            //     vidArray.push(data.saved_videos[data.saved_videos.length - 1]);
            //     vidArray.forEach(fillSavedVideos);
            // } else {
            //     var artArray = [];
            //     artArray.push(data.saved_articles[data.saved_articles.length - 1]);
            //     artArray.forEach(fillSavedArticles);
            // }

            // $('.delItem').on('click', function(event) {
            //     event.preventDefault();
            //     var itemId = $(this).attr('data-id');
            //     console.log("saveItem click");

            //     $(this).parent().parent().html("<h6>deleted</h6>").css('color', 'red').attr('id', itemId);
            //     setTimeout(function() {
            //         $('#' + itemId).remove();
            //     }, 2000);

            //     removeItem("/api/deleteitem/" + itemId);
            // });
        });
    }

    function fillSavedVideos(item) {
        var row = $('<div>');
        row.addClass('row');

        var colOne = $('<div>');
        colOne.addClass('col s9');

        var title = $('<h6>');

        if (item.title.length > 15) {
            title.text(item.title.substr(0, 14) + "...");
        } else {
            title.text(item.title);
        }

        var link = $('<a>');
        link.attr('href', item.link);
        link.attr('target', '_blank');
        var small = $('<small>');
        small.text('watch video');
        link.append(small);

        colOne.append(title).append(link).append('<hr>');

        var colTwo = $('<div>');
        colTwo.addClass('col s3');
        var delButton = $('<a>');
        delButton.addClass('btn-floating btn waves-effect waves-light red delItem');
        delButton.attr('data-id', item._id);
        delButton.attr('data-type', 'video');
        var icon = $('<i>');
        icon.addClass('material-icons');
        icon.text('delete');
        delButton.append(icon);

        colTwo.append(delButton);

        row.append(colOne).append(colTwo);

        $('#videoList').prepend(row);
    }

    function fillSavedArticles(item) {
        var row = $('<div>');
        row.addClass('row');

        var colOne = $('<div>');
        colOne.addClass('col s9');

        var title = $('<h6>');

        if (item.title.length > 15) {
            title.text(item.title.substr(0, 14) + "...");
        } else {
            title.text(item.title);
        }

        var link = $('<a>');
        link.attr('href', item.link);
        link.attr('target', '_blank');
        var small = $('<small>');
        small.text('read article');
        link.append(small);

        colOne.append(title).append(link).append('<hr>');

        var colTwo = $('<div>');
        colTwo.addClass('col s3');
        var delButton = $('<a>');
        delButton.addClass('btn-floating btn waves-effect waves-light red delItem');
        delButton.attr('data-id', item._id);
        delButton.attr('data-type', 'article');
        var icon = $('<i>');
        icon.addClass('material-icons');
        icon.text('delete');
        delButton.append(icon);

        colTwo.append(delButton);

        row.append(colOne).append(colTwo);

        $('#articleList').prepend(row);
    }

    function removeItem(query) {
        $.ajax({
            url: query,
            method: "PUT"
        }).done(function(response) {
            console.log(response);
        });
    }

});
