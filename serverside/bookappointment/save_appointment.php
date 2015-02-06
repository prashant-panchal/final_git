<?php
/*
 * Created on Feb 2, 2015
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
session_start();
include_once('../mysql_crud.php');
$data = file_get_contents("php://input");
$objData = json_decode($data);
$patientname=htmlspecialchars($objData->patientname);
$Reason=htmlspecialchars($objData->Reason);
$app_date=htmlspecialchars($objData->app_date);
$app_slot=htmlspecialchars($objData->slot); 
?>
