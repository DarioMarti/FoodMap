<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';

function obtener_marcadores()
{

    $conn = conectar();
    $stmt = $conn->prepare("
    SELECT m.*, c.Color, c.Icono 
    FROM marcador m 
    LEFT JOIN marcador_categoria mc ON m.id = mc.Marcador_id AND mc.Es_principal = 1
    LEFT JOIN categoria c ON mc.Categoria_id = c.id 
    GROUP BY m.id
");
    $stmt->execute();
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $resultado;
}

header('Content-Type: application/json');
$resultado = obtener_marcadores();
echo json_encode($resultado);

?>