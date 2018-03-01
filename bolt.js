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


function message() {
    var text = $('#message').val();
    $('#messages').append('<div class="container darker"><img src="/w3images/avatar_g2.jpg" alt="Avatar" class="right" style="width:100%;"><p>Hey! I\'m fine. Thanks for asking!</p><span class="time-left">11:01</span></div>');
    console.log("message sent");
}


function botpop() {
    console.log("bot is init");
    $('body').append('<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><div id="messages"></div></div><div class="modal-body"></div><div id="reqblock" class="modal-footer"></div></div></div></div></div>');
    $("#messages").empty();
    $('#messages').append('<div class="container"><img src="bot-bolt/jarvis.png" alt="Avatar" style="width:5%;height:5%;"><p>Hello. I still wonder why you didn\'t get fired</p><span class="time-right">11:00</span></div>');
    $("#reqblock").empty();
    $('#reqblock').append('<input type="text" id="message">');
    $('#reqblock').append('<button id="callbot" type="button" class="btn btn-default" >Record</button>');
    $("#callbot").click(function() { message(); });

}


console.log('working');