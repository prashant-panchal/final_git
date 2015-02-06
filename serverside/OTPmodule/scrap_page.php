<?php
function OTPsend($mobilenumber)
{
	$str = '';
	for($i=7;$i>0;$i--){
		$str = $str.chr(rand(97,122)); 
        /*  The above line concatenates one character at a time for seven
        	iterations within the ASCII range mentioned.
			So, we get a seven characters random OTP comprising of all
			small alphabets. 
		*/
	}
 SMSNotify_OTP($mobilenumber,$str);
 




}