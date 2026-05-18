<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';

function obtener_marcadores($nombre = null)
{

    $conn = conectar();

    if ($nombre) {
        $stmt = $conn->prepare("
            SELECT m.*, c.Color, c.Icono, c.id as Categoria_id 
            FROM marcador m 
            LEFT JOIN marcador_categoria mc ON m.id = mc.Marcador_id AND mc.Es_principal = 1
            LEFT JOIN categoria c ON mc.Categoria_id = c.id 
            WHERE m.Titulo LIKE ?
            GROUP BY m.id
        ");
        $stmt->execute(["%$nombre%"]);
        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    } else {
        $stmt = $conn->prepare("
            SELECT m.*, c.Color, c.Icono, c.id as Categoria_id 
            FROM marcador m 
            LEFT JOIN marcador_categoria mc ON m.id = mc.Marcador_id AND mc.Es_principal = 1
            LEFT JOIN categoria c ON mc.Categoria_id = c.id 
            GROUP BY m.id
        ");
        $stmt->execute();
        $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $resultado;
    }
}

header('Content-Type: application/json');
$nombre_buscado = isset($_GET['nombre']) ? $_GET['nombre'] : null;
$resultado = obtener_marcadores($nombre_buscado);
echo json_encode($resultado);

?>