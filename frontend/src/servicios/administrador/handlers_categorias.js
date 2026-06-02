export const manejarFormularioEditarCategoria = (id, etiquetas, setCategoriaSeleccionada, setFormularioCategoriaActivo) => {
    const categoria = etiquetas.find(c => c.id === id);
    setCategoriaSeleccionada(categoria);
    setFormularioCategoriaActivo(true);
};

export const abrirConfirmacionEliminarCategoria = (id, setIdCategoriaAEliminar, setMostrarConfirmacionEliminarCategoria) => {
    setIdCategoriaAEliminar(id);
    setMostrarConfirmacionEliminarCategoria(true);
};

export const abrirFormularioCrearCategoria = (setCategoriaSeleccionada, setFormularioCategoriaActivo) => {
    setCategoriaSeleccionada(null); // Null significa que es nueva
    setFormularioCategoriaActivo(true);
};
