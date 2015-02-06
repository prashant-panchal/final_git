<?php
 error_reporting(E_ALL);
 ini_set('display-errors','on');
 include_once('../OTPmodule/OTPModule.php');
 include_once('../mysql_crud.php');
 $data = file_get_contents("php://input");
 #$objData = json_decode($data);
 $OTP=htmlspecialchars($data);
 session_start();
 if(isset($_SESSION['patient']['contactNumber']))
 {
    	
 $username=$_SESSION['patient']['contactNumber'];
 if(OTPcheck($OTP,$_SESSION['patient']['contactNumber']))
  {
	    //If Mobile verification is successful!
		$db=new Database();
		$db->select('userregistration',' * ',NULL,'username="'.$username.'"AND OTPverified=1');
	    $res=$db->getResult();
	    if($res)
	    {
		   $_SESSION = array();
		   $_SESSION['patient']['patientID']=$res[0]['userID'];
		   $_SESSION['patient']['PFirstName']=$res[0]['FirstName'];
		   $_SESSION['patient']['PLastName']=$res[0]['LastName'];
		   print_r("OTP verified");
	    }
	    else
	    {
	     print_r("TECHNICAL ERROR");
			
	    }
   }
   else 
   {
    print_r("WRONG VERIFICATION CODE");
   }
 }
 else
 {
 	
 	print_r("SESSION EXPIRED");
 } 