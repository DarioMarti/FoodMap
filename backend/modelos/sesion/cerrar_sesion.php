<?php
header("Access-Control-Allow-Origin: http://localhost:5175");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
session_start();
session_unset();
session_destroy();
echo json_encode(["ok" => true]);
?>