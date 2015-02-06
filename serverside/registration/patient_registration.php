<?php
#echo $_SERVER['DOCUMENT_ROOT'] ; exit;
 session_start();
include_once('../mysql_crud.php');
$data = file_get_contents("php://input");
$objData = json_decode($data);
$firstname=htmlspecialchars($objData->fname);
$lastname=htmlspecialchars($objData->lname);
$mobilenumber=htmlspecialchars($objData->mobile);
$password=htmlspecialchars($objData->password);
$gender="male";

 error_reporting(E_ALL);
 ini_set('display-errors','on');

 //include_once($_SERVER['DOCUMENT_ROOT'].'/angularFiles/Angularjs-Healthserve.in/serverside/OTPmodule/OTPModule.php');
 include_once('../OTPmodule/OTPModule.php');
 include_once('../mysql_crud.php');
 
 $OTP=OTPsend($mobilenumber);
 #echo $OTP;
 $OTP=crypt($OTP);
 $password=crypt($password);
 $db= new Database();
 $db->connect();
 $db->insert('userregistration',array('oauth_provider'=>'healthserve','username'=> $mobilenumber,'FirstName'=> $firstname,'LastName'=> $lastname,
			 'password'=> $password,'gender'=>$gender,'contactNumber'=>$mobilenumber,'OTP'=>$OTP));
 $res=$db->getResult();
 
 $db->disconnect();

 $_SESSION['patient']['contactNumber']=$mobilenumber; 
 
 
  /*Store the otp in session*/
		/* session_start();
		$_SESSION['loggedinuser'] = 1;
		$_SESSION['otp'] = $string;
		
		$db= new Database();
		$db->connect();
		$db->update('userregistration',array('OTP'=>$string),'userID="'.$_SESSION['userID'].'"');
		$db->update('userregistration',array('OTPverified'=>0),'userID="'.$_SESSION['userID'].'"'); */
		



?>