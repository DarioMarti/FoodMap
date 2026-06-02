import Etiqueta_perfil from "../components/ui/etiqueta_perfil";
import Bloque_config from "../components/ui/Bloque_config";
import { User, Bell, Shield, Map, Globe, Sun, Bot, Info, LogOut, LucideAArrowDown } from 'lucide-react';
import { useState, useEffect } from "react";
import Perfil from "./config/Perfil";
import Privacidad from "./config/privacidad";
import Apariencia from "./config/Apariencia";
import Marcadores from "./config/Marcadores";
import Ayuda from "./config/Ayuda";
import { ArrowRight } from 'lucide-react';
import { cambiarSeccion as handlerCambiarSeccion } from "../servicios/config/cambiarSeccion";
import { manejarMenuLateral as handlerManejarMenuLateral } from "../servicios/config/manejarMenuLateral";
import { cerrarSesion as handlerCerrarSesion } from "../servicios/config/cerrarSesion";

export default function Config({ darkMode, setDarkMode, setPrimaryColor, fontSize, setFontSize }) {

    //Estados
    const [seccion, setSeccion] = useState("Perfil");
    const [vistaMovil, setVistaMovil] = useState(false);
    const [vistaBloque, setVistaBloque] = useState(false);

    //Funciones
    const manejarMenuLateral = () => handlerManejarMenuLateral(vistaBloque, setVistaBloque);
    const cambiarSeccion = (nuevaSeccion) => handlerCambiarSeccion(nuevaSeccion, setSeccion, vistaMovil, manejarMenuLateral);
    const cerrarSesion = async () => await handlerCerrarSesion();


    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');

        const manejarCambioDeTamaño = (e) => {
            setVistaMovil(e.matches);
            if (!e.matches) {
                setVistaBloque(true);
            } else {
                setVistaBloque(false);
            }
        };

        setVistaMovil(mediaQuery.matches);
        setVistaBloque(!mediaQuery.matches);

        mediaQuery.addEventListener('change', manejarCambioDeTamaño);
        return () => {
            mediaQuery.removeEventListener('change', manejarCambioDeTamaño);
        };
    }, []);

    return (
        <div className="h-full w-full">

            <main className="w-full h-full flex min-w-0 bg-background dark:bg-background-oscuro outline-2 outline-3 outline-offset outline-borde relative overflow-hidden">
                <section id="menuLateralConfig" className="absolute md:relative h-full w-full md:w-1/4 border-r-2 border-r-borde dark:border-r-text-tertiary bg-background dark:bg-background-oscuro z-40 transition-transform duration-300">
                    <Bloque_config seccion="Cuenta">
                        <Etiqueta_perfil icono={User} nombre="Perfil" active={seccion === "Perfil"} onClick={() => cambiarSeccion("Perfil")} />
                        <Etiqueta_perfil icono={Shield} nombre="Privacidad" active={seccion === "Privacidad"} onClick={() => cambiarSeccion("Privacidad")} />
                    </Bloque_config>
                    <Bloque_config seccion="app">
                        <Etiqueta_perfil icono={Sun} nombre="Apariencia" active={seccion === "Apariencia"} onClick={() => cambiarSeccion("Apariencia")} />
                        <Etiqueta_perfil icono={Bot} nombre="Marcadores" active={seccion === "Marcadores"} onClick={() => cambiarSeccion("Marcadores")} />
                    </Bloque_config>
                    <Bloque_config seccion="más">
                        <Etiqueta_perfil icono={Info} nombre="Ayuda" active={seccion === "Ayuda"} onClick={() => cambiarSeccion("Ayuda")} />
                        <Etiqueta_perfil onClick={cerrarSesion} icono={LogOut} nombre="Cerrar sesión" active={false} />
                    </Bloque_config>
                    <div className="md:hidden bg-primary w-14 h-14 flex items-center justify-center rounded-tr-2xl rounded-br-2xl absolute top-20 -right-14 z-[100] cursor-pointer shadow-lg" onClick={manejarMenuLateral}>
                        <ArrowRight className="text-white" size={28} />
                    </div>
                </section>
                {vistaBloque ? (
                    <section className="w-full md:w-3/4 h-full overflow-y-auto">
                        {seccion === "Perfil" && <Perfil />}
                        {seccion === "Privacidad" && <Privacidad />}
                        {seccion === "Apariencia" && <Apariencia darkMode={darkMode} setDarkMode={setDarkMode} setPrimaryColor={setPrimaryColor} fontSize={fontSize} setFontSize={setFontSize} />}
                        {seccion === "Marcadores" && <Marcadores />}
                        {seccion === "Ayuda" && <Ayuda />}
                    </section>
                ) : null}
            </main>
        </div>
    );
}