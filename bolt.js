$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
//$('head').append('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
$('head').append('<link rel="stylesheet" type="text/css" ng-href="https://gitlab.com/nvk777/bot-bolt/blob/master/bolt.css">');
$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
$('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
$('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
$('head').append('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>');
//$('body').append('<div class="w3-container"><h2>Circular Buttons</h2><button class="w3-button w3-xlarge w3-circle w3-black">+</button></div>');
//document.body.innerHTML += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">';
document.body.innerHTML += '<div class="w3-container"><button onclick="botpop()" data-toggle="modal" data-target="#myModal" class="w3-button w3-xlarge w3-circle w3-black">+</button></div>';
console.log(window.location.href);
//$('body').append('<div class="container"><h2>Modal Example</h2><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button><div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Modal Header</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div></div>');

var recognition;
var output_class = "#message";
var flags = {};
var base_url = getBaseURL();

function getBaseURL() {
    return 'http://tina.qa.darwinbox.io';
}

var cdn = "https\://cdn.rawgit.com/vedantvohra1/bot-bolt/4cf46cd8/init/";

// var queryString = window.location.search;
// console.log("query string is :" + queryString);
// if (queryString != "") {
//     var init = localStorage.getItem("init");
//     console.log("init value" + init);
//     if (init) {
//         $('head').append('<script src="' + cdn + init + '.js"></script>');
//         var entities = JSON.parse(localStorage.getItem("entities"));
//         init(entities);
//     }
// }



function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
}

function message() {
    $('.modal-body').empty();
    var text = $('#message').val();
    document.getElementById('message').value = "";
    var d = new Date(),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var time = h + ':' + m;
    console.log(text);
    if (text != "") {
        $('#messages').append('<div class="container darker"><img src="https://rawgit.com/vedantvohra1/bot-bolt/master/tony.jpg" alt="User" style="width:5%;height:5%;" class="right" style="width:100%;"><p>' + text + '</p><span class="time-left">' + time + '</span></div>');
        $('.modal-body').html("Please wait...");
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/query?q=" + encodeURIComponent(text),
            success: function(response) {
                console.log(response);

                if (response.url) {
                    var url = base_url + response.url;
                    console.log(url);
                    localStorage.setItem("init", response.init);
                    console.log(response.init);
                    localStorage.setItem("entities", JSON.stringify(response.entities));
                    console.log(response.entities);
                    $('.modal-body').empty();
                    //?q=apply_leave
                    $('.modal-body').append('<iframe id="myframe" frameBorder="0" src = "' + url + '" width = "100%" height = "900px">Sorry your browser does not support inline frames.</iframe>');
                    console.log("assiging init");
                    var init = localStorage.getItem("init");
                    console.log(init);
                    var entities = localStorage.getItem("entities");
                    var jq = '<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>';
                    var scriptTag = '<script type="text/javascript" src="' + cdn + init + '.js#L11">console.log(" init is actually called");init(' + entities + '); </script>';
                    var test = '<script>console.log(document.getElementsByTagName("body").innerHTML);</script>';
                    //please don't remove the following content please
                    //uncomment any of block one or two to append the script to the page in iframe 
                    //start of block one


                    $("#myframe").contents().find("head").append(jq);
                    $("#myframe").contents().find("head").append(scriptTag);
                    sleep(4);
                    $("#myframe").contents().find("head").append(test);
                    console.log($("#myframe").contents());
                    //end of block one

                    //start of block two
                    // var x = document.getElementById("myframe");
                    // var y = (x.contentWindow || x.contentDocument);
                    // if (y.document) y = y.document;
                    // y.body.style.backgroundColor = "red";
                    // y.head.append(test);
                    // y.head.append('<script src="' + cdn + init + '.js"></script>');
                    // y.head.append('<script src="' + cdn + init + '.js"></script>');
                    //end of block two
                } else {
                    $('.modal-body').empty();
                    botsay("Hmm... I'm sorry, could you say that again?");
                    trigger_speech_recognition();
                }

                scrollToBottom();
            }
        });
    }
}

function scrollToBottom() {
    $('html, body').animate({
        scrollTop: $(document).height()
    });

}


function botpop() {
    voiceInit();
    localStorage.clear();
    console.log("bot is init");
    $('body').append('<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><div id="messages"></div></div><div class="modal-body"></div><div id="reqblock" class="modal-footer"></div></div></div></div></div>');
    $("#messages").empty();
    botsay("Hey, I am darwin!<br/> How can I help?");
    $("#reqblock").empty();
    $(".modal-body").empty();
    $('#reqblock').append('<input type="text" id="message">');
    $('#reqblock').append('<button id="callbot" type="button" class="btn btn-default" >Record</button>');
    $('#reqblock').append('<button id="textsubmit" type="button" class="btn btn-default" >submit</button>');
    $("#callbot").click(function() {
        if (flags.listening == false) {
            trigger_speech_recognition();
        } else if (flags.listening == true) {
            stop_speech_recognition();
        }
    });
    $("#textsubmit").click(function() {
        message();
    });
}

var voiceInit = () => {
    flags.listening = false;

    try

    {

        recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || SpeechRecognition || webkitSpeechRecognition)();

    } catch (e)

    {

        console.log("Your browser does not support speech recognition. Please use Chrome.", e);

    }
}

function botsay(message) {
    var d = new Date(),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var time = h + ':' + m;
    console.log(time);
    $('#messages').append('<div class="container lighter"><img src="https://rawgit.com/vedantvohra1/bot-bolt/master/jarvis.png" alt="Darwin" style="width:5%;height:5%;"><p>' + message + '</p><span class="time-right">' + time + '</span></div>');
}

var voiceInit = () => {
    flags.listening = false;

    try

    {

        recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || SpeechRecognition || webkitSpeechRecognition)();

    } catch (e)

    {

        console.log("Your browser does not support speech recognition. Please use Chrome.", e);

    }
}

var getTextFromEvent = function(e)

{

    return event.results[0][0].transcript;

};

var trigger_speech_recognition = function()

{


    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    recognition.maxAlternatives = 1;

    var t = $(output_class).val(); // existing text

    recognition.onresult = function(event) {

        var r = getTextFromEvent(event); // new word

        $(output_class).val(t + " " + r) //reads existing content and add new identified word with a space

    };

    recognition.onstart = function() {

        console.log("listening");
        flags.listening = true;
        $('#callbot').html('Recording...')
    }



    recognition.onend = function() {

        flags.listening = false;
        $('#callbot').html('Record');

        console.log("onend")
        if (flags.manual_intervention) {
            message();
            return;
        }

        trigger_speech_recognition();

    }



    recognition.onerror = function(event) {

        if (event.error == 'no-speech') {

            console.log('no-speech');

            stop_speech_recognition();

        };

    }

    recognition.start();


    recognition.onaudioend = function(event) {
        console.log("audioend");
        flags.manual_intervention = true;
        stop_speech_recognition();
    }

};

var stop_speech_recognition = function(manual = false) {

    recognition.stop();
    flags.listening = false;
    $('#callbot').html('Record');
};



console.log('working');