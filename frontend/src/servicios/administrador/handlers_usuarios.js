export const abrirConfirmacionEliminar = (id, usuarios, setUsuarioSeleccionado, setMostrarConfirmacionEliminar) => {
    const usuario = usuarios.find(u => u.id === id);
    setUsuarioSeleccionado(usuario);
    setMostrarConfirmacionEliminar(true);
};

export const manejarFormularioEditar = (id, usuariosFiltrados, setUsuarioSeleccionado, setFormularioEditarActivo, formularioEditarActivo) => {
    const usuario = usuariosFiltrados.find(u => u.id === id);
    setUsuarioSeleccionado(usuario);
    setFormularioEditarActivo(!formularioEditarActivo);
};

export const abrirFormularioCrearUsuario = (setUsuarioSeleccionado, setFormularioEditarActivo) => {
    setUsuarioSeleccionado(null);
    setFormularioEditarActivo(true);
};
