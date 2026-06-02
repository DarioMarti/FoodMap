import { editarMarcador, agregarMarcador, obtenerMarcadores } from './marcador_servicio';

export const manejarEnvio = async (
    e, isEditando, etiquetasMarcador, etiquetas, mostrarNotificacion, lugarSeleccionado,
    fotosMarcador, fotos, posicionClick, setEtiquetas, setFotos, setFotosMarcador,
    setFormularioActivo, setFormularioEditarActivo, setLugarSeleccionado, setPuntuacion,
    setPosicionClick, setMarcadores, nombreBusqueda
) => {
    e.preventDefault();
    const listaEtiquetasActual = isEditando ? etiquetasMarcador : etiquetas;
    const tienePrincipal = listaEtiquetasActual.some(e => e.esPrincipal || e.EsPrincipal);
    if (!tienePrincipal) {
        mostrarNotificacion("Debes asignar al menos una etiqueta como principal.", "error");
        return;
    }
    const formData = new FormData(e.target);
    if (isEditando) {
        formData.append('id', lugarSeleccionado.id);
        formData.append('etiquetas', JSON.stringify(etiquetasMarcador));
        const fotosExistentes = [];
        fotosMarcador.forEach((foto) => {
            if (foto instanceof File) {
                formData.append('fotos[]', foto);
            } else if (foto.Url_archivo) {
                fotosExistentes.push(foto.Url_archivo);
            }
        });
        formData.append('fotosExistentes', JSON.stringify(fotosExistentes));
    } else {
        formData.append('etiquetas', JSON.stringify(etiquetas));
        fotos.forEach((foto) => {
            formData.append('fotos[]', foto);
        });
    }

    if (!isEditando && !posicionClick) {
        mostrarNotificacion("Debes hacer clic en el mapa para ubicar el marcador.", "error");
        return;
    }

    try {
        if (isEditando) {
            const resultado = await editarMarcador(formData);
            mostrarNotificacion(resultado.mensaje || "¡Marcador editado con éxito!", "success");
        } else {
            const resultado = await agregarMarcador(formData);
            mostrarNotificacion("¡Marcador guardado con éxito!", "success");
        }
        e.target.reset();
        setEtiquetas([]);
        setFotos([]);
        setFotosMarcador([]);
        setFormularioActivo(false);
        setFormularioEditarActivo(false);
        setLugarSeleccionado(null);
        setPuntuacion(0);
        setPosicionClick(null);
    } catch (error) {
        mostrarNotificacion("Error al guardar el marcador", "error");
    }
    obtenerMarcadores(setMarcadores, nombreBusqueda);
};
