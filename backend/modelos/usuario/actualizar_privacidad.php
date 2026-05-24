<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//Comprueba si el usuario esta logueado
requerirLogin();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

header("Content-Type: application/json");

try {
    $conn = conectar();

    if (!isset($_SESSION['usuario'])) {
        echo json_encode(['success' => false, 'message' => 'No estás autenticado']);
        exit;
    }

    $usuarioId = $_SESSION['usuario']['id'];
    
    $perfil_publico = null;
    if (isset($_POST['perfil_publico'])) {
        $perfil_publico = (int)$_POST['perfil_publico'];
    } else {
        $json = file_get_contents('php://input');
        if (!empty($json)) {
            $data = json_decode($json, true);
            if (isset($data['perfil_publico'])) {
                $perfil_publico = (int)$data['perfil_publico'];
            }
        }
    }
    if ($perfil_publico === null) {
        echo json_encode(['success' => false, 'message' => 'Parámetros incompletos']);
        exit;
    }

    $sql = "UPDATE usuario SET Perfil_publico = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$perfil_publico, $usuarioId]);

    $_SESSION['usuario']['perfil_publico'] = $perfil_publico;

    echo json_encode(['usuario' => $_SESSION['usuario'], 'success' => true, 'message' => 'Privacidad actualizada correctamente']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar la privacidad: ' . $e->getMessage()]);
}
?>
