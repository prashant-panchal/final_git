<?php
/*
 * Created on Feb 5, 2015
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
 #echo $_SERVER['DOCUMENT_ROOT'] ; exit;
 session_start();
include_once('../mysql_crud.php');
$data = file_get_contents("php://input");
$objData = json_decode($data);
$mobilenumber=htmlspecialchars($objData->mobile);
$password=htmlspecialchars($objData->password);

 error_reporting(E_ALL);
 ini_set('display-errors','on');
 include_once('../OTPmodule/OTPModule.php');
 include_once('../mysql_crud.php');
 
 $OTP=OTPsend($mobilenumber);
 $OTP=crypt($OTP);
 $password=crypt($password);
 $userID=$_SESSION['patient']['patientID'];
 $db= new Database();
 $db->connect();
 #$db->sql("update userregistration set username=".$mobilenumber.",contactNumber=".$mobilenumber.",password=".$password.",OTP=".$OTP." where userID = ".$userID." ");
 $db->update('userregistration',array('username'=>$mobilenumber,'contactNumber'=>$mobilenumber,'password'=>$password,'OTP'=>$OTP),'userID="'.$userID.'"');
		  
 $res=$db->getResult();
 
 $db->disconnect();

 $_SESSION['patient']['contactNumber']=$mobilenumber; 
?>
