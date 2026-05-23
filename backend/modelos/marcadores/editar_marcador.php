<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/privacidad.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//Comprueba si el usuario esta logueado
requerirLogin();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
header("Content-Type: application/json");

try {
    $conn = conectar();
    if (!isset($_SESSION['usuario']['id'])) {
        echo json_encode(['success' => false, 'mensaje' => 'No estás autenticado']);
        exit;
    }

    $usuario_id = $_SESSION['usuario']['id'];
    $id = $_POST['id'] ?? null;
    $nombre = $_POST['nombre'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $puntuacion = $_POST['puntuacion'] ?? '';
    $latitud = $_POST['latitud'] ?? '';
    $longitud = $_POST['longitud'] ?? '';

    if (!$id || $latitud === '' || $longitud === '' || !is_numeric($latitud) || !is_numeric($longitud)) {
        echo json_encode(['success' => false, 'mensaje' => 'Faltan datos requeridos']);
        exit;
    }

    // Verificar que el marcador pertenece al usuario actual
    $sqlCheck = "SELECT id FROM marcador WHERE id = ? AND Usuario_id = ?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->execute([$id, $usuario_id]);
    if ($stmtCheck->rowCount() === 0) {
        echo json_encode(['success' => false, 'mensaje' => 'No tienes permiso para editar este marcador o no existe']);
        exit;
    }

    $conn->beginTransaction();

    $sql = "UPDATE marcador SET Titulo = ?, Descripcion = ?, Puntuacion = ?, Latitud = ?, Longitud = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$nombre, $descripcion, $puntuacion, $latitud, $longitud, $id]);

    $etiquetasJson = $_POST['etiquetas'] ?? '[]';
    $etiquetas = json_decode($etiquetasJson, true);

    if (is_array($etiquetas)) {
        $sqlDelete = "DELETE FROM marcador_categoria WHERE Marcador_id = ?";
        $stmtDelete = $conn->prepare($sqlDelete);
        $stmtDelete->execute([$id]);

        if (count($etiquetas) > 0) {
            $sqlInsert = "INSERT INTO marcador_categoria (Marcador_id, Categoria_id, Es_principal) VALUES (?, ?, ?)";
            $stmtInsert = $conn->prepare($sqlInsert);

            foreach ($etiquetas as $etiqueta) {
                $catId = $etiqueta['id'] ?? $etiqueta['Categoria_id'];
                $esPrin = (!empty($etiqueta['esPrincipal']) || !empty($etiqueta['EsPrincipal'])) ? 1 : 0;

                if ($catId) {
                    $stmtInsert->execute([$id, $catId, $esPrin]);
                }
            }
        }
    }

    // Procesar fotos existentes
    $fotosExistentesJson = $_POST['fotosExistentes'] ?? '[]';
    $fotosExistentes = json_decode($fotosExistentesJson, true);
    
    // Obtener fotos actuales en DB
    $sqlFotos = "SELECT id, Url_archivo FROM multimedia WHERE Marcador_id = ?";
    $stmtFotos = $conn->prepare($sqlFotos);
    $stmtFotos->execute([$id]);
    $fotosDB = $stmtFotos->fetchAll(PDO::FETCH_ASSOC);
    
    // Eliminar fotos que ya no están en fotosExistentes
    $sqlDeleteFoto = "DELETE FROM multimedia WHERE id = ?";
    $stmtDeleteFoto = $conn->prepare($sqlDeleteFoto);
    foreach ($fotosDB as $fotoDB) {
        if (!in_array($fotoDB['Url_archivo'], $fotosExistentes)) {
            // Borrar el archivo físico
            $ruta_archivo = $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/uploads/img/' . $fotoDB['Url_archivo'];
            if (file_exists($ruta_archivo) && !is_dir($ruta_archivo)) {
                unlink($ruta_archivo);
            }
            $stmtDeleteFoto->execute([$fotoDB['id']]);
        }
    }
    
    // Insertar nuevas fotos
    if (isset($_FILES['fotos'])) {
        $stmtMultimedia = $conn->prepare("INSERT INTO multimedia (Url_archivo, Fecha_subida, Marcador_id) VALUES (?, NOW(), ?)");

        foreach ($_FILES['fotos']['tmp_name'] as $key => $tmp_name) {
            if ($_FILES['fotos']['error'][$key] === UPLOAD_ERR_OK) {
                $nombre_foto = time() . "_" . $_FILES['fotos']['name'][$key];
                $ruta_destino = $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/uploads/img/' . $nombre_foto;

                if (move_uploaded_file($tmp_name, $ruta_destino)) {
                    $stmtMultimedia->execute([$nombre_foto, $id]);
                }
            }
        }
    }

    $conn->commit();
    echo json_encode(['success' => true, 'mensaje' => 'Marcador actualizado correctamente']);
} catch (Exception $e) {
    if (isset($conn) && $conn->inTransaction()) {
        $conn->rollBack();
    }
    echo json_encode(['success' => false, 'mensaje' => 'Error al editar marcador: ' . $e->getMessage()]);
}
?>
