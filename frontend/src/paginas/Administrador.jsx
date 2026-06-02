import React, { useState, useEffect } from 'react';
import { Users, MapPin, Search, Plus, Trash2, Edit, Check, Star, Shield, X, AlertCircle, UserCheck, BookmarkCheck, TagIcon } from 'lucide-react';
import { obtenerTodosUsuarios, obtenerTodasEtiquetas, obtenerTodosMarcadores, desactivarUsuarioAdmin, reactivarUsuarioAdmin, eliminarMarcadorAdmin, actualizarMarcadorAdmin, actualizarCategoriaAdmin, eliminarCategoriaAdmin, confirmarEliminarUsuario as handlerConfirmarEliminarUsuario, manejarReactivarUsuario as handlerManejarReactivarUsuario, confirmarEliminarMarcador as handlerConfirmarEliminarMarcador, confirmarEliminarCategoria as handlerConfirmarEliminarCategoria } from '../servicios/administrador/crud_admin';
import Etiqueta_marcador from '../components/ui/etiqueta_marcador';
import Formulario_admin_edit from '../components/ui/Form_usuario_admin';
import Notificacion from '../components/ui/Notificacion';
import { mostrarNotificacion } from '../servicios/mostrar_notificacion';
import TarjetaConfirmacion from '../components/ui/tarjeta_confirmacion';
import Formulario_marcador_edit from '../components/ui/Form_marcador_admin';
import Formulario_categoria_edit from '../components/ui/Form_categoria_admin';
import { abrirConfirmacionEliminar as handlerAbrirConfirmacionEliminar, manejarFormularioEditar as handlerManejarFormularioEditar, abrirFormularioCrearUsuario as handlerAbrirFormularioCrearUsuario } from '../servicios/administrador/handlers_usuarios';
import { manejarFormularioEditarMarcador as handlerManejarFormularioEditarMarcador, abrirConfirmacionEliminarMarcador as handlerAbrirConfirmacionEliminarMarcador, abrirFormularioCrearMarcador as handlerAbrirFormularioCrearMarcador } from '../servicios/administrador/handlers_marcadores';
import { manejarFormularioEditarCategoria as handlerManejarFormularioEditarCategoria, abrirConfirmacionEliminarCategoria as handlerAbrirConfirmacionEliminarCategoria, abrirFormularioCrearCategoria as handlerAbrirFormularioCrearCategoria } from '../servicios/administrador/handlers_categorias';
import { IconoDinamico } from '../servicios/administrador/IconoDinamico';




