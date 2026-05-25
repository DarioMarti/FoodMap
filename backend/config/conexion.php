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
    
    // Si la IP/host del servidor coincide con tu VPS o el dominio, usamos los datos de producción
    if (isset($_SERVER['HTTP_HOST']) && (strpos($_SERVER['HTTP_HOST'], '212.227.146.174') !== false || strpos($_SERVER['HTTP_HOST'], 'thefoodmap.online') !== false)) {
        $usuario = "admin_foodmap";
        $contrasena = "tu_contrasena_segura";
    } else {
        // En cualquier otro caso (XAMPP local), usamos los datos por defecto
        $usuario = "root";
        $contrasena = "";
    }
    
    $basededatos = "foodmap";
    $pdo = new PDO("mysql:host=$servidor;dbname=$basededatos", $usuario, $contrasena);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
}


?>