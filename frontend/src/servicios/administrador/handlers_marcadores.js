export const manejarFormularioEditarMarcador = (id, marcadores, setMarcadorSeleccionado, setFormularioMarcadorActivo) => {
    const marcador = marcadores.find(m => m.id === id);
    setMarcadorSeleccionado(marcador);
    setFormularioMarcadorActivo(true);
};

export const abrirConfirmacionEliminarMarcador = (id, setIdMarcadorAEliminar, setMostrarConfirmacionEliminarMarcador) => {
    setIdMarcadorAEliminar(id);
    setMostrarConfirmacionEliminarMarcador(true);
};

export const abrirFormularioCrearMarcador = (setMarcadorSeleccionado, setFormularioMarcadorActivo) => {
    setMarcadorSeleccionado(null);
    setFormularioMarcadorActivo(true);
};
