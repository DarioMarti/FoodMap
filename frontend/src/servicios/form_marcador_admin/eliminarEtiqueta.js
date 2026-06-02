export const eliminarEtiqueta = (idAEliminar, etiquetasMarcador, setEtiquetasMarcador) => {
    setEtiquetasMarcador(etiquetasMarcador.filter(e => String(e.id) !== String(idAEliminar) && String(e.Categoria_id) !== String(idAEliminar)));
};
