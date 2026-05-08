<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';

$conexion = conectar();

try {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $puntuacion = $_POST['puntuacion'];
    $etiquetas = $_POST['etiquetas'];
    $latitud = $_POST['latitud'];
    $longitud = $_POST['longitud'];

    $id_usuario = 1;
    $id_mapa = 1;
    $es_principal = isset($_POST['es_principal']) ? 1 : 0;

    $stmt = $conexion->prepare("INSERT INTO marcador (Titulo, Puntuacion ,Descripcion, Latitud, Longitud, Mapa_id, Usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nombre, $puntuacion, $descripcion, $latitud, $longitud, $id_mapa, $id_usuario]);

    $marcadorId = $conexion->lastInsertId();

    $stmtCategoria = $conexion->prepare("INSERT INTO marcador_categoria (Marcador_id, Categoria_id, Es_principal) VALUES (?, ?, ?)");
    $stmtCategoria->execute([$marcadorId, $etiquetas, $es_principal]);

    echo "Marcador agregado exitosamente.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>