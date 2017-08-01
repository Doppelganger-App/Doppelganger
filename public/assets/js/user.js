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

        getOpenChatGroups(userObject.politics);
    }

    function completeStorage() {
        var email = localStorage.getItem('email');

        $.get("/api/completestorage/" + email, function(data) {
            console.log(data);
            $('#currentUserName').text("Welcome, " + data.name);

            $('#videoList').empty();
            $('#articleList').empty();
            //putting info into save areas
            data.saved_videos.forEach(fillSavedVideos);
            data.saved_articles.forEach(fillSavedArticles);

            fillChatGroups(data.chatgroups);

            localStorage.setItem('username', data.name);
            localStorage.setItem('politics', data.political_lean);
            localStorage.setItem('background', data.life_background);

            getOpenChatGroups(data.political_lean);

            $('.delItem').on('click', function(event) {
                event.preventDefault();
                var itemType = $(this).attr('data-type');
                var itemId = $(this).attr('data-id');
                console.log("completeStorage click");

                $(this).parent().parent().html("<h6>deleted</h6>").css('color', 'red').attr('id', itemId);
                setTimeout(function() {
                    $('#' + itemId).next().remove();
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

            makePoliticalButtons(lpTerms);

        var hiTerms = ["music theory", "poetry", "knitting", "film criticism", "painting", "geography", "literary criticism", "American history", "European history", "philosophy", "Shakespeare"];

            makeInterestButtons(hiTerms);
        
        var newsTerms = ["the new york times", "associated press", "reuters", "entertainment weekly", "cnn", "usa today"];

            makeNewsButtons(newsTerms);
        
        var widgetOneSource = "https://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Culture Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=250500859,201671138,953290300,124960485,300238066,1010962669,1168154281,354668519,1257821731,304531053&wt=playlist&partnerId=&affiliate_id=&at=&ct=";
        
            makeWidgetOne(widgetOneSource);

        var widgetTwoSource = "https://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Politics Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=1060761517,1057255460,135067274,158004641,1192761536,1200361736,1188724250,377785090,74840240,1235583717&wt=playlist&partnerId=&affiliate_id=&at=&ct=";
                
            makeWidgetTwo(widgetTwoSource);
        
    }


    //else if user is right humanities
    else if (localStorage.getItem("politics") === "right-leaning" && localStorage.getItem("background") === "humanities") {
        
        var lpTerms = ["social justice", "gender equality", "marriage equality", "welfare state", "socialism", "universal health care", "secularism", "environmentalism", "federalism", "pacifism"];

            makePoliticalButtons(lpTerms);

        var siTerms = ["biology", "computer science", "psychology", "architecture", "chemistry", "astronomy", "Albert Einstein", "algorithms", "Stephen Hawking", "Occam's razor", "game theory"];

            makeInterestButtons(siTerms);

        var newsTerms = ["the new york times", "associated press", "reuters", "national geographic", "cnn", "new scientist", "usa today", "hacker news", "national geographic", "new scientist", "recode", "the verge"];
        
            makeNewsButtons(newsTerms);

        var widgetOneSource = "https://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Politics Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=1060761517,1057255460,135067274,158004641,1192761536,1200361736,1188724250,377785090,74840240,1235583717&wt=playlist&partnerId=&affiliate_id=&at=&ct=";

            makeWidgetOne(widgetOneSource);

        var widgetTwoSource = "https://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Feeling Techie&m=podcast&e=podcast&w=250&h=300&ids=617416468,665964031,959773870,326120877,458066753,955198749,842818711,360889910,561470997,305253468&wt=playlist&partnerId=&affiliate_id=&at=&ct=";

            makeWidgetTwo(widgetTwoSource);

    }


    //else if user is left STEM
    else if (localStorage.getItem("politics") === "left-leaning" && localStorage.getItem("background") === "stem") {

        var rpTerms = ["small government", "second amendment rights", "freedom of religion", "military", "originalism", "moral order", "anti-regulation", "familialism", "social hierarchy"];

            makePoliticalButtons(rpTerms);

        var hiTerms = ["music theory", "poetry", "knitting", "film criticism", "painting", "geography", "literary criticism", "American history", "European history", "philosophy", "Shakespeare"];

            makeInterestButtons(hiTerms);

        var newsTerms = ["daily mail", "fortune", "the wall street journal", "breitbart news", "entertainment weekly", "the telegraph"];

            makeNewsButtons(newsTerms);

        var widgetOneSource = "https://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Culture Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=250500859,201671138,953290300,124960485,300238066,1010962669,1168154281,354668519,1257821731,304531053&wt=playlist&partnerId=&affiliate_id=&at=&ct=";

            makeWidgetOne(widgetOneSource);

        var widgetTwoSource = "https://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Politics Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=620967489,418152882,1112194905,1126543994,1155318497,635045292,965293227,209377688,1065050908,699723863&wt=playlist&partnerId=&affiliate_id=&at=&ct=";

            makeWidgetTwo(widgetTwoSource);
    }


    //else if user is left humanities
    else if (localStorage.getItem("politics") === "left-leaning" && localStorage.getItem("background") === "humanities") {

        var rpTerms = ["small government", "second amendment rights", "freedom of religion", "military", "originalism", "moral order", "anti-regulation", "familialism", "social hierarchy"];

             makePoliticalButtons(rpTerms);

        var siTerms = ["biology", "computer science", "psychology", "architecture", "chemistry", "astronomy", "Albert Einstein", "algorithms", "Stephen Hawking", "Occam's razor", "game theory"];

            makeInterestButtons(siTerms);

        var newsTerms = ["daily mail", "fortune", "the wall street journal", "breitbart news", "national geographic", "new scientist", "the telegraph", "hacker news", "national geographic", "new scientist", "recode", "the verge"];
        
            makeNewsButtons(newsTerms);

        var widgetOneSource = "https://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Culture Rediscovered&m=podcast&e=podcast&w=250&h=300&ids=1065051273,122415315,568115978,583661711,309787436,259917817,1065050908,1069889359,564302516,563316406,1183123221&wt=playlist&partnerId=&affiliate_id=&at=&ct=";

            makeWidgetOne(widgetOneSource);

        var widgetTwoSource = "https://widgets.itunes.apple.com/widget.html?c=us&brc=FFFFFF&blc=FFFFFF&trc=FFFFFF&tlc=FFFFFF&d=Suggested Podcasts&t=Science&m=podcast&e=podcast&w=250&h=300&ids=470623801,73329284,325404506,278981407,169540430,343580439,128859062,350359306,151485804,152249110&wt=playlist&partnerId=&affiliate_id=&at=&ct=";

            makeWidgetTwo(widgetTwoSource);
    
    }


    //youTube API query for interest categories
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

                var youTubeResults = $("<div class='card hoverable'>");
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
                    saveBtn.addClass("waves-effect waves-light red btn-large saveBtn");
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
                var videoTitle = $(this).parent().prev().children().first().text();
                var videoLink = $(this).prev().attr('href');
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


    //youTube API query for political categories
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
                var youTubeResults = $("<div class='card hoverable'>");
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
                    saveBtn.addClass("waves-effect waves-light red btn-large saveBtn");
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
                var videoTitle = $(this).parent().prev().children().first().text();
                var videoLink = $(this).prev().attr('href');
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

    //getting news API query
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
            var newsResults = $("<div class='card hoverable'>");
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
                saveBtn.addClass("waves-effect waves-light red btn-large saveBtn");
                saveBtn.html("Save for Later");  
                link.append(saveBtn);          
                newsResults.append(cardBody);
                newsResults.append(link);

            $("#youTubeDiv").append(newsResults);
        }

            $('.saveBtn').on('click', function(event) {
                event.preventDefault();
                console.log("inside");
                var articleTitle = $(this).parent().prev().children().first().text();
                var articleLink = $(this).prev().attr('href');
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


    //--------------BUTTON AND WIDGET MAKERS------------------

    function makeInterestButtons(terms) {
        $(".iButtonsDiv").empty();

        for (var i = 0; i < terms.length; i++) {
            var b = $("<a>");
            b.addClass("waves-effect waves-light red btn-large termBtns iBtns");
            b.attr("data-term", terms[i]);
            b.text(terms[i]);
            $(".iButtonsDiv").append(b);
        }

    }

    function makePoliticalButtons(terms) {
        $(".pButtonsDiv").empty();

        for (var i = 0; i < terms.length; i++) {
            var b = $("<a>");
            b.addClass("waves-effect waves-light red btn-large termBtns pBtns");
            b.attr("data-term", terms[i]);
            b.text(terms[i]);
            $(".pButtonsDiv").append(b);
        }
    }

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

    function makeWidgetOne(source) {

        var widget1 = $("<iframe>");
        widget1.addClass("widget");
        widget1.attr("src", source);
        widget1.attr("frameborder", 0);
        widget1.attr("style", "overflow-x:hidden;overflow-y:hidden;width:250px;height:300px;border:0px");

        $("#podcastDiv").append(widget1);
        $("#podcastDiv").append("<br>");
    }

    function makeWidgetTwo(source) {

        var widget2 = $("<iframe>");
        widget2.addClass("widget");
        widget2.attr("src", source);
        widget2.attr("frameborder", 0);
        widget2.attr("style", "overflow-x:hidden;overflow-y:hidden;width:250px;height: 300px;border:0px");

        $("#podcastDiv").append(widget2);
    }


    //----------------TO SAVE---------------------


    function saveItem(queryUrl, object, type) {
        $.ajax({
            type: "PUT",
            url: queryUrl,
            data: object
        }).done(function(data) {
            console.log(data);
            Materialize.toast(type + " saved!", 4000);
            completeStorage();
        });
    }

    function fillSavedVideos(item) {
        var row = $('<div>');
        row.addClass('row');

        var colOne = $('<div>');
        colOne.addClass('col s9 left-align');

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

        colOne.append(title).append(link);

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

        $('#videoList').prepend('<hr>').prepend(row);
    }

    function fillSavedArticles(item) {
        var row = $('<div>');
        row.addClass('row');

        var colOne = $('<div>');
        colOne.addClass('col s9 left-align');

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

        colOne.append(title).append(link);

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

        $('#articleList').prepend('<hr>').prepend(row);
    }

    function removeItem(query) {
        $.ajax({
            url: query,
            method: "PUT"
        }).done(function(response) {
            console.log(response);
        });
    }

    //side-navbar on small screen
    $(".button-collapse").sideNav();

    //scrollspy for podcasts and saved items on smaller screens
    $('.scrollspy').scrollSpy();

    $('.toc-wrapper').pushpin({
      top: 800,
      bottom: 3000
    });

    //Code for Chat Groups

    function fillChatGroups(array) {

        $('#chatList').empty();

        for (var i = 0; i < array.length; i++) {
            var row = $('<div>');
            row.addClass('row');

            var colOne = $('<div>');
            colOne.addClass('col s9 left-align');

            var title = $('<a>');
            title.attr('data-namespace', array[i].namespace);
            title.addClass('goToChat');
            var titleText = $('<h6>');
            titleText.text(array[i].name);

            title.append(titleText);

            var small = $('<small>');
            small.text('Topics: ' + array[i].topics.toString().replace(/,/g, ", "));

            colOne.append(title).append(small);

            var colTwo = $('<div>');
            colTwo.addClass('col s3');
            var goButton = $('<a>');
            goButton.addClass('btn-floating btn waves-effect waves-light goButton');
            goButton.attr('data-name', array[i].name);

            var icon = $('<i>');
            icon.addClass('material-icons');
            icon.text('forum');
            goButton.append(icon);

            colTwo.append(goButton);

            row.append(colOne).append(colTwo);

            $('#chatList').prepend('<br>').prepend('<hr>').prepend(row);
        }

        $('.goButton').on('click', function(event) {
            event.preventDefault();
            $(this).parent().prev().children().first().click();
        });

        $('.goToChat').on('click', function(event) {
            event.preventDefault();
            var room = $(this).attr('data-namespace');
            var gname = $(this).text();
            var topics = $(this).next().text();
            console.log(gname);
            console.log(topics);
            
            localStorage.setItem('room', room);

            window.location = "/discuss";
        });

        //Delete group from queue, for future...
        // $('.delGroup').on('click', function(event) {
        //     event.preventDefault();
        //     var gname = $(this).attr('data-name');

        //     $.ajax({
        //         type: "PUT",
        //         url: "/api/leavegroup/" + gname + "/" + localStorage.getItem('email')
        //     }).done(function(data) {
        //         $(this).parent().parent().next().remove();
        //         $(this).parent().parent().remove();
        //         console.log(data);
        //     });
        // });
    }

    function getOpenChatGroups(lean) {
        $.get("/api/getgroups/" + lean, function(data) {
            appendOpenChatGroups(data);
        });
    }

    function appendOpenChatGroups(array) {
        for (var i = 0; i < array.length; i++) {

            if (array[i].member_array.indexOf(localStorage.getItem('username')) === -1) {
                var row = $('<div>');
                row.addClass('row');

                var colOne = $('<div>');
                colOne.addClass('col s9 left-align');

                var title = $('<h5>');
                title.text(array[i].name);

                var topics = $('<h6>');
                topics.text('Topics: ' + array[i].topics.toString().replace(/,/g, ", "));

                var need = $('<small>');

                if (localStorage.getItem("politics") === "left-leaning") {
                    var amount = 3 - array[i].left_members;
                    need.text("This chat group needs " + amount + " more left-leaners.");
                } else {
                    var amount = 3 - array[i].right_members;
                    need.text("This chat group needs " + amount + " more right-leaners.");
                }

                colOne.append(title).append(topics).append(need);

                var colTwo = $('<div>');
                colTwo.addClass('col s3 center-align');
                var joinButton = $('<a>');
                joinButton.addClass('btn-floating btn waves-effect waves-light joinGroup');
                joinButton.attr('data-namespace', array[i].namespace);

                var icon = $('<i>');
                icon.addClass('material-icons');
                icon.text('add');
                joinButton.append(icon);

                colTwo.append('<br>').append(joinButton);

                row.append(colTwo).append(colOne);

                $('#openChatGroups').append(row).append('<hr>').append('<br>');
            }
        }

        $('.joinGroup').on('click', function(event) {
            event.preventDefault();

            var groupTopics = $(this).parent().next().children().first().next().text().substr(8).split(", ");

            var joinObject = {
                name: $(this).parent().next().children().first().text(),
                namespace: $(this).attr('data-namespace'),
                topics: groupTopics
            }

            $(this).parent().parent().next().remove();
            $(this).parent().parent().next().remove();
            $(this).parent().parent().remove();
            
            $.ajax({
                type: "PUT",
                url: "/api/joingroup/" + localStorage.getItem('email'),
                data: joinObject
            }).done(function(data) {
                console.log(data);
                Materialize.toast(joinObject.name + " has been added to your Chat Groups in your sidebar!", 7000);
                fillChatGroups(data);
            });
        });
    }

    $('.modal').modal();
    $('#openGroup').on('click', function(event) {
        event.preventDefault();
        $('#startChatgroup').modal('open');
    });

    $('.chips').material_chip();
    $('.chips-initial').material_chip({
        data: [{
            tag: 'Healthcare',
        }, {
            tag: 'Immigration',
        }, {
            tag: 'Economy'
        }]
    });

    $('#getvals').on('click', function(event) {
        event.preventDefault();
        var chipTopics = [];
        $('.chips').material_chip('data').forEach(function(item) {
            chipTopics.push(item.tag);
        });
        
        var groupObject = {
            name: $('#groupName').val().trim(),
            topics: chipTopics,
            admins: localStorage.getItem('email'),
            politics: localStorage.getItem('politics'),
            welcomeMessage: $('#welcomeMessage').val().trim(),
            memberName: localStorage.getItem('username')
        }

        $.post('/api/creategroup', groupObject, function(data) {
            
            if (data === "name taken") {
                alert("That group name is taken. Please choose another name.");
            } else {
                Materialize.toast(groupObject.name + " has been created. You can find the link to your new group under Chat Groups in your sidebar!", 7000);
                fillChatGroups(data);
            }
        });
    });

    $('.delvals').on('click', function(event) {
        $('#groupName').val("");
        $('.chips-initial').material_chip({
            data: [{
                tag: 'Healthcare',
            }, {
                tag: 'Immigration',
            }, {
                tag: 'Economy'
            }]
        });
        $('#welcomeMessage').val("");
        Materialize.updateTextFields();
    });

    $(window).on('beforeunload', function() {
        localStorage.setItem('signup', false);
    });
});
