// var api_text = [
//   {
//     "confidence": null,
//     "intent": "default_intent",
//     "_text": "Correct my clock in time to 11 AM today",
//     "entities": {
//       "message_body": [
//         {
//           "suggested": true,
//           "confidence": 0.92944,
//           "value": "my clock",
//           "type": "value"
//         },
//         {
//           "suggested": true,
//           "confidence": 0.9006,
//           "value": "time",
//           "type": "value"
//         }
//       ],
//       "datetime": [
//         {
//           "confidence": 0.965795,
//           "values": [
//             {
//               "value": "2018-03-02T11:00:00.000+05:30",
//               "grain": "hour",
//               "type": "value"
//             }
//           ],
//           "value": "2018-03-02T11:30:00.000+05:30",
//           "grain": "hour",
//           "type": "value"
//         }
//       ],
//       "intent": [
//         {
//           "confidence": 0.96081794522312,
//           "value": "correct_clock_in"
//         }
//       ]
//     }
//   }
// ] ;
function init(api_text) {
  	//var res = JSON.parse(JSON.stringify(api_text)) ;
  	var res = JSON.parse(api_text) ;
    // clock in request time
    // comment below line and uncomment above line and api_text for testing in browser  
  	var clock_in_time_hrs = null, clock_in_time_min = null;
  	var time = null ;
  	if(res[0].entities.datetime != undefined) {
  		time = res[0].entities.datetime[0].value ;
  		clock_in_time_hrs = time.substring(11, 13) ;
  		clock_in_time_min = time.substring(14, 16) ;
  	}
  	// request_type
  	// default value is Clock In Request
  	var request_type = 0 ;

  	// location_type
  	// 0 ---> Home 
  	// 1 ---> Field Duty
  	// 2 ---> Office
  	// default value is office
  	var location_type = null ;

  	var request_message = "This is sample message. " ;

  	$("#attendance_request").trigger("click") ;
  	// wait untill modal is loaded
  	setTimeout(fill_details, 1000) ;

  	function fill_details() {
  		$("#AttendanceRequestForm_request_type").get(0).selectedIndex = request_type ;
  		if(location_type != null) $("#AttendanceRequestForm_location").get(0).selectedIndex = location_type ;
  		if(clock_in_time_hrs != null) $("#AttendanceRequestForm_clock_in_hrs").val(clock_in_time_hrs) ;
  		if(clock_in_time_min != null) $("#AttendanceRequestForm_clock_in_min").val(clock_in_time_min) ;
  		$("#AttendanceRequestForm_message").val(request_message) ;
  	}
}
// un comment the below line for testing in brower
// init(api_text) ;