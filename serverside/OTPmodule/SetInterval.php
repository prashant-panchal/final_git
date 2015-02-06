<?php
ini_set('max_execution_time', 300); //300 seconds = 5 minutes

function setInterval($func = null, $interval = 0, $times = 0){
  if( ($func == null) || (!function_exists($func)) ){
    throw new Exception('We need a valid function.');
  }
 
  /*
  usleep delays execution by the given number of microseconds.
  JavaScript setInterval uses milliseconds. microsecond = one 
  millionth of a second. millisecond = 1/1000 of a second.
  Multiplying $interval by 1000 to mimic JS.
  */
 
 
  $seconds = $interval * 1000;
 
  /*
  If $times > 0, we will execute the number of times specified.
  Otherwise, we will execute until the client aborts the script.
  */
 
  if($times > 0){
    
    $i = 0;
    
    while($i < $times){
        call_user_func($func);
        $i++;
        sleep( $interval );
    }
  } else {
    
    while(true){
        call_user_func($func); // Call the function you've defined.
        sleep( $interval );
    }
  }
}
 
function doit(){
  print ' YO!<br>';
}
 
 
//setInterval('doit',10,20); // Invoke every five seconds, until user aborts script.
//setInterval('doit', 1, 100); // Invoke every second, up to 100 times.