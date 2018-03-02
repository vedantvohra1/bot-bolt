// scale (1, 2, 3, 4, 5) => ("worst", "bad", "neutral", "good", "best") .
var mood_type = 1 ;
// can be empty string also .
var reason = "This is sample reason. " ;
// want to post anonymously ?, set this .
var is_anonymous = true ;

if(mood_type == 1) {
	$("#1").attr('class', 'emotion_clicked open') ;
	$("[name='pulse_reason[1]']").val(reason) ;
	if(is_anonymous) $("[name='is_anonymous']").attr('checked', 'checked') ;
} else if(mood_type == 2) {
	$("#2").attr('class', 'emotion_clicked open') ;
	$("[name='pulse_reason[2]']").val(reason) ;
	if(is_anonymous) $("[name='is_anonymous']").attr('checked', 'checked') ;
} else if(mood_type == 3) {
	$("#3").attr('class', 'emotion_clicked open') ;
	$("[name='pulse_reason[3]']").val(reason) ;
	if(is_anonymous) $("[name='is_anonymous']").attr('checked', 'checked') ;
} else if(mood_type == 4) {
	$("#4").attr('class', 'emotion_clicked open') ;
	$("[name='pulse_reason[4]']").val(reason) ;
	if(is_anonymous) $("[name='is_anonymous']").attr('checked', 'checked') ;
} else {
	$("#5").attr('class', 'emotion_clicked open') ;
	$("[name='pulse_reason[5]']").val(reason) ;
	if(is_anonymous) $("[name='is_anonymous']").attr('checked', 'checked') ;
}