// var api_text = [
//   {
//     "confidence": null,
//     "intent": "default_intent",
//     "_text": "show my pending vibe requests",
//     "entities": {
//       "contact": [
//         {
//           "suggested": true,
//           "confidence": 0.91303,
//           "value": "my",
//           "type": "value"
//         }
//       ],
//       "message_body": [
//         {
//           "suggested": true,
//           "confidence": 0.930925,
//           "value": "vibe requests",
//           "type": "value"
//         }
//       ],
//       "request_type": [
//         {
//           "confidence": 0.9801909893532,
//           "value": "vibe"
//         }
//       ],
//       "intent": [
//         {
//           "confidence": 0.9952508304759,
//           "value": "pending_requests"
//         }
//       ]
//     }
//   }
// ] ;
function init(api_text) {
	
	//var res = JSON.parse(JSON.stringify(api_text)) ;
    // comment below line and uncomment above line and api_text for testing in browser	
	var res = JSON.parse(api_text) ;

	// default request type is all pending requests
	var request_type = 0 ;
	
	var request_type_value = null ;
	

	// look at entities and see request_type present
	if(res[0].entities.request_type != undefined) {
		request_type_value = res[0].entities.request_type[0].value ;
		if(request_type_value == "attendance") {
			request_type = 1 ;
		} else if(request_type_value == "leave") {
			request_type = 2 ;
		} else if(request_type_value == "vibe") {
			request_type = 3 ;
		} else if(request_type_value == "expense") {
			request_type = 4 ;
		} else if(request_type_value == "letters") {
			request_type = 5 ;
		}
	}
	
	if(request_type == 0) {
		$("#which").val("defualt-text").change() ;
	} else if(request_type == 1) {
		$("#which").val("attendance").change() ;
	} else if(request_type == 2) {
		$("#which").val("leave").change() ;
	} else if(request_type == 3) {
		$("#which").val("streams").change() ;
	} else if(request_type == 4) {
		$("#which").val("expense").change() ;
	} else {
		$("#which").val("letters").change() ;
	}
}
// un comment the below line for testing in browser
// init(api_text) ;