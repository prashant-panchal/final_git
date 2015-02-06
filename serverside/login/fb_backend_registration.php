<?php
/*
 * Created on Feb 4, 2015
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
session_start();
error_reporting(E_ALL);
ini_set('display-errors','on');
include_once('../mysql_crud.php');
require 'phpsdk/autoload.php';
require_once( 'phpsdk/src/Facebook/FacebookRequest.php' );
require_once( 'phpsdk/src/Facebook/GraphUser.php');
require_once( 'phpsdk/src/Facebook/FacebookRequestException.php' );
require_once( 'phpsdk/src/Facebook/FacebookSession.php' );
require_once( 'phpsdk/src/Facebook/FacebookJavaScriptLoginHelper.php' );
use Facebook\FacebookRequest;
use Facebook\GraphUser;
use Facebook\FacebookRequestException;
use Facebook\FacebookJavaScriptLoginHelper;
use Facebook\FacebookSession;
error_reporting(E_ALL);
ini_set('display-errors','on');
FacebookSession::setDefaultApplication('320753791437998', 'b361268d43b80002ea4f1a4620d6f389');

$helper = new FacebookJavaScriptLoginHelper();
try {
  $session = $helper->getSession();
} catch(FacebookRequestException $ex) {
  // When Facebook returns an error
   header('Location:/patient');
} catch(\Exception $ex) {
  // When validation fails or other local issues
  header('Location:/patient');
}
/*Valid Facebook Session*/
if ($session) {
  try {
    #echo"session active!";
    // User logged in, get the AccessToken entity.
  $accessToken = $session->getAccessToken();
  // Exchange the short-lived token for a long-lived token.
  $longLivedAccessToken = $accessToken->extend();
  // Now store the long-lived token in the database
  // . . . $db->store($longLivedAccessToken);
  // Make calls to Graph with the long-lived token.
  // . . . 
    $user_profile = (new FacebookRequest($session, 'GET', '/me'))->execute()->getGraphObject(GraphUser::className());
	
	
	/*Storing user details in variables */
	$username=$user_profile->getProperty('name');
    //echo "Name: " .$name;
	$oauth_uid=$user_profile->getId();
	$user_email=$user_profile->getProperty('email');
	$fname=$user_profile->getProperty('first_name');
	$lname=$user_profile->getProperty('last_name');
	$gender=$user_profile->getProperty('gender');
	/*making a decision whether it is a first login into our site,
	 if yes,store it in a database
	 or redirect to index page directly
	*/
	$db= new Database();
	$db->select('userregistration','userID,display_name,FirstName,LastName,OTPverified',NULL,'oauth_uid='.$oauth_uid.'');
	$res=$db->getResult();
	#print_r($res);
	if(!($res))//first login via facebook
	  { 
		 $db->insert('userregistration',array('oauth_provider'=>'facebook','oauth_uid'=>$oauth_uid,'fb_access_token'=>$longLivedAccessToken
		             ,'display_name'=>$username,'FirstName'=> $fname,'LastName'=> $lname,'user_email'=> $user_email,'email_activation_status'=>1,'gender'=>$gender));
		$mobres=$db->getResult();			 
		 $db->select('userregistration','display_name,FirstName,LastName,OTPverified,userID',NULL,'oauth_uid='.$oauth_uid.'');
		  $mobilecheck_res=$db->getResult();
		 //print_r($mobilecheck_res);exit();
		 //exit();
		 
		 //$db->sql('select display_name,FirstName,LastName,OTPverified from userregistration where oauth_uid='.$oauth_uid.'');
		 //$res array is getting changed here 
		 
		 /*Storing php session values*/

			   $_SESSION['patient']['userType']='patient';
			   $_SESSION['patient']['patientID']=$mobilecheck_res[0]['userID'];
			   $_SESSION['patient']['PFirstName']=$mobilecheck_res[0]['FirstName'];
			   $_SESSION['patient']['PLastName']=$mobilecheck_res[0]['LastName'];
			   
			if(!$mobilecheck_res||$mobilecheck_res[0]['OTPverified']==0)#Mobile Number is not in the database
			 {
			   header('Location:/angularFiles/Angularjs-Healthserve.in/#/mobilenumber');exit();
			 }
		 header('Location:/angularFiles/Angularjs-Healthserve.in/#/');
	   }
	else{#Not a first login via facebook
	         /*  if($res[0]['OTPverified']==0)
			   {
				   echo "Please insert your mobile";
				   exit();
			   }
			 */
			 
			   /*Storing php session values*/
			   $_SESSION['patient']['userType']='patient';
			   $_SESSION['patient']['patientID']=$res[0]['userID'];
			   $_SESSION['patient']['PFirstName']=$res[0]['FirstName'];
			   $_SESSION['patient']['PLastName']=$res[0]['LastName'];
			   #print_r($_SESSION);
		  header('Location:/angularFiles/Angularjs-Healthserve.in/#/');
		}
  } catch(FacebookRequestException $e) {

    echo "Exception occured, code: " . $e->getCode();
    echo " with message: " . $e->getMessage();
  }   
}

