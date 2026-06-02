export const manejarRespuesta = (data, setCargando, setMensajes) => {
    setCargando(false);

    const fechaValida = data.fecha ? new Date(data.fecha) : new Date();
    const horaFormateada = isNaN(fechaValida.getTime())
        ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : fechaValida.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMensajes(prev => [...prev, {
        texto: data.texto,
        isBot: true,
        isMe: false,
        hora: horaFormateada
    }]);
};
