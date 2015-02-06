<?php
//header('Location:mobile_verification.html');
error_reporting(E_ALL);
ini_set('display-errors','on');
include_once('../OTPmodule/OTPModule.php');
include_once('../mysql_crud.php');
$db= new Database();
$db->connect();
session_start();
/*Call to OTPsend function*/
$OTP=OTPsend($_SESSION['contactNumber']);
$OTP=crypt($OTP);
$db->update('userregistration',array('OTP'=>$OTP),'contactNumber="'.$_SESSION['contactNumber'].'"');
$db->disconnect();