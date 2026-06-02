export const alElegirFoto = (e, fotos, setFotos) => {
    const nuevosArchivos = Array.from(e.target.files);
    setFotos([...fotos, ...nuevosArchivos]);
};

export const alEliminarFoto = (indexAEliminar, setFotos) => {
    setFotos(prev => prev.filter((_, index) => index !== indexAEliminar));
};

export const alElegirFotoEditar = (e, fotosMarcador, setFotosMarcador) => {
    const nuevosArchivos = Array.from(e.target.files);
    setFotosMarcador([...fotosMarcador, ...nuevosArchivos]);
};

export const alEliminarFotoEditar = (indexAEliminar, setFotosMarcador) => {
    setFotosMarcador(prev => prev.filter((_, index) => index !== indexAEliminar));
};
