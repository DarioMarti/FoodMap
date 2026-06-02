<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

// Cabeceras CORS
$origin = $_SERVER["HTTP_ORIGIN"] ?? "http://localhost:5173"; header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

//Comprueba si el usuario esta logueado
requerirLogin();

try {
    $conn = conectar();
    $usuarioId = $_SESSION['usuario']['id'];
    $contrasena_actual = $_POST['contrasena_actual'] ?? '';
    $contrasena_nueva = $_POST['contrasena_nueva'] ?? '';

    // Comprobaciones de los campos recibidos
    if (empty($contrasena_actual) || empty($contrasena_nueva)) {
        echo json_encode(["ok" => false, "error" => "Debes rellenar todos los campos de contraseña."]);
        exit;
    }

    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $contrasena_nueva)) {
        echo json_encode(["ok" => false, "error" => "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."]);
        exit;
    }

    // Obtiene de forma segura la contraseña actual cifrada de la base de datos
    $sql = "SELECT Contrasena FROM usuario WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$usuarioId]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode(["ok" => false, "error" => "Usuario no encontrado."]);
        exit;
    }

    // Comprueba que la contraseña actual escrita coincida con el hash de la base de datos
    if (!password_verify($contrasena_actual, $usuario['Contrasena'])) {
        echo json_encode(["ok" => false, "error" => "La contraseña actual introducida no es correcta."]);
        exit;
    }

    // Encripta la nueva contraseña
    $hash_nueva = password_hash($contrasena_nueva, PASSWORD_DEFAULT);

    // Actualiza la nueva contraseña en la base de datos
    $sql_update = "UPDATE usuario SET Contrasena = ? WHERE id = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->execute([$hash_nueva, $usuarioId]);

    echo json_encode(["ok" => true, "mensaje" => "Contraseña actualizada correctamente."]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => "Error del servidor: " . $e->getMessage()]);
}
?>
