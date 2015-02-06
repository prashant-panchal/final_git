<?php
/*
 * Created on Feb 2, 2015
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
 session_start();

	#unset($_SESSION['patient']);
	$_SESSION = array();
	session_destroy();
	//echo"patient logout";
 
?>
