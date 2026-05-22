import Etiqueta_perfil from "../components/ui/etiqueta_perfil";
import Bloque_config from "../components/ui/Bloque_config";
import { User, Bell, Shield, Map, Globe, Sun, Bot, Info, LogOut } from 'lucide-react';
import { useState, useEffect } from "react";
import Perfil from "./config/Perfil";
import Privacidad from "./config/privacidad";
import Apariencia from "./config/Apariencia";
import Marcadores from "./config/Marcadores";
import Ayuda from "./config/Ayuda";

export default function Config({ darkMode, setDarkMode, setPrimaryColor, fontSize, setFontSize }) {


    const [seccion, setSeccion] = useState("Perfil");

    function cambiarSeccion(seccion) {
        setSeccion(seccion);
    }

    async function cerrarSesion() {
        const respuesta = await fetch("http://localhost/foodmap/backend/modelos/sesion/cerrar_sesion.php", {
            credentials: 'include'
        });

        const data = await respuesta.json();

        if (data.ok) {
            window.location.href = "/";
        }
    }

    return (
        <div className="h-full w-full">

            <main className="w-full h-full flex min-w-0 bg-background dark:bg-background-oscuro outline-2 outline-3 outline-offset outline-borde ">
                <section className="w-1/4 border-r-2 border-r-borde dark:border-r-text-tertiary ">
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
                </section>
                <section className="w-3/4   ">
                    {seccion === "Perfil" && <Perfil />}
                    {seccion === "Privacidad" && <Privacidad />}
                    {seccion === "Apariencia" && <Apariencia darkMode={darkMode} setDarkMode={setDarkMode} setPrimaryColor={setPrimaryColor} fontSize={fontSize} setFontSize={setFontSize} />}
                    {seccion === "Marcadores" && <Marcadores />}
                    {seccion === "Ayuda" && <Ayuda />}
                </section>
            </main>
        </div>
    );
}