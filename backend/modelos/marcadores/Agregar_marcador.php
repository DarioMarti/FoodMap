<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/config/conexion.php';

$conexion = conectar();

try {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $puntuacion = $_POST['puntuacion'];
    $latitud = $_POST['latitud'];
    $longitud = $_POST['longitud'];
    $etiquetas = $_POST['etiquetas'];
    $etiquetas_array = json_decode($etiquetas, true);


    $id_usuario = 1;
    $id_mapa = 1;
    $es_principal = isset($_POST['es_principal']) ? 1 : 0;


    //Agregar el marcador
    $stmt = $conexion->prepare("INSERT INTO marcador (Titulo, Puntuacion ,Descripcion, Latitud, Longitud, Mapa_id, Usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nombre, $puntuacion, $descripcion, $latitud, $longitud, $id_mapa, $id_usuario]);

    $marcadorId = $conexion->lastInsertId();


    //Agregar las categorias del marcador
    $stmtCategoria = $conexion->prepare("INSERT INTO marcador_categoria (Marcador_id, Categoria_id, Es_principal) VALUES (?, ?, ?)");
    if (!empty($etiquetas_array)) {
        foreach ($etiquetas_array as $etiqueta) {
            $stmtCategoria->execute([
                $marcadorId,
                $etiqueta['id'],
                $etiqueta['esPrincipal'] ? 1 : 0
            ]);
        }
    }

    //Agregar las fotos del marcador
    if (isset($_FILES['fotos'])) {
        $stmtMultimedia = $conexion->prepare("INSERT INTO multimedia (Url_archivo, Fecha_subida, Marcador_id) VALUES (?, NOW(), ?)");

        foreach ($_FILES['fotos']['tmp_name'] as $key => $tmp_name) {
            if ($_FILES['fotos']['error'][$key] === UPLOAD_ERR_OK) {
                $nombre_foto = time() . "_" . $_FILES['fotos']['name'][$key];
                $ruta_destino = $_SERVER['DOCUMENT_ROOT'] . '/foodmap/backend/uploads/img/' . $nombre_foto;

                if (move_uploaded_file($tmp_name, $ruta_destino)) {
                    $stmtMultimedia->execute([$nombre_foto, $marcadorId]);
                }
            }
        }
    }



    echo "Marcador agregado exitosamente.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>