<?php
// Permitir peticiones desde cualquier origen (CORS) con credenciales
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
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