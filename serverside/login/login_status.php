<?php
/*
 * Created on Jan 31, 2015
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
 session_start();
 $user=array();
 if(isset($_SESSION['patient']))
 {
    	 
    	 $user=array();
		       $user['PFirstName']=$_SESSION['patient']['PFirstName'];
		 	   $user['PLastName']=$_SESSION['patient']['PLastName'];
		 	   $user['patientID']=$_SESSION['patient']['patientID'];
		 	   print_r(json_encode($user));
 }
 else{
 	
 	return false;
 }
 
?>
