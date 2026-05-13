<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $nombre = $_POST['nombre'] ?? "";

    $conn = conectar();

    if (!isset($nombre) || $nombre == "") {
        echo json_encode([]);
        exit;
    }

    $sql = "SELECT * FROM usuario WHERE nombre LIKE ?";
    $stamt = $conn->prepare($sql);
    $stamt->execute(['%' . $nombre . '%']);

    $result = $stamt->fetchAll(PDO::FETCH_ASSOC);

    if (count($result) > 0) {
        $usuarios = [];
        foreach ($result as $fila) {
            $usuarios[] = $fila;
        }
        echo json_encode($usuarios);
    } else {
        echo json_encode([]);
    }

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $e->getMessage()]);
}