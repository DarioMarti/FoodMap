<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

//Comprueba si el usuario esta logueado
requerirLogin();

function obtener_fotos_marcador()
{
    $id_marcador = $_GET['id_marcador'];

    $conn = conectar();
    $stmt = $conn->prepare("SELECT * FROM multimedia WHERE Marcador_id = ?");
    $stmt->execute([$id_marcador]);
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $resultado;
}

header('Content-Type: application/json');
echo json_encode(obtener_fotos_marcador());