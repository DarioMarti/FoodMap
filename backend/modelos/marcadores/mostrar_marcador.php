<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';

function obtener_marcadores()
{

    $conn = conectar();
    $stmt = $conn->prepare("SELECT * FROM marcador");
    $stmt->execute();
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $resultado;
}

header('Content-Type: application/json');
$resultado = obtener_marcadores();
echo json_encode($resultado);

?>