export default function Administrador() {

    // ---- ESTADOS -----
    const [marcadores, setMarcadores] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [pestanaActiva, setPestanaActiva] = useState("usuarios");
    const [busqueda, setBusqueda] = useState("");

    // ---- ESTADOS DE MODALES ----
    const [formularioEditarActivo, setFormularioEditarActivo] = useState(false);
    const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });
    const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = useState(false);
    const [idUsuarioAEliminar, setIdUsuarioAEliminar] = useState(null);
    const [marcadorSeleccionado, setMarcadorSeleccionado] = useState(null);
    const [formularioMarcadorActivo, setFormularioMarcadorActivo] = useState(false);
    const [mostrarConfirmacionEliminarMarcador, setMostrarConfirmacionEliminarMarcador] = useState(false);
    const [idMarcadorAEliminar, setIdMarcadorAEliminar] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [formularioCategoriaActivo, setFormularioCategoriaActivo] = useState(false);
    const [mostrarConfirmacionEliminarCategoria, setMostrarConfirmacionEliminarCategoria] = useState(false);
    const [idCategoriaAEliminar, setIdCategoriaAEliminar] = useState(null);

    // ---- FUNCIONES ----
    const abrirConfirmacionEliminar = (id) => { handlerAbrirConfirmacionEliminar(id, usuarios, setUsuarioSeleccionado, setMostrarConfirmacionEliminar); };
    const manejarFormularioEditarMarcador = (id) => { handlerManejarFormularioEditarMarcador(id, marcadores, setMarcadorSeleccionado, setFormularioMarcadorActivo); };
    const abrirConfirmacionEliminarMarcador = (id) => { handlerAbrirConfirmacionEliminarMarcador(id, setIdMarcadorAEliminar, setMostrarConfirmacionEliminarMarcador); };
    const abrirFormularioCrearMarcador = () => { handlerAbrirFormularioCrearMarcador(setMarcadorSeleccionado, setFormularioMarcadorActivo); };
    const manejarFormularioEditarCategoria = (id) => { handlerManejarFormularioEditarCategoria(id, etiquetas, setCategoriaSeleccionada, setFormularioCategoriaActivo); };
    const abrirConfirmacionEliminarCategoria = (id) => { handlerAbrirConfirmacionEliminarCategoria(id, setIdCategoriaAEliminar, setMostrarConfirmacionEliminarCategoria); };
    const manejarFormularioEditar = (id) => { handlerManejarFormularioEditar(id, usuariosFiltrados, setUsuarioSeleccionado, setFormularioEditarActivo, formularioEditarActivo); }
    const abrirFormularioCrearUsuario = () => { handlerAbrirFormularioCrearUsuario(setUsuarioSeleccionado, setFormularioEditarActivo); };
    const abrirFormularioCrearCategoria = () => { handlerAbrirFormularioCrearCategoria(setCategoriaSeleccionada, setFormularioCategoriaActivo); };
    const confirmarEliminarUsuario = () => handlerConfirmarEliminarUsuario(usuarioSeleccionado, notificacion, setNotificacion, mostrarNotificacion, mostrarUsuarios, setMostrarConfirmacionEliminar, setIdUsuarioAEliminar);
    const manejarReactivarUsuario = (id) => handlerManejarReactivarUsuario(id, notificacion, setNotificacion, mostrarNotificacion, mostrarUsuarios);
    const confirmarEliminarMarcador = () => handlerConfirmarEliminarMarcador(idMarcadorAEliminar, notificacion, setNotificacion, mostrarNotificacion, mostrarMarcadores, setMostrarConfirmacionEliminarMarcador, setIdMarcadorAEliminar);
    const confirmarEliminarCategoria = () => handlerConfirmarEliminarCategoria(idCategoriaAEliminar, notificacion, setNotificacion, mostrarNotificacion, mostrarEtiquetas, setMostrarConfirmacionEliminarCategoria, setIdCategoriaAEliminar);

    const mostrarEtiquetas = async () => {
        const datos = await obtenerTodasEtiquetas();
        setEtiquetas(Array.isArray(datos) ? datos : []);
    }

    const mostrarMarcadores = async () => {
        const datos = await obtenerTodosMarcadores();
        setMarcadores(Array.isArray(datos) ? datos : []);
    }
    const mostrarUsuarios = async () => {
        const datos = await obtenerTodosUsuarios();
        setUsuarios(Array.isArray(datos) ? datos : []);
    }


    useEffect(() => {
        mostrarUsuarios();
        mostrarMarcadores();
        mostrarEtiquetas();
    }, []);


    //Filtros para buscar usuarios
    const usuariosFiltrados = usuarios.filter(u =>
        (u.Nombre || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (u.Email || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (u.Ciudad || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (u.Rol || '').toLowerCase().includes(busqueda.toLowerCase())
    );

    //Filtros para buscar marcadores
    const marcadoresFiltrados = marcadores.filter(m =>
        (m.Titulo || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (m.Descripcion || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (m.Direccion || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        String(m.Puntuacion || '').includes(busqueda)
    );

    //Filtros para buscar etiquetas
    const etiquetasFiltradas = etiquetas.filter(e =>
        (e.Nombre || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (e.Color || '').toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col overflow-hidden bg-background dark:bg-text-main text-text-main dark:text-white font-['Outfit'] relative">
            <header className="border-b-2 border-borde dark:border-text-tertiary/30 py-6 px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0 bg-white dark:bg-dark-tarjeta/30">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                        Panel de Administración
                    </h1>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={() => {
                            if (pestanaActiva === "usuarios") {
                                abrirFormularioCrearUsuario();
                            } else if (pestanaActiva === "marcadores") {
                                abrirFormularioCrearMarcador();
                            } else if (pestanaActiva === "categorias") {
                                abrirFormularioCrearCategoria();
                            }
                        }}
                        className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-[1.03] cursor-pointer">
                        <Plus size={20} />
                        {pestanaActiva}
                    </button>
                </div>
            </header>

            <main className="p-8 md:p-10 flex-1 overflow-y-auto space-y-8">

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 bg-white dark:bg-dark-tarjeta border border-borde dark:border-white/5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-5 group">
                        <div className="p-4 bg-primary/10 rounded-2xl text-primary ">
                            <Users size={28} />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-text-tertiary tracking-wider">Total Usuarios</p>
                            <h3 className="text-3xl font-extrabold mt-1">{usuarios.length}</h3>
                        </div>
                    </div>
                    <div className="p-6 bg-white dark:bg-dark-tarjeta border border-borde dark:border-white/5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-5 group">
                        <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 ">
                            <UserCheck size={28} />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-text-tertiary tracking-wider">Usuarios Activos</p>
                            <h3 className="text-3xl font-extrabold mt-1">{usuarios.filter(u => u.Activo).length}</h3>
                        </div>
                    </div>
                    <div className="p-6 bg-white dark:bg-dark-tarjeta border border-borde dark:border-white/5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-5 group">
                        <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500 ">
                            <MapPin size={28} />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-text-tertiary tracking-wider">Marcadores creados</p>
                            <h3 className="text-3xl font-extrabold mt-1">{marcadores.length}</h3>
                        </div>
                    </div>

                    <div className="p-6 bg-white dark:bg-dark-tarjeta border border-borde dark:border-white/5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-5 group">
                        <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 ">
                            <BookmarkCheck size={28} />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-text-tertiary tracking-wider">Total Categorías</p>
                            <h3 className="text-3xl font-extrabold mt-1 flex items-center gap-1.5">{etiquetas.length}</h3>
                        </div>
                    </div>
                </section>

                {/* ---- Filtro de sección y búsqueda ---- */}
                <section className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-dark-tarjeta p-4 rounded-[2rem] border border-borde dark:border-white/5 shadow-sm">
                    <div className="flex bg-background dark:bg-background-oscuro p-1.5 rounded-2xl w-full sm:w-auto">
                        <button
                            onClick={() => { setPestanaActiva("usuarios"); setBusqueda(""); }}
                            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${pestanaActiva === "usuarios"
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "text-text-tertiary hover:text-text-main dark:hover:text-white"
                                }`}
                        >
                            <Users size={18} />
                            Usuarios
                        </button>
                        <button
                            onClick={() => { setPestanaActiva("marcadores"); setBusqueda(""); }}
                            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${pestanaActiva === "marcadores"
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "text-text-tertiary hover:text-text-main dark:hover:text-white"
                                }`}
                        >
                            <MapPin size={18} />
                            Marcadores
                        </button>
                        <button
                            onClick={() => { setPestanaActiva("categorias"); setBusqueda(""); }}
                            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${pestanaActiva === "categorias"
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "text-text-tertiary hover:text-text-main dark:hover:text-white"
                                }`}
                        >
                            <TagIcon size={18} />
                            Categorías
                        </button>
                    </div>

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

                <section className="bg-white dark:bg-dark-tarjeta border border-borde dark:border-white/5 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto w-full">
                        {pestanaActiva === "usuarios" ? (

                            /* Tabla de usuario */
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-background dark:bg-background-oscuro text-text-tertiary text-xs uppercase font-bold tracking-wider border-b border-borde dark:border-white/5">
                                        <th className="py-5 px-6">ID</th>
                                        <th className="py-5 px-6">Usuario</th>
                                        <th className="py-5 px-6">Nombre</th>
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
                                                        {u.Foto_perfil ? (
                                                            <img
                                                                src={u.Foto_perfil.startsWith('http') ? u.Foto_perfil : import.meta.env.VITE_API_URL + `/uploads/img/${u.Foto_perfil}`}
                                                                alt={u.Nombre}
                                                                className="size-10 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-sm uppercase">
                                                                {u.Nombre.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">{u.Nombre}</td>
                                                <td className="py-4 px-6 text-sm">{u.Email}</td>
                                                <td className="py-4 px-6 text-sm">{u.Ciudad}</td>
                                                <td className="py-4 px-6">
                                                    <span className={`text-xs px-3 py-1 rounded-full font-bold inline-block ${u.Rol === "Administrador"
                                                        ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                                                        : u.Rol === "Moderador"
                                                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                                            : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                                        }`}>
                                                        {u.Rol}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${u.Activo ? "text-emerald-500" : "text-text-tertiary"}`}>
                                                        <span className={`size-2 rounded-full ${u.Activo ? "bg-emerald-500 animate-pulse" : "bg-text-tertiary"}`}></span>
                                                        {u.Activo ? "Activo" : "Inactivo"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => manejarFormularioEditar(u.id)}
                                                            className="p-2 hover:bg-tertiary/10 hover:text-tertiary rounded-xl text-text-tertiary transition-colors cursor-pointer"
                                                            title="Editar Usuario">
                                                            <Edit size={18} />
                                                        </button>
                                                        {u.Activo === 0 ? (
                                                            <button
                                                                onClick={() => manejarReactivarUsuario(u.id)}
                                                                className="p-2 hover:bg-success/10 hover:text-success rounded-xl text-text-tertiary transition-colors cursor-pointer"
                                                                title="Reactivar Usuario"
                                                            >
                                                                <Check size={18} />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => abrirConfirmacionEliminar(u.id)}
                                                                className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl text-text-tertiary transition-colors cursor-pointer"
                                                                title="Eliminar Usuario"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        )}
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
                        ) : pestanaActiva === "marcadores" ? (

                            /* Tabla de marcadores */
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-background dark:bg-background-oscuro text-text-tertiary text-xs uppercase font-bold tracking-wider border-b border-borde dark:border-white/5">
                                        <th className="py-5 px-6">ID</th>
                                        <th className="py-5 px-6">Restaurante</th>
                                        <th className="py-5 px-6">Creador</th>
                                        <th className="py-5 px-6">Categoría</th>
                                        <th className="py-5 px-6">Dirección</th>
                                        <th className="py-5 px-6">Valoración</th>
                                        <th className="py-5 px-6">Descripción</th>
                                        <th className="py-5 px-6 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-borde dark:divide-white/5">
                                    {marcadoresFiltrados.length > 0 ? (
                                        marcadoresFiltrados.map((m) => (
                                            <tr key={m.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
                                                <td className="py-4 px-6 font-semibold opacity-70">#{m.id}</td>
                                                <td className="py-4 px-6">
                                                    <strong className="block text-sm dark:text-white text-text-main">{m.Titulo}</strong>
                                                </td>
                                                <td className="py-4 px-6 text-sm font-medium text-primary">
                                                    {m.Nombre_Usuario || 'Desconocido'}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <Etiqueta_marcador
                                                        style={{
                                                            backgroundColor: `${m.Categoria_Color}33`,
                                                            borderColor: m.Categoria_Color,
                                                            color: m.Categoria_Color
                                                        }}
                                                        icon={<IconoDinamico nombre={m.Categoria_Icono} size={16} />}
                                                        texto={m.Nombre}
                                                        esPrincipal={false}
                                                    />                                                </td>
                                                <td className="py-4 px-6 text-sm">{m.Direccion}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-1.5 text-sm font-bold text-amber-500">
                                                        <span>{m.Puntuacion}</span>
                                                        <Star size={16} className="fill-amber-500" />
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-text-tertiary">{m.Descripcion}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => manejarFormularioEditarMarcador(m.id)}
                                                            className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl text-text-tertiary transition-colors cursor-pointer"
                                                            title="Editar Marcador"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => abrirConfirmacionEliminarMarcador(m.id)}
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
                        ) : (

                            /* Tabla de etiquetas */
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-background dark:bg-background-oscuro text-text-tertiary text-xs uppercase font-bold tracking-wider border-b border-borde dark:border-white/5">
                                        <th className="py-5 px-6">ID</th>
                                        <th className="py-5 px-6">Nombre</th>
                                        <th className="py-5 px-6">Icono</th>
                                        <th className="py-5 px-6">Color</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-borde dark:divide-white/5">
                                    {etiquetasFiltradas.length > 0 ? (
                                        etiquetasFiltradas.map((e) => (
                                            <tr key={e.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
                                                <td className="py-4 px-6 font-semibold opacity-70">#{e.id}</td>
                                                <td className="py-4 px-6">
                                                    <strong className="block text-sm dark:text-white text-text-main">{e.Nombre}</strong>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-center">{IconoDinamico({ nombre: e.Icono, size: 16 })}</td>
                                                <td className="py-4 px-6 text-sm" style={{ color: e.Color }}>{e.Color}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => manejarFormularioEditarCategoria(e.id)}
                                                            className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl text-text-tertiary transition-colors cursor-pointer"
                                                            title="Editar Usuario"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => abrirConfirmacionEliminarCategoria(e.id)}
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
                                            <td colSpan="5" className="py-8 text-center text-text-tertiary text-sm">No se encontraron etiquetas que coincidan con la búsqueda.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            </main>

            {formularioEditarActivo && (
                <Formulario_admin_edit
                    usuarioSeleccionado={usuarioSeleccionado}
                    setFormularioEditarActivo={setFormularioEditarActivo}
                    mostrarNotificacion={(mensaje, tipo) => mostrarNotificacion(mensaje, tipo, notificacion, setNotificacion)}
                    recargarTabla={mostrarUsuarios}
                />
            )}

            {formularioMarcadorActivo && (
                <Formulario_marcador_edit
                    marcadorSeleccionado={marcadorSeleccionado}
                    setFormularioMarcadorActivo={setFormularioMarcadorActivo}
                    mostrarNotificacion={(mensaje, tipo) => mostrarNotificacion(mensaje, tipo, notificacion, setNotificacion)}
                    recargarTabla={mostrarMarcadores}
                    categoriasBD={etiquetas}
                    usuarios={usuarios}
                />
            )}

            {formularioCategoriaActivo && (
                <Formulario_categoria_edit
                    categoriaSeleccionada={categoriaSeleccionada}
                    setFormularioCategoriaActivo={setFormularioCategoriaActivo}
                    mostrarNotificacion={(mensaje, tipo) => mostrarNotificacion(mensaje, tipo, notificacion, setNotificacion)}
                    recargarTabla={mostrarEtiquetas}
                />
            )}

            <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[3000] pointer-events-none">
                {notificacion.visible && (
                    <Notificacion mensaje={notificacion.mensaje} tipo={notificacion.tipo} />
                )}
            </div>

            {mostrarConfirmacionEliminarMarcador && (
                <TarjetaConfirmacion
                    cancelar={() => setMostrarConfirmacionEliminarMarcador(false)}
                    confirmar={confirmarEliminarMarcador}
                    mensaje="¿Está seguro de que desea eliminar permanentemente este marcador?"
                />
            )}

            {mostrarConfirmacionEliminar && (
                <TarjetaConfirmacion
                    cancelar={() => setMostrarConfirmacionEliminar(false)}
                    confirmar={confirmarEliminarUsuario}
                    mensaje="¿Está seguro de que desea desactivar este usuario?"
                />
            )}

            {mostrarConfirmacionEliminarCategoria && (
                <TarjetaConfirmacion
                    cancelar={() => setMostrarConfirmacionEliminarCategoria(false)}
                    confirmar={confirmarEliminarCategoria}
                    mensaje="¿Está seguro de que desea eliminar esta categoría? Si lo haces, los marcadores asociados a ella podrían verse afectados."
                />
            )}


        </div>
    );
}