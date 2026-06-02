export const handleEnviar = (contenido, setMensajes, setCargando, socket) => {
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMensajes(prev => [...prev, {
        texto: contenido,
        isMe: true,
        isBot: false,
        hora: horaActual
    }]);

    setCargando(true);
    socket.emit('pregunta_asistente', {
        mensaje: contenido,
        historial: []
    });
};
