// var api_text = [
//   {
//     "confidence": null,
//     "intent": "default_intent",
//     "_text": "I want to apply for a sick leave",
//     "entities": {
//       "message_body": [
//         {
//           "suggested": true,
//           "confidence": 0.90684,
//           "value": "apply for a sick leave",
//           "type": "value"
//         }
//       ],
//       "leave_type": [
//         {
//           "confidence": 0.99680599560398,
//           "value": "sick"
//         }
//       ],
//       "intent": [
//         {
//           "confidence": 0.99998574826545,
//           "value": "apply_leave"
//         }
//       ]
//     }
//   }
// ] ;
function init(api_text) {

	//var res = JSON.parse(JSON.stringify(api_text)) ;
	// comment below line and uncomment above line and api_text for testing in browser	
	var res = JSON.parse(api_text) ;
	// leave_type
	// 1 ----> Saturday Off
	// 2 ----> Sick Leave
	// 3 ----> Casual Leave
	// 4 ----> Loss of Pay

	// to get leave_type from json
	var leave_type = 3 ;
	if(res[0].entities.leave_type != undefined) {
		leave_type = res[0].entities.leave_type[0].value == "sick" ? 2 : 3 ;
	}
	var leave_reason = "This is sample reason. " ;

	var from_date = null, to_date = null, from_date_given = false ;

	if(res[0].entities.datetime != undefined) {
		//there is date and time entity ;
		//we have two possibilities from - to given (or) value is given
		if(res[0].entities.datetime[0].from != undefined) {
			from_date = res[0].entities.datetime[0].from.value ;
			from_date = from_date.substring(0, 10) ;
			from_date_given = true ;
		}
		if(res[0].entities.datetime[0].to != undefined) {
			to_date = res[0].entities.datetime[0].to.value ;
			to_date = to_date.substring(0, 10) ;
		}
		//
		if(res[0].entities.datetime[0].value != undefined) {
			from_date = res[0].entities.datetime[0].value ;
			from_date = from_date.substring(0, 10) ;
			from_date_given = true ;		
		}
	}
	var today = new Date() ;
	Date.prototype.yyyymmdd = function() {
	  var yyyy = this.getFullYear().toString();
	  var mm = (this.getMonth()+1).toString(); 
	  var dd  = this.getDate().toString();
	  return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); 
	};

	from_date = from_date_given ? from_date : today.yyyymmdd() ;


	var is_half_day = false, is_second_half_day = false ;

	if(res[0].entities.datetime != undefined) {
		if(res[0].entities.datetime[0].from != undefined) {
			if(res[0].entities.datetime[0].from.grain == "hour") {
				is_half_day = true ;
				time = res[0].entities.datetime[0].from.value ;
				time = time.substring(11, 13) ;
				if(time >= "12") {
					is_second_half_day = true ;
				}
			}
		}
	}

	$("#message_leave").trigger("click") ;
	setTimeout(process,1000);
	function process() {
		//selecting leave type from drop down menu
		$("#leave_change").get(0).selectedIndex = leave_type ;
		//self explanatory
		if(from_date != null) $("#from_date").val(from_date) ;
		if(to_date != null) $("#to_date").val(to_date) ;
		$("#message-box-text").val(leave_reason);
		if(is_half_day) {
			$("#halfday").trigger("click") ;
			if(is_second_half_day) {
				$('input:radio[id=UserLeaves_is_firsthalf_secondhalf]')[1].checked = true ;
			}
		}
	}
}
// un comment the below line for testing in brower

// init(api_text) ;