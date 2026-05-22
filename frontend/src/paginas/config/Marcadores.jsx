import * as lucideIcons from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";
import { useEffect, useState } from 'react';
import { obtener_sesion_usuario } from '../../servicios/usuario/obtener_sesion_usuario';
import CategoriaBoton from "../../components/ui/Categoria_boton";

// Icono dinamico
const IconoDinamico = ({ nombre, ...props }) => {
    const IconoComponente = lucideIcons[nombre];
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
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/categorias/mostrar_categorias.php?usuario_id=${userId}`, {
            credentials: 'include'
        });
        const data = await respuesta.json();
        setCategorias(data);
    };

    return (
        <div className="h-full flex flex-col overflow-hidden dark:bg-background-oscuro bg-background">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
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
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Mostrar etiquetas de nombre</strong>
                        <Toggle
                            id="mostrar-etiquetas"
                            checked={mostrarEtiquetas}
                            onChange={(e) => {
                                const val = e.target.checked;
                                setMostrarEtiquetas(val);
                                localStorage.setItem("mostrar-etiquetas", val);
                            }}
                        />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-white/10"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Marcadores grandes</strong>
                        <Toggle
                            id="marcadores-grandes"
                            checked={marcadoresGrandes}
                            onChange={(e) => {
                                const val = e.target.checked;
                                setMarcadoresGrandes(val);
                                localStorage.setItem("marcadores-grandes", val);
                            }}
                        />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-white/10"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Mostrar Icono</strong>
                        <Toggle
                            id="mostrar-icono"
                            checked={mostrarIconos}
                            onChange={(e) => {
                                const val = e.target.checked;
                                setMostrarIcono(val);
                                localStorage.setItem("mostrar-icono", val);
                            }}
                        />
                    </div>
                </div>


            </article >
        </div>
    );
}
