import * as lucideIcons from 'lucide-react';
import * as tbIcons from 'react-icons/tb';
import * as biIcons from 'react-icons/bi';
import * as mdIcons from 'react-icons/md';
import * as giIcons from 'react-icons/gi';
import * as piIcons from 'react-icons/pi';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";
import { useEffect, useState } from 'react';
import { obtener_sesion_usuario } from '../../servicios/usuario/obtener_sesion_usuario';
import CategoriaBoton from "../../components/ui/Categoria_boton";

// Icono dinamico
const IconoDinamico = ({ nombre, ...props }) => {
    if (!nombre) return <lucideIcons.MapPin {...props} />;
    const nombreCapitalizado = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    let nombreBase = nombre.split(/[-_ ]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    if (nombreBase === "Hamburger") nombreBase = "Burger";
    
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



export default function Marcadores() {

    const [usuario, setUsuario] = useState({});
    const [categorias, setCategorias] = useState([]);

    // Estados para los ajustes visuales, guardados en el navegador
    const [mostrarEtiquetas, setMostrarEtiquetas] = useState(() => {
        return localStorage.getItem("mostrar-etiquetas") !== "false";
    });
    const [marcadoresGrandes, setMarcadoresGrandes] = useState(() => {
        return localStorage.getItem("marcadores-grandes") === "true";
    });
    const [mostrarIconos, setMostrarIcono] = useState(() => {
        return localStorage.getItem("mostrar-iconos") === "true";
    });

    useEffect(() => {
        const obtenerSesionUsuario = async () => {
            const res = await obtener_sesion_usuario();
            if (res.usuario) {
                setUsuario(res.usuario);
                cargarCategorias(res.usuario.id);
            }
        };
        obtenerSesionUsuario();
    }, []);

    const cargarCategorias = async (userId) => {
        const respuesta = await fetch(import.meta.env.VITE_API_URL + `/modelos/categorias/mostrar_categorias.php?usuario_id=${userId}`, {
            credentials: 'include'
        });
        const data = await respuesta.json();
        setCategorias(data);
    };

    return (
        <div className="h-full flex flex-col overflow-hidden dark:bg-background-oscuro bg-background">
            <div className="border-b-3 border-borde dark:border-text-tertiary py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold dark:text-white text-text-main">Marcadores</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto">

                <div className="flex justify-between items-center py-6 px-2">
                    <h2 className="text-2xl font-bold dark:text-white text-text-main">Mis categorías</h2>
                </div>
                <div className="flex flex-wrap gap-3 mb-10">
                    {categorias.map((cat) => (
                        <CategoriaBoton
                            key={cat.id}
                            cat={cat}
                            IconoDinamico={IconoDinamico}
                            mostrarEtiquetas={mostrarEtiquetas}
                            marcadoresGrandes={marcadoresGrandes}
                            mostrarIconos={mostrarIconos}
                        />
                    ))}
                </div>

                <h2 className="text-2xl font-bold py-10 px-2 dark:text-white text-text-main">Ajustes visuales</h2>
                <div className="flex flex-col gap-6 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-white/10 py-8 rounded-3xl ">
                    <div className="flex justify-between px-4 md:px-10 items-center">
                        <strong className="text-lg md:text-xl font-semibold dark:text-white text-text-main">Mostrar etiquetas de nombre</strong>
                        <Toggle
                            id="mostrar-etiquetas"
                            checked={mostrarEtiquetas}
                            onChange={(e) => {
                                const val = e.target.checked;
                                setMostrarEtiquetas(val);
                                localStorage.setItem("mostrar-etiquetas", val);
                                window.dispatchEvent(new Event("preferenciasVisualesCambiada"));
                            }}
                        />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-white/10"></span>
                    <div className="flex justify-between px-4 md:px-10 items-center">
                        <strong className="text-lg md:text-xl font-semibold dark:text-white text-text-main">Marcadores grandes</strong>
                        <Toggle
                            id="marcadores-grandes"
                            checked={marcadoresGrandes}
                            onChange={(e) => {
                                const val = e.target.checked;
                                setMarcadoresGrandes(val);
                                localStorage.setItem("marcadores-grandes", val);
                                window.dispatchEvent(new Event("preferenciasVisualesCambiada"));
                            }}
                        />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-white/10"></span>
                    <div className="flex justify-between px-4 md:px-10 items-center">
                        <strong className="text-lg md:text-xl font-semibold dark:text-white text-text-main">Mostrar Icono</strong>
                        <Toggle
                            id="mostrar-icono"
                            checked={mostrarIconos}
                            onChange={(e) => {
                                const val = e.target.checked;
                                setMostrarIcono(val);
                                localStorage.setItem("mostrar-icono", val);
                                window.dispatchEvent(new Event("preferenciasVisualesCambiada"));
                            }}
                        />
                    </div>
                </div>


            </article >
        </div>
    );
}
