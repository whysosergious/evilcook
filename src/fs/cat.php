<?php

  $ground_zero = 'App.js';
  $zcm_dir = 'ZergskiManager';

  echo $response = "Began processing files  =>  $ground_zero";

  
  try {
    rename("../$ground_zero", "../$zcm_dir/$ground_zero.zprep");  // ext z-pre-proccessed
    echo "File copied to new directory ", $zcm_dir, " ";
  } catch {
    echo "Copycat failed with exception \n "; 
  }

?>