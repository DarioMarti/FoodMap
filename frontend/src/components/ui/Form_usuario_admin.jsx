import { useState, useEffect } from "react";
import { actualizarUsuario, crearUsuarioAdmin } from "../../servicios/administrador/crud_admin";

export default function Form_usuario_admin({ usuarioSeleccionado, setFormularioEditarActivo, className, mostrarNotificacion, recargarTabla }) {
    const [nombre, setNombre] = useState(usuarioSeleccionado?.Nombre || "");
    const [email, setEmail] = useState(usuarioSeleccionado?.Email || "");
    const [ciudad, setCiudad] = useState(usuarioSeleccionado?.Ciudad || "");
    const [rol, setRol] = useState(usuarioSeleccionado?.Rol || "user");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setNombre(usuarioSeleccionado?.Nombre || "");
        setEmail(usuarioSeleccionado?.Email || "");
        setCiudad(usuarioSeleccionado?.Ciudad || "");
        setRol(usuarioSeleccionado?.Rol || "user");
        setPassword("");
    }, [usuarioSeleccionado]);

    const manejarGuardar = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let respuesta;

        if (usuarioSeleccionado?.id) {
            respuesta = await actualizarUsuario(data);
        } else {
            respuesta = await crearUsuarioAdmin(data);
        }

        if (respuesta?.success) {
            setFormularioEditarActivo(false);
            mostrarNotificacion(respuesta.mensaje, "success");
            recargarTabla();
            window.dispatchEvent(new Event("actualizar_sesion"));
        } else {
            mostrarNotificacion(respuesta.mensaje, "error");
        }
    };

    return (
        <form onSubmit={manejarGuardar} className={` w-220 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white dark:bg-dark-tarjeta border border-borde dark:border-text-tertiary/30 shadow-2xl rounded-2xl p-10 ${className}`}>
            <input type="hidden" name="id" value={usuarioSeleccionado?.id || ""} />

            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Foto de Perfil</label>
                    <input
                        type="file"
                        name="foto_perfil"
                        accept="image/*"
                        className="w-full mt-4 px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Nombre</label>
                    <input type="text" required placeholder="Ej: Javier Cristobal Martinez" value={nombre} name="nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full mt-4 px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                    />
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Email</label>
                    <input type="email" required={!usuarioSeleccionado?.id} disabled={usuarioSeleccionado?.id} placeholder="ejemplo@email.com" value={email} name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-4 px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm disabled:opacity-50"
                    />
                    {usuarioSeleccionado?.id && <span className="text-xs text-text-tertiary">El email no se puede editar.</span>}
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Ingrese la contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-4  px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Rol</label>
                    <select
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        name="rol"
                        className="w-full mt-4  px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm font-semibold"
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Ciudad</label>
                    <input
                        type="text"
                        name="ciudad"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        className="w-full mt-4  px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                    />
                </div>
            </div>
            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={() => setFormularioEditarActivo(false)}
                    className="flex-1 py-4 bg-text-tertiary/10 rounded-2xl font-bold hover:bg-text-tertiary/20 active:scale-[0.98] transition-all cursor-pointer text-sm"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/30 active:scale-[0.98] transition-all cursor-pointer text-sm"
                >
                    Guardar
                </button>
            </div>
        </form >
    );
}
