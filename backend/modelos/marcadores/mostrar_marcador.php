<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//Comprueba si el usuario esta logueado
requerirLogin();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

header('Content-Type: application/json');

if (!isset($_SESSION['usuario'])) {
    echo json_encode([]);
    exit;
}

$id_usuario = $_SESSION['usuario']['id'];

function obtener_marcadores($id_usuario, $nombre = null)
{
    $conn = conectar();

    if ($nombre) {
        $stmt = $conn->prepare("
            SELECT m.*, c.Color, c.Icono, c.id as Categoria_id 
            FROM marcador m 
            LEFT JOIN marcador_categoria mc ON m.id = mc.Marcador_id AND mc.Es_principal = 1
            LEFT JOIN categoria c ON mc.Categoria_id = c.id 
            WHERE m.Usuario_id = ? AND m.Titulo LIKE ?
            GROUP BY m.id
        ");
        $stmt->execute([$id_usuario, "%$nombre%"]);
        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    } else {
        $stmt = $conn->prepare("
            SELECT m.*, c.Color, c.Icono, c.id as Categoria_id 
            FROM marcador m 
            LEFT JOIN marcador_categoria mc ON m.id = mc.Marcador_id AND mc.Es_principal = 1
            LEFT JOIN categoria c ON mc.Categoria_id = c.id 
            WHERE m.Usuario_id = ?
            GROUP BY m.id
        ");
        $stmt->execute([$id_usuario]);
        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $resultado;
    }
}

$nombre_buscado = isset($_GET['nombre']) ? $_GET['nombre'] : null;
$resultado = obtener_marcadores($id_usuario, $nombre_buscado);
echo json_encode($resultado);
?>