import { useState, useEffect } from "react";
import { actualizarCategoriaAdmin, crearCategoriaAdmin } from "../../servicios/administrador/crud_admin";
import * as lucideIcons from 'lucide-react';
import * as tbIcons from 'react-icons/tb';
import * as biIcons from 'react-icons/bi';
import * as mdIcons from 'react-icons/md';
import * as giIcons from 'react-icons/gi';
import * as piIcons from 'react-icons/pi';


export default function Form_categoria_admin({ categoriaSeleccionada, setFormularioCategoriaActivo, className, mostrarNotificacion, recargarTabla }) {

    const [nombre, setNombre] = useState(categoriaSeleccionada?.Nombre || "");
    const [color, setColor] = useState(categoriaSeleccionada?.Color || "#000000");
    const [icono, setIcono] = useState(categoriaSeleccionada?.Icono || "MapPin");

    useEffect(() => {
        setNombre(categoriaSeleccionada?.Nombre || "");
        setColor(categoriaSeleccionada?.Color || "#000000");
        setIcono(categoriaSeleccionada?.Icono || "MapPin");
    }, [categoriaSeleccionada]);

    const IconoDinamico = ({ nombre, ...props }) => {
        if (!nombre) return <lucideIcons.MapPin {...props} />;

        let nombreBase = nombre.split(/[-_ ]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

        let IconoComponente = lucideIcons[nombre] || lucideIcons[nombreBase];

        if (!IconoComponente) {
            if (nombre.startsWith('Tb') || nombreBase.startsWith('Tb')) IconoComponente = tbIcons[nombre] || tbIcons[nombreBase];
            else if (nombre.startsWith('Bi') || nombreBase.startsWith('Bi')) IconoComponente = biIcons[nombre] || biIcons[nombreBase];
            else if (nombre.startsWith('Md') || nombreBase.startsWith('Md')) IconoComponente = mdIcons[nombre] || mdIcons[nombreBase];
            else if (nombre.startsWith('Gi') || nombreBase.startsWith('Gi')) IconoComponente = giIcons[nombre] || giIcons[nombreBase];
            else if (nombre.startsWith('Pi') || nombreBase.startsWith('Pi')) IconoComponente = piIcons[nombre] || piIcons[nombreBase];
        }

        if (!IconoComponente) {
            IconoComponente = tbIcons[`Tb${nombreBase}`] || biIcons[`Bi${nombreBase}`] || mdIcons[`Md${nombreBase}`] || giIcons[`Gi${nombreBase}`] || piIcons[`Pi${nombreBase}`];
        }

        if (!IconoComponente) return <lucideIcons.MapPin {...props} />;
        return <IconoComponente {...props} />;
    };

    const manejarGuardar = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        let respuesta;
        if (categoriaSeleccionada?.id) {
            respuesta = await actualizarCategoriaAdmin(data);
        } else {
            respuesta = await crearCategoriaAdmin(data);
        }
        if (respuesta?.success) {
            setFormularioCategoriaActivo(false);
            mostrarNotificacion(respuesta.mensaje, "success");
            recargarTabla();
        } else {
            mostrarNotificacion(respuesta.mensaje, "error");
        }
    };

    return (
        <form onSubmit={manejarGuardar} className={` w-96 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white dark:bg-dark-tarjeta border border-borde dark:border-text-tertiary/30 shadow-2xl rounded-2xl p-10 ${className}`}>
            <input type="hidden" name="id" value={categoriaSeleccionada?.id} />
            <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Nombre</label>
                    <input type="text" required value={nombre} name="nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full px-5 py-3 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Color</label>
                    <div className="flex gap-4 items-center ">
                        <input type="color" required value={color} name="color"
                            onChange={(e) => setColor(e.target.value)}
                            className="size-12 cursor-pointer border-2 border-text-tertiary/30 rounded-4xl "
                        />
                        <span className="text-sm font-semibold uppercase">{color}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Icono <span className="text-xs font-normal uppercase text-secundary">(En inglés)</span></label>
                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <input type="text" required value={icono} name="icono"
                                onChange={(e) => setIcono(e.target.value)}
                                placeholder="Ej: Pizza, Coffee, Sushi"
                                className="w-full px-5 py-3 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                            />
                        </div>
                        <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0 shadow-inner">
                            <IconoDinamico nombre={icono} size={24} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setFormularioCategoriaActivo(false)} className="flex-1 py-3 bg-text-tertiary/10 rounded-2xl font-bold hover:bg-text-tertiary/20 transition-all cursor-pointer text-sm">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary-hover transition-all cursor-pointer text-sm">Guardar</button>
            </div>
        </form>
    );
}
