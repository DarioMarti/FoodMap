<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';


$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//Comprueba si el usuario esta logueado
requerirLogin();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

header('Content-Type: application/json');

$id_usuario = $_SESSION['usuario']['id'];

function obtener_marcadores($id_usuario, $nombre = null)
{
    $conn = conectar();

    if ($nombre) {
        $stmt = $conn->prepare("
            SELECT m.*, c.Color, c.Icono, c.id as Categoria_id, CAST(GROUP_CONCAT(mc2.Categoria_id) AS CHAR) as Todas_Categorias
            FROM marcador m 
            LEFT JOIN marcador_categoria mc ON m.id = mc.Marcador_id AND mc.Es_principal = 1
            LEFT JOIN categoria c ON mc.Categoria_id = c.id 
            LEFT JOIN marcador_categoria mc2 ON m.id = mc2.Marcador_id
            WHERE m.Usuario_id = ? 
              AND (
                  m.Titulo LIKE ? 
                  OR EXISTS (
                      SELECT 1 FROM marcador_categoria mc3 
                      JOIN categoria c3 ON mc3.Categoria_id = c3.id 
                      WHERE mc3.Marcador_id = m.id AND c3.Nombre LIKE ?
                  )
              )
            GROUP BY m.id
        ");
        $stmt->execute([$id_usuario, "%$nombre%", "%$nombre%"]);
        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    } else {
        $stmt = $conn->prepare("
            SELECT m.*, c.Color, c.Icono, c.id as Categoria_id, CAST(GROUP_CONCAT(mc2.Categoria_id) AS CHAR) as Todas_Categorias
            FROM marcador m 
            LEFT JOIN marcador_categoria mc ON m.id = mc.Marcador_id AND mc.Es_principal = 1
            LEFT JOIN categoria c ON mc.Categoria_id = c.id 
            LEFT JOIN marcador_categoria mc2 ON m.id = mc2.Marcador_id
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