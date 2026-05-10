<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';

function obtener_todas_etiquetas()
{
    $id_marcador = $_GET['id_marcador'];

    $conn = conectar();
    $stmt = $conn->prepare("
    SELECT c.*, mc.Es_principal AS EsPrincipal 
    FROM categoria c 
    JOIN marcador_categoria mc ON c.id = mc.Categoria_id 
    WHERE mc.Marcador_id = ?
");
    $stmt->execute([$id_marcador]);
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $resultado;
}

header('Content-Type: application/json');
echo json_encode(obtener_todas_etiquetas());
?>