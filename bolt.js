$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
$('head').append('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
$('head').append('<link rel="stylesheet" href="https://gitlab.com/nvk777/bot-bolt/blob/master/bolt.css">');

//$('body').append('<div class="w3-container"><h2>Circular Buttons</h2><button class="w3-button w3-xlarge w3-circle w3-black">+</button></div>');
//document.body.innerHTML += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">';
document.body.innerHTML += '<div class="w3-container"><button onclick="botpop()" class="w3-button w3-xlarge w3-circle w3-black">+</button></div>';

function botpop() {
    console.log("bot is init");
    $('body').append('<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><p>Some text in the Modal..</p></div> </div>');
}

console.log('working');