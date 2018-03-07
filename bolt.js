var imgs = {
    float_icon: "https://cdn3.iconfinder.com/data/icons/customer-support-7/32/40_robot_bot_customer_help_support_automatic_reply-512.png",
    reply_bot: "https://cdn3.iconfinder.com/data/icons/customer-support-7/32/40_robot_bot_customer_help_support_automatic_reply-512.png",
    user_icon: "https://cdn3.iconfinder.com/data/icons/users/100/user_male_1-512.png"
}

var recognition;
var output_class = "#message";
var flags = {};
var base_url = getBaseURL();

function getBaseURL() {
    return "https://sahit.darwinbox.in/";
    // return window.location.origin;
}

var scripts = "https://rawgit.com/vedantvohra1/bot-bolt/master/init/";

var setUp = function() {
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    //$('head').append('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
    $('head').append('<link rel="stylesheet" type="text/css" ng-href="https://rawgit.com/vedantvohra1/bot-bolt/master/bolt.css">');
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
    $('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
    $('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
    $('head').append('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>');

    document.body.innerHTML += '<span class="w3-container"><img src="' + imgs.float_icon + '" onclick="botpop()" data-toggle="modal" data-target="#myModal" class="w3-button w3-xlarge w3-circle w3-black" width="42px"></span>';
}

var executeInit = function() {
    // opened in iframe
    if (/[?&]bot=/.test(location.search)) {
        //execute init scripts
        // console.log(localStorage.getItem('init'))
        // $.getScript(scripts + localStorage.getItem('init') + '.js', function() {
        //     console.log(localStorage.getItem("entities"))
        //     console.log("init called");

        //     init(localStorage.getItem("entities"));
        // });

        $(window).on('message', function(event) {
            if (event.origin !== 'http://localhost:8000' && event.origin !== 'https://sahit.darwinbox.in') return;

            console.log('message recieved: ', event.data)
        })
    } else {
        setUp();
    }
}
executeInit();

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
}

function Editiframe() {
    if (document.getElementById('myframe').style.display == 'block') {
        document.getElementById('myframe').style.display = 'none';
        document.getElementById('mapiframe').innerText = '>>';
    } else {
        document.getElementById('myframe').style.display = 'block';
        document.getElementById('mapiframe').innerText = '^';
    }
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
        $('#messages').append('<div class="container darker"><img src="' + imgs.user_icon + '" alt="User" style="width:5%;height:5%;" class="right" style="width:100%;"><p>' + text + '</p><span class="time-left">' + time + '</span></div>');
        $('.modal-body').html("Please wait...");
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/query?q=" + encodeURIComponent(text),
            crossDomain: true, //set as a cross domain requests 
            withCredentials: false,
            success: function(response) {
                console.log(response);

                if (response.url) {
                    var url = `${base_url}${response.url}?bot=true`;
                    console.log(url);
                    /*  localStorage.setItem("init", response.init);
                     console.log(response.init);
                     localStorage.setItem("entities", JSON.stringify(response.entities));
                     console.log(response.entities); */

                    $('.modal-body').empty();
                    $('.modal-body').append('<button type="button"  id="mapiframe" >^</button><iframe id="myframe" frameBorder="0" src = "' + url + '" width = "100%" height = "400px">Sorry your browser does not support inline frames.</iframe>');
                    console.log("assiging init");
                    document.getElementById('myframe').style.display = 'block';
                    document.getElementById('mapiframe').onclick = function() { Editiframe(); };

                    var message = {
                        init: response.init,
                        entities: response.entities
                    }
                    console.log('sending message')
                    document.getElementById('myframe').contentWindow.postMessage(message, 'https://sahit.darwinbox.in')

                    var resp = JSON.parse(localStorage.getItem("resp"))
                    if (resp) {
                        if (resp.fail) {
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:3000/log",
                                data: { msg_id: response.msg_id, tenant_id: resp.tenant_id },
                                crossDomain: true, //set as a cross domain requests 
                                withCredentials: false,
                                success: function(response) {
                                    console.log(response)
                                }
                            })
                        }
                    } else {
                        console.log('no response')
                    }
                } else {
                    $('.modal-body').empty();
                    botsay("Hmm... I'm sorry, could you say that again?");

                    if (flags.rec_flag == 2)
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

function doit_onkeypress(event) {
    if (event.keyCode == 13 || event.which == 13) {
        flags.rec_flag = 1;
        message();
    }
}

function botpop() {
    voiceInit();
    // localStorage.clear();
    console.log("bot is init");
    $('body').append('<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><div id="messages"></div></div><div class="modal-body"></div><div id="reqblock" class="modal-footer"></div></div></div></div></div>');
    $("#messages").empty();
    botsay("Hey, I am darwin!<br/> How can I help?");
    $("#reqblock").empty();
    $(".modal-body").empty();
    $('#reqblock').append('<input type="text" id="message" onkeypress="doit_onkeypress(event);">');
    $('#reqblock').append('<button id="callbot" type="button" class="btn btn-default" >Record</button>');
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
    try {
        recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || SpeechRecognition || webkitSpeechRecognition)();
    } catch (e) {
        console.log("Your browser does not support speech recognition. Please use Chrome.", e);
    }
}

function botsay(message) {
    var d = new Date(),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var time = h + ':' + m;
    console.log(time);
    $('#messages').append('<div class="container lighter"><img src="' + imgs.reply_bot + '" alt="Darwin" style="width:5%;height:5%;"><p>' + message + '</p><span class="time-right">' + time + '</span></div>');
}

var voiceInit = () => {
    flags.listening = false;

    try {
        recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || SpeechRecognition || webkitSpeechRecognition)();
    } catch (e) {
        console.log("Your browser does not support speech recognition. Please use Chrome.", e);
    }
}

var getTextFromEvent = function(e) {
    return event.results[0][0].transcript;
};

var trigger_speech_recognition = function() {
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
            flags.rec_flag = 2;
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






function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
}


function scrollToBottom() {
    $('html, body').animate({
        scrollTop: $(document).height()
    });

}




console.log('working');