export const agregarEtiqueta = (esPrincipal, etiquetasMarcador, categoriasBD, etiquetaSeleccionada, setEtiquetasMarcador, setEsPrincipal, mostrarNotificacion) => {
    if (esPrincipal && etiquetasMarcador.some(e => e.esPrincipal === true || e.EsPrincipal == 1)) {
        mostrarNotificacion("Ya existe una etiqueta principal para este marcador.", "error");
        return;
    }
    const categoria = categoriasBD?.find(c => String(c.id) === String(etiquetaSeleccionada.id));
    if (categoria) {
        if (etiquetasMarcador.some(e => String(e.id) === String(categoria.id) || String(e.Categoria_id) === String(categoria.id))) {
            mostrarNotificacion("Esta etiqueta ya está añadida.", "error");
            return;
        }
        const nuevaEtiqueta = {
            id: categoria.id,
            Nombre: categoria.Nombre,
            esPrincipal: esPrincipal,
            Color: categoria.Color,
            Icono: categoria.Icono
        };
        setEtiquetasMarcador([...etiquetasMarcador, nuevaEtiqueta]);
        setEsPrincipal(false);
    }
};
