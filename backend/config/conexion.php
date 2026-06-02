<?php
// Permitir peticiones desde cualquier origen (CORS) con credenciales
$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
function conectar()
{
    $servidor = "localhost";
    $usuario = "admin_foodmap";
    $contrasena = "password_severo26";
    $basededatos = "foodmap";
    
    $pdo = new PDO("mysql:host=$servidor;dbname=$basededatos", $usuario, $contrasena);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
}


?>