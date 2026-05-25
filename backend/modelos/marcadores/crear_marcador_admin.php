<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';



$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//Comprueba si el usuario esta logueado
requerirLogin();

//Comprueba si el usuario es administrador
requerirAdministrador();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
header("Content-Type: application/json");

try {
    $conn = conectar();
    if (!isset($_SESSION['usuario'])) {
        echo json_encode(['success' => false, 'mensaje' => 'No estás autenticado']);
        exit;
    }

    $nombre = $_POST['nombre'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $puntuacion = $_POST['puntuacion'] ?? 0;
    $latitud = $_POST['latitud'] ?? '';
    $longitud = $_POST['longitud'] ?? '';
    $direccion = $_POST['direccion'] ?? '';

if ($latitud === '' || $longitud === '' || !is_numeric($latitud) || !is_numeric($longitud)) {
    echo json_encode(['success' => false, 'mensaje' => 'Las coordenadas de latitud y longitud son obligatorias y deben ser números válidos.']);
    exit;
}


    $id_usuario = !empty($_POST['usuario_id']) ? $_POST['usuario_id'] : ($_SESSION['usuario']['id'] ?? 1);
    $id_mapa = 1;

    $conn->beginTransaction();

    $sql = "INSERT INTO marcador (Titulo, Descripcion, Puntuacion, Latitud, Longitud, Direccion, Mapa_id, Usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$nombre, $descripcion, $puntuacion, $latitud, $longitud, $direccion, $id_mapa, $id_usuario]);

    $marcadorId = $conn->lastInsertId(); // Pillamos el ID del marcador recién creado

    $etiquetasJson = $_POST['etiquetas'] ?? '[]';
    $etiquetas = json_decode($etiquetasJson, true);

    if (is_array($etiquetas) && count($etiquetas) > 0) {
        $sqlInsert = "INSERT INTO marcador_categoria (Marcador_id, Categoria_id, Es_principal) VALUES (?, ?, ?)";
        $stmtInsert = $conn->prepare($sqlInsert);
        foreach ($etiquetas as $etiqueta) {
            $catId = $etiqueta['id'] ?? $etiqueta['Categoria_id'];
            $esPrin = (!empty($etiqueta['esPrincipal']) || !empty($etiqueta['EsPrincipal'])) ? 1 : 0;
            if ($catId) {
                $stmtInsert->execute([$marcadorId, $catId, $esPrin]);
            }
        }
    }

    $conn->commit();
    echo json_encode(['success' => true, 'mensaje' => 'Marcador creado correctamente']);
} catch (Exception $e) {
    if (isset($conn) && $conn->inTransaction()) {
        $conn->rollBack();
    }
    echo json_encode(['success' => false, 'mensaje' => 'Error al crear marcador']);
}
?>