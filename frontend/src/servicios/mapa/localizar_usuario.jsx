export function LocalizacionUsuario(setUsuarioUbicacion) {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            setUsuarioUbicacion([latitude, longitude]);
        },
        (error) => {
            console.error("Error obteniendo ubicación:", error);
            setUsuarioUbicacion([20.6736, -103.3477]);
        }
    );
}
