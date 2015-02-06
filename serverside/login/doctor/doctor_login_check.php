<?php
/*
 * Created on Feb 6, 2015
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
 session_start();
 $data = file_get_contents("php://input");
 $objData = json_decode($data);
 $username=htmlspecialchars($objData->username);
 $password=htmlspecialchars($objData->password);
 error_reporting(E_ALL);
 ini_set('display-errors','on');
 include_once('../../mysql_crud.php');
 $db= new Database();
 $db->select('doctor_info',' * ',NULL,'email="'.$username.'"');
 $res=$db->getResult();
 if(crypt($password,$res[0]['password'])==$res[0]['password'] )
 {
 	   
	   /*$_SESSION = array();
	   $_SESSION['doctor']['userType']='doctor';
	   $_SESSION['doctor']['doc_id']=$res[0]['doc_id'];
	   $_SESSION['doctor']['DFirstName']=$res[0]['FirstName'];
	   $_SESSION['doctor']['DLastName']=$res[0]['LastName'];
	   $_SESSION['doctor']['DocImage']=$res[0]['DocImage'];*/
	   
	   echo"1";
 	
 }
 else
 {
 	//echo "false login credentials";
 	echo"0";
 }

