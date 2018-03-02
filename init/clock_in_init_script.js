// var api_text = [
//   {
//     "confidence": null,
//     "intent": "default_intent",
//     "_text": "i want to clock in",
//     "entities": {
//       "message_body": [
//         {
//           "suggested": true,
//           "confidence": 0.92915,
//           "value": "clock in",
//           "type": "value"
//         }
//       ],
//       "clock": [
//         {
//           "confidence": 0.97763752091331,
//           "value": "in"
//         }
//       ],
//       "intent": [
//         {
//           "confidence": 0.98853663717002,
//           "value": "mark_attendance"
//         }
//       ]
//     }
//   }
// ] ;

function init(api_text) {
	// var res = JSON.parse(JSON.stringify(api_text)) ;
	// comment below line and uncomment above line and api_text for testing in browser
	var res = JSON.parse(api_text) ;
	var clock_value = null ;
	if(res[0].entities.clock != undefined) {
		clock_value = res[0].entities.clock[0].value ;
	}

	var clock_text = $("#attendance-logger-widget").text() ;
	var len = $("#attendance-logger-widget").text().length ;
	var str = ""
	for (var i = 2; i < len; i++) {
		str += clock_text[i] ;
	}

	if(clock_value != null) {
		if(clock_value == "in" && str == "CLOCK IN") {
			$("#attendance-logger-widget").trigger("click") ;
		}
		if(clock_value == "out" && str == "CLOCK OUT") {
			$("#attendance-logger-widget").trigger("click") ;
		}
		if(clock_value == "in" && str == "CLOCK OUT") {
			return "Oh Sorry You clocked in already" ;
			//alert("Oh Sorry You clocked in already") ;
		}
	} else {
		//nothing here 
	}
}
// un comment the below line for testing in brower
// init(api_text)