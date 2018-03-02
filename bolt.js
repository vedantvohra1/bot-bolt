$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
$('head').append('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
$('head').append('<link rel="stylesheet" type="text/css" ng-href="https://gitlab.com/nvk777/bot-bolt/blob/master/bolt.css">');
$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
$('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
$('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
$('head').append('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>');
//$('body').append('<div class="w3-container"><h2>Circular Buttons</h2><button class="w3-button w3-xlarge w3-circle w3-black">+</button></div>');
//document.body.innerHTML += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">';
document.body.innerHTML += '<div class="w3-container"><button onclick="botpop()" data-toggle="modal" data-target="#myModal" class="w3-button w3-xlarge w3-circle w3-black">+</button></div>';

//$('body').append('<div class="container"><h2>Modal Example</h2><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button><div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Modal Header</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div></div>');

function removeframe(id) {
    $("#" + id).remove();
}

function message() {
    var text = $('#message').val();
    document.getElementById('message').value = "";
    var d = new Date(),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var time = h + ':' + m;
    $('#messages').append('<div class="container darker"><img src="bot-bolt/tony.jpg" alt="Avatar" style="width:5%;height:5%;" class="right" style="width:100%;"><p>' + text + '</p><span class="time-left">' + time + '</span></div>');
    console.log(text);
    if (text != "") {
        $('#messages').append('<div class="container darker"><img src="https://gitlab.com/nvk777/bot-bolt/raw/master/tony.jpg" alt="Avatar" style="width:5%;height:5%;" class="right" style="width:100%;"><p>' + text + '</p><span class="time-left">' + time + '</span></div>');

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/query?q=" + encodeURIComponent(text),
            success: function(response) {
                console.log(response)

                if (response.url) {
                    var url = base_url + response.url
                    $('.modal-body').empty()
                    $('.modal-body').append('<iframe frameBorder="0" src = "' + url + '" width = "100%" height = "70%">Sorry your browser does not support inline frames.</iframe>');
                } else {
                    botsay("Hmm... I'm sorry, could you say that again?")
                    trigger_speech_recognition()
                }
            }
        });
    }
}


function botpop() {
    console.log("bot is init");
    var d = new Date(),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var time = h + ':' + m;
    console.log(time);
    $('body').append('<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><div id="messages"></div></div><div class="modal-body"></div><div id="reqblock" class="modal-footer"></div></div></div></div></div>');
    $("#messages").empty();
    $('#messages').append('<div class="container"><img src="bot-bolt/jarvis.png" alt="Avatar" style="width:5%;height:5%;"><p>Hello. I am Darwin<br/>How can I help you today?</p><span class="time-right">' + time + '</span></div>');
    $("#reqblock").empty();
    $('#reqblock').append('<input type="text" id="message">');
    $('#reqblock').append('<button id="callbot" type="button" class="btn btn-default" >Record</button>');
    $("#callbot").click(function() { message(); });

    $('#messages').append('<div class="container"><img src="https://gitlab.com/nvk777/bot-bolt/raw/master/jarvis.png" alt="Avatar" style="width:5%;height:5%;"><p>' + message + '</p><span class="time-right">' + time + '</span></div>');
}

var voiceInit = () => {
    flags.listening = false

    try

    {

        recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || SpeechRecognition || webkitSpeechRecognition)();

    } catch (e)

    {

        console.log("Your browser does not support speech recognition. Please use Chrome.", e);

    }
}


console.log('working');