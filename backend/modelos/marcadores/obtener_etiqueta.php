<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

session_start();

//Comprueba si el usuario esta logueado
requerirLogin();

function obtener_etiquetas()
{
    $id_categoria = $_GET['id_categoria'];

    $conn = conectar();
    $stmt = $conn->prepare("SELECT * FROM categoria WHERE id = ?");
    $stmt->execute([$id_categoria]);
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $resultado;
}

header('Content-Type: application/json');
echo json_encode(obtener_etiquetas());