<?php
// Permitir peticiones desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
function conectar()
{


    $servidor = "localhost";
    $usuario = "root";
    $contrasena = "";
    $basededatos = "foodmap";
    $pdo = new PDO("mysql:host=$servidor;dbname=$basededatos", $usuario, $contrasena);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
}


?>