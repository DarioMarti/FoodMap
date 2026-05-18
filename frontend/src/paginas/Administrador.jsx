import React, { useState } from 'react';
import { 
    Users, 
    MapPin, 
    Search, 
    Plus, 
    Trash2, 
    Edit, 
    Check, 
    Star, 
    Shield, 
    X, 
    AlertCircle,
    UserCheck,
    BookmarkCheck
} from 'lucide-react';

export default function Administrador() {
    // ---- ESTADOS CRUD MOCK ----
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: "Alberto Martín", nick: "Alex_martin", email: "usuario@gmail.com", ciudad: "Madrid, España", rol: "Administrador", activo: true },
        { id: 2, nombre: "Sofía Rodríguez", nick: "sofia_gourmet", email: "sofia@foodmap.com", ciudad: "Barcelona, España", rol: "Usuario", activo: true },
        { id: 3, nombre: "Carlos Gómez", nick: "charli_chef", email: "carlos@gmail.com", ciudad: "Valencia, España", rol: "Moderador", activo: false },
        { id: 4, nombre: "Lucía Fernández", nick: "lu_foodie", email: "lucia@outlook.com", ciudad: "Sevilla, España", rol: "Usuario", activo: true }
    ]);

    const [marcadores, setMarcadores] = useState([
        { id: 1, nombre: "La Pizzería Di Carlo", categoria: "Italiana", direccion: "Gran Vía 45, Madrid", valoracion: 4.8, creador: "Alex_martin" },
        { id: 2, nombre: "Burgers & Beers", categoria: "Americana", direccion: "Diagonal 120, Barcelona", valoracion: 4.5, creador: "sofia_gourmet" },
        { id: 3, nombre: "Sushi Master", categoria: "Asiática", direccion: "Calle Colón 12, Valencia", valoracion: 4.9, creador: "charli_chef" }
    ]);

    // ---- ESTADOS DE INTERFAZ ----
    const [pestanaActiva, setPestanaActiva] = useState("usuarios"); // "usuarios" | "marcadores"
    const [busqueda, setBusqueda] = useState("");
    const [notificacion, setNotificacion] = useState(null); // { tipo: 'success'|'error', mensaje: '' }

    // ---- ESTADOS DE MODALES ----
    const [modalAbierto, setModalAbierto] = useState(false); // true/false
    const [tipoModal, setTipoModal] = useState("usuario"); // "usuario" | "marcador"
    const [elementoEditando, setElementoEditando] = useState(null); // null para nuevo, objeto para editar

    // ---- ESTADOS FORMULARIOS ----
    const [formUsuario, setFormUsuario] = useState({ nombre: "", nick: "", email: "", ciudad: "", rol: "Usuario", activo: true });
    const [formMarcador, setFormMarcador] = useState({ nombre: "", categoria: "Italiana", direccion: "", valoracion: 5.0, creador: "" });

    // ---- FUNCIONES AUXILIARES ----
    const mostrarNotificacion = (tipo, mensaje) => {
        setNotificacion({ tipo, mensaje });
        setTimeout(() => setNotificacion(null), 4000);
    };

    // ---- OPERACIONES CRUD - USUARIOS ----
    const guardarUsuario = (e) => {
        e.preventDefault();
        if (elementoEditando) {
            // Editar
            setUsuarios(usuarios.map(u => u.id === elementoEditando.id ? { ...u, ...formUsuario } : u));
            mostrarNotificacion("success", `Usuario "${formUsuario.nombre}" actualizado correctamente.`);
        } else {
            // Crear nuevo
            const nuevoUsuario = {
                id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
                ...formUsuario
            };
            setUsuarios([...usuarios, nuevoUsuario]);
            mostrarNotificacion("success", `Usuario "${formUsuario.nombre}" creado exitosamente.`);
        }
        cerrarModal();
    };

    const eliminarUsuario = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${nombre}"?`)) {
            setUsuarios(usuarios.filter(u => u.id !== id));
            mostrarNotificacion("success", `Usuario "${nombre}" eliminado.`);
        }
    };

    // ---- OPERACIONES CRUD - MARCADORES ----
    const guardarMarcador = (e) => {
        e.preventDefault();
        if (elementoEditando) {
            // Editar
            setMarcadores(marcadores.map(m => m.id === elementoEditando.id ? { ...m, ...formMarcador } : m));
            mostrarNotificacion("success", `Marcador "${formMarcador.nombre}" actualizado correctamente.`);
        } else {
            // Crear nuevo
            const nuevoMarcador = {
                id: marcadores.length > 0 ? Math.max(...marcadores.map(m => m.id)) + 1 : 1,
                ...formMarcador
            };
            setMarcadores([...marcadores, nuevoMarcador]);
            mostrarNotificacion("success", `Marcador "${formMarcador.nombre}" creado exitosamente.`);
        }
        cerrarModal();
    };

    const eliminarMarcador = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el marcador "${nombre}"?`)) {
            setMarcadores(marcadores.filter(m => m.id !== id));
            mostrarNotificacion("success", `Marcador "${nombre}" eliminado.`);
        }
    };

    // ---- GESTIÓN DE MODALES ----
    const abrirModalNuevo = (tipo) => {
        setTipoModal(tipo);
        setElementoEditando(null);
        if (tipo === "usuario") {
            setFormUsuario({ nombre: "", nick: "", email: "", ciudad: "", rol: "Usuario", activo: true });
        } else {
            setFormMarcador({ nombre: "", categoria: "Italiana", direccion: "", valoracion: 5.0, creador: "Admin" });
        }
        setModalAbierto(true);
    };

    const abrirModalEditar = (tipo, elemento) => {
        setTipoModal(tipo);
        setElementoEditando(elemento);
        if (tipo === "usuario") {
            setFormUsuario({ ...elemento });
        } else {
            setFormMarcador({ ...elemento });
        }
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setElementoEditando(null);
    };

    // ---- FILTRADOS DE BÚSQUEDA ----
    const usuariosFiltrados = usuarios.filter(u => 
        u.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        u.nick.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.ciudad.toLowerCase().includes(busqueda.toLowerCase())
    );

    const marcadoresFiltrados = marcadores.filter(m => 
        m.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        m.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
        m.direccion.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col overflow-hidden bg-background dark:bg-text-main text-text-main dark:text-white font-['Outfit'] relative">
            
            {/* ---- CABECERA ---- */}
            <header className="border-b-3 border-borde dark:border-borde-dark py-6 px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0 bg-white dark:bg-dark-tarjeta/30">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                        <Shield className="text-primary size-8 animate-pulse" />
                        Panel de Administración
                    </h1>
                    <p className="text-text-tertiary text-sm mt-1">Gestiona los usuarios, marcadores y configuraciones críticas de FoodMap.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => abrirModalNuevo(pestanaActiva === "usuarios" ? "usuario" : "marcador")}
                        className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                    >
                        <Plus size={20} />
                        {pestanaActiva === "usuarios" ? "Añadir Usuario" : "Añadir Marcador"}
                    </button>
                </div>
            </header>

            {/* ---- CONTENIDO PRINCIPAL ---- */}
            <main className="p-8 md:p-10 flex-1 overflow-y-auto space-y-8">

                {/* ---- NOTIFICACIÓN FLOTANTE ---- */}
                {notificacion && (
                    <div className={`fixed top-6 right-6 z-[6000] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-10 duration-300 ${
                        notificacion.tipo === "success" 
                            ? "bg-emerald-50 text-emerald-800 border-2 border-emerald-500/30 dark:bg-emerald-950 dark:text-emerald-200" 
                            : "bg-rose-50 text-rose-800 border-2 border-rose-500/30 dark:bg-rose-950 dark:text-rose-200"
                    }`}>
                        {notificacion.tipo === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
                        <span className="font-semibold text-sm">{notificacion.mensaje}</span>
                        <button onClick={() => setNotificacion(null)} className="ml-2 hover:opacity-60 cursor-pointer">
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* ---- METRICAS / ESTADÍSTICAS ---- */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Tarjeta 1 */}
                    <div className="p-6 bg-white dark:bg-dark-tarjeta border border-borde dark:border-white/5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-5 group">
                        <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                            <Users size={28} />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-text-tertiary tracking-wider">Total Usuarios</p>
                            <h3 className="text-3xl font-extrabold mt-1">{usuarios.length}</h3>
                        </div>
                    </div>
                    {/* Tarjeta 2 */}
                    <div className="p-6 bg-white dark:bg-dark-tarjeta border border-borde dark:border-white/5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-5 group">
                        <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
                            <MapPin size={28} />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-text-tertiary tracking-wider">Marcadores creados</p>
                            <h3 className="text-3xl font-extrabold mt-1">{marcadores.length}</h3>
                        </div>
                    </div>
                    {/* Tarjeta 3 */}
                    <div className="p-6 bg-white dark:bg-dark-tarjeta border border-borde dark:border-white/5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-5 group">
                        <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                            <UserCheck size={28} />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-text-tertiary tracking-wider">Usuarios Activos</p>
                            <h3 className="text-3xl font-extrabold mt-1">{usuarios.filter(u => u.activo).length}</h3>
                        </div>
                    </div>
                    {/* Tarjeta 4 */}
                    <div className="p-6 bg-white dark:bg-dark-tarjeta border border-borde dark:border-white/5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-5 group">
                        <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">
                            <BookmarkCheck size={28} />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-text-tertiary tracking-wider">Media Valoraciones</p>
                            <h3 className="text-3xl font-extrabold mt-1 flex items-center gap-1.5">
                                {(marcadores.reduce((acc, curr) => acc + curr.valoracion, 0) / (marcadores.length || 1)).toFixed(1)}
                                <Star size={20} className="fill-amber-500 text-amber-500" />
                            </h3>
                        </div>
                    </div>
                </section>

                {/* ---- FILTRO DE SECCIÓN Y BÚSQUEDA ---- */}
                <section className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-dark-tarjeta p-4 rounded-[2rem] border border-borde dark:border-white/5 shadow-sm">
                    {/* Selector de Pestañas */}
                    <div className="flex bg-background dark:bg-background-oscuro p-1.5 rounded-2xl w-full sm:w-auto">
                        <button 
                            onClick={() => { setPestanaActiva("usuarios"); setBusqueda(""); }}
                            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                pestanaActiva === "usuarios" 
                                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                                    : "text-text-tertiary hover:text-text-main dark:hover:text-white"
                            }`}
                        >
                            <Users size={18} />
                            Usuarios
                        </button>
                        <button 
                            onClick={() => { setPestanaActiva("marcadores"); setBusqueda(""); }}
                            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                pestanaActiva === "marcadores" 
                                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                                    : "text-text-tertiary hover:text-text-main dark:hover:text-white"
                            }`}
                        >
                            <MapPin size={18} />
                            Marcadores
                        </button>
                    </div>

                    {/* Barra de Búsqueda */}
                    <div className="relative w-full sm:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder={pestanaActiva === "usuarios" ? "Buscar por nombre, nick, email..." : "Buscar por restaurante, categoría..."}
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full bg-background dark:bg-background-oscuro text-text-main dark:text-white pl-12 pr-5 py-3 rounded-2xl border-2 border-transparent focus:border-primary focus:outline-none transition-all"
                        />
                    </div>
                </section>

                {/* ---- TABLAS CRUD ---- */}
                <section className="bg-white dark:bg-dark-tarjeta border border-borde dark:border-white/5 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto w-full">
                        {pestanaActiva === "usuarios" ? (
                            /* TABLA DE USUARIOS */
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-background dark:bg-background-oscuro text-text-tertiary text-xs uppercase font-bold tracking-wider border-b border-borde dark:border-white/5">
                                        <th className="py-5 px-6">ID</th>
                                        <th className="py-5 px-6">Usuario</th>
                                        <th className="py-5 px-6">Email</th>
                                        <th className="py-5 px-6">Ciudad</th>
                                        <th className="py-5 px-6">Rol</th>
                                        <th className="py-5 px-6">Estado</th>
                                        <th className="py-5 px-6 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-borde dark:divide-white/5">
                                    {usuariosFiltrados.length > 0 ? (
                                        usuariosFiltrados.map((u) => (
                                            <tr key={u.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
                                                <td className="py-4 px-6 font-semibold opacity-70">#{u.id}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-sm uppercase">
                                                            {u.nombre.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <strong className="block text-sm dark:text-white text-text-main">{u.nombre}</strong>
                                                            <span className="text-xs text-text-tertiary">@{u.nick}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm">{u.email}</td>
                                                <td className="py-4 px-6 text-sm">{u.ciudad}</td>
                                                <td className="py-4 px-6">
                                                    <span className={`text-xs px-3 py-1 rounded-full font-bold inline-block ${
                                                        u.rol === "Administrador" 
                                                            ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" 
                                                            : u.rol === "Moderador" 
                                                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                                                            : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                                    }`}>
                                                        {u.rol}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${u.activo ? "text-emerald-500" : "text-text-tertiary"}`}>
                                                        <span className={`size-2 rounded-full ${u.activo ? "bg-emerald-500 animate-pulse" : "bg-text-tertiary"}`}></span>
                                                        {u.activo ? "Activo" : "Inactivo"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button 
                                                            onClick={() => abrirModalEditar("usuario", u)}
                                                            className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl text-text-tertiary transition-colors cursor-pointer"
                                                            title="Editar Usuario"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => eliminarUsuario(u.id, u.nombre)}
                                                            className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl text-text-tertiary transition-colors cursor-pointer"
                                                            title="Eliminar Usuario"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="py-8 text-center text-text-tertiary text-sm">No se encontraron usuarios que coincidan con la búsqueda.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            /* TABLA DE MARCADORES */
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-background dark:bg-background-oscuro text-text-tertiary text-xs uppercase font-bold tracking-wider border-b border-borde dark:border-white/5">
                                        <th className="py-5 px-6">ID</th>
                                        <th className="py-5 px-6">Restaurante</th>
                                        <th className="py-5 px-6">Categoría</th>
                                        <th className="py-5 px-6">Dirección</th>
                                        <th className="py-5 px-6">Valoración</th>
                                        <th className="py-5 px-6">Creador</th>
                                        <th className="py-5 px-6 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-borde dark:divide-white/5">
                                    {marcadoresFiltrados.length > 0 ? (
                                        marcadoresFiltrados.map((m) => (
                                            <tr key={m.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
                                                <td className="py-4 px-6 font-semibold opacity-70">#{m.id}</td>
                                                <td className="py-4 px-6">
                                                    <strong className="block text-sm dark:text-white text-text-main">{m.nombre}</strong>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`text-xs px-3 py-1 rounded-full font-bold inline-block ${
                                                        m.categoria === "Italiana" 
                                                            ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" 
                                                            : m.categoria === "Americana" 
                                                            ? "bg-red-500/10 text-red-500 border border-red-500/20" 
                                                            : "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                                                    }`}>
                                                        {m.categoria}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm">{m.direccion}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-1.5 text-sm font-bold text-amber-500">
                                                        <span>{m.valoracion}</span>
                                                        <Star size={16} className="fill-amber-500" />
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-text-tertiary">@{m.creador}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button 
                                                            onClick={() => abrirModalEditar("marcador", m)}
                                                            className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl text-text-tertiary transition-colors cursor-pointer"
                                                            title="Editar Marcador"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => eliminarMarcador(m.id, m.nombre)}
                                                            className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl text-text-tertiary transition-colors cursor-pointer"
                                                            title="Eliminar Marcador"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="py-8 text-center text-text-tertiary text-sm">No se encontraron marcadores que coincidan con la búsqueda.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            </main>

            {/* ---- MODALES DE CREACIÓN Y EDICIÓN ---- */}
            {modalAbierto && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={cerrarModal}
                    ></div>

                    {/* Contenedor Modal */}
                    <div className="relative w-full max-w-xl bg-white dark:bg-background-oscuro p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-borde dark:border-white/10 animate-in zoom-in-95 duration-300 text-text-main dark:text-white">
                        
                        {/* Botón cerrar */}
                        <button 
                            onClick={cerrarModal}
                            className="absolute top-8 right-8 text-text-tertiary hover:text-text-main dark:hover:text-primary transition-colors cursor-pointer"
                        >
                            <X size={28} />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold mb-2">
                                {elementoEditando ? `Editar ${tipoModal === "usuario" ? "Usuario" : "Marcador"}` : `Añadir ${tipoModal === "usuario" ? "Usuario" : "Marcador"}`}
                            </h2>
                            <p className="text-text-tertiary text-sm">Completa la información del formulario para realizar la acción.</p>
                        </div>

                        {tipoModal === "usuario" ? (
                            /* FORMULARIO DE USUARIO */
                            <form onSubmit={guardarUsuario} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Nombre Completo</label>
                                    <input 
                                        type="text"
                                        required
                                        placeholder="Ej: Alberto Martín"
                                        value={formUsuario.nombre}
                                        onChange={(e) => setFormUsuario({ ...formUsuario, nombre: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-primary">Nombre de Usuario (Nick)</label>
                                        <input 
                                            type="text"
                                            required
                                            placeholder="Ej: Alex_martin"
                                            value={formUsuario.nick}
                                            onChange={(e) => setFormUsuario({ ...formUsuario, nick: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-primary">Rol</label>
                                        <select 
                                            value={formUsuario.rol}
                                            onChange={(e) => setFormUsuario({ ...formUsuario, rol: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm font-semibold"
                                        >
                                            <option value="Usuario">Usuario</option>
                                            <option value="Moderador">Moderador</option>
                                            <option value="Administrador">Administrador</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Correo Electrónico</label>
                                    <input 
                                        type="email"
                                        required
                                        placeholder="Ej: usuario@gmail.com"
                                        value={formUsuario.email}
                                        onChange={(e) => setFormUsuario({ ...formUsuario, email: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-primary">Ciudad</label>
                                        <input 
                                            type="text"
                                            placeholder="Ej: Madrid, España"
                                            value={formUsuario.ciudad}
                                            onChange={(e) => setFormUsuario({ ...formUsuario, ciudad: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2 flex flex-col justify-end pb-3">
                                        <label className="flex items-center gap-3 cursor-pointer select-none">
                                            <input 
                                                type="checkbox"
                                                checked={formUsuario.activo}
                                                onChange={(e) => setFormUsuario({ ...formUsuario, activo: e.target.checked })}
                                                className="accent-primary size-5 rounded-md"
                                            />
                                            <span className="text-sm font-bold">Usuario Activo</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button 
                                        type="button" 
                                        onClick={cerrarModal}
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
                            </form>
                        ) : (
                            /* FORMULARIO DE MARCADOR */
                            <form onSubmit={guardarMarcador} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Nombre del Restaurante</label>
                                    <input 
                                        type="text"
                                        required
                                        placeholder="Ej: La Pizzería Di Carlo"
                                        value={formMarcador.nombre}
                                        onChange={(e) => setFormMarcador({ ...formMarcador, nombre: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-primary">Categoría Gastronómica</label>
                                        <select 
                                            value={formMarcador.categoria}
                                            onChange={(e) => setFormMarcador({ ...formMarcador, categoria: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm font-semibold"
                                        >
                                            <option value="Italiana">Italiana</option>
                                            <option value="Americana">Americana</option>
                                            <option value="Asiática">Asiática</option>
                                            <option value="Mexicana">Mexicana</option>
                                            <option value="Española">Española</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-primary">Valoración (0.0 a 5.0)</label>
                                        <input 
                                            type="number"
                                            required
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            value={formMarcador.valoracion}
                                            onChange={(e) => setFormMarcador({ ...formMarcador, valoracion: parseFloat(e.target.value) })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Dirección Completa</label>
                                    <input 
                                        type="text"
                                        required
                                        placeholder="Ej: Calle Gran Vía 45, Madrid"
                                        value={formMarcador.direccion}
                                        onChange={(e) => setFormMarcador({ ...formMarcador, direccion: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Nick del Creador</label>
                                    <input 
                                        type="text"
                                        required
                                        placeholder="Ej: Alex_martin"
                                        value={formMarcador.creador}
                                        onChange={(e) => setFormMarcador({ ...formMarcador, creador: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button 
                                        type="button" 
                                        onClick={cerrarModal}
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
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}