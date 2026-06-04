<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
session_start();

$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION['usuario'])) {
    try {
        $conn = conectar();
        $id = $_SESSION['usuario']['id'] ?? null;
        
        // Parche para sesiones activas que no tienen el id guardado correctamente
        if (!$id && !empty($_SESSION['usuario']['email'])) {
            $stmtUser = $conn->prepare("SELECT * FROM usuario WHERE Email = ?");
            $stmtUser->execute([$_SESSION['usuario']['email']]);
            $u = $stmtUser->fetch(PDO::FETCH_ASSOC);
            if ($u) {
                foreach ($u as $key => $value) {
                    if (strtolower($key) === 'id' || strtolower($key) === 'id_usuario') {
                        $id = $value;
                        break;
                    }
                }
                $_SESSION['usuario']['id'] = $id;
            }
        }
        
        $sqlAmigos = "SELECT COUNT(DISTINCT CASE WHEN Usuario_solicita_id = ? THEN Usuario_receptor_id ELSE Usuario_solicita_id END) as total FROM amistades WHERE (Usuario_solicita_id = ? OR Usuario_receptor_id = ?) AND Estado = 'aceptado'";
        $stmtAmigos = $conn->prepare($sqlAmigos);
        $stmtAmigos->execute([$id, $id, $id]);
        $_SESSION['usuario']['total_amigos'] = $stmtAmigos->fetch(PDO::FETCH_ASSOC)['total'];

        $sqlMarcadores = "SELECT COUNT(*) as total FROM marcador WHERE Usuario_id = ?";
        $stmtMarcadores = $conn->prepare($sqlMarcadores);
        $stmtMarcadores->execute([$id]);
        $_SESSION['usuario']['total_marcadores'] = $stmtMarcadores->fetch(PDO::FETCH_ASSOC)['total'];
    } catch(Exception $e) {
        error_log("Error in obtener_sesion: " . $e->getMessage() . "\n", 3, $_SERVER['DOCUMENT_ROOT'] . "/foodmap/error_log.txt");
    }

    echo json_encode([
        "logged" => true,
        "usuario" => $_SESSION['usuario']
    ]);
} else {
    echo json_encode([
        "logged" => false,
        "error" => "Sesión no iniciada"
    ]);
}
?>