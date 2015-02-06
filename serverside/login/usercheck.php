<?php
/*
 * Created on Nov 17, 2014
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
 
 session_start();
 /*$username=htmlspecialchars($_POST["username"]);
 $password=htmlspecialchars($_POST["password"]);
 $return=$_POST["return"];*/
 $data = file_get_contents("php://input");
 $objData = json_decode($data);
 $username=htmlspecialchars($objData->username);
 $password=htmlspecialchars($objData->password);
 error_reporting(E_ALL);
 ini_set('display-errors','on');
 include_once('../mysql_crud.php');
 $db= new Database();
 $db->select('userregistration',' * ',NULL,'username="'.$username.'" AND OTPverified=1');
 $res=$db->getResult();
 #print_r($res);exit();
	 if($res)
	 {
		 
		 if(crypt($password,$res[0]['password'])==$res[0]['password'])
		 {
			   //echo "inside check2";
			   #$_SESSION = array();
			   $_SESSION['patient']['userType']='patient';
			   $_SESSION['patient']['patientID']=$res[0]['userID'];
			   $_SESSION['patient']['PFirstName']=$res[0]['FirstName'];
			   $_SESSION['patient']['PLastName']=$res[0]['LastName'];
		      
		 	   
		 }
		 else
		 {
		 	$_SESSION = array();
			session_destroy();
		 	 print_r("Wrong Password");
		 	
		 }
	 }
	 else
	 {
	 	print_r("Wrong Username");
	 	
	 }
 
 
 