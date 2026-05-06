import Etiqueta_perfil from "../components/ui/etiqueta_perfil";
import Bloque_config from "../components/ui/Bloque_config";
import { User, Bell, Shield, Map, Globe, Sun, Bot, Info, LogOut } from 'lucide-react';

import Perfil from "./config/Perfil";
import Privacidad from "./config/privacidad";
import Notidicaciones from "./config/Notidicaciones";
import Mapas_perfil from "./config/Mapas_perfil";
import Apariencia from "./config/Apariencia";
import Idioma from "./config/Idioma";
import Marcadores from "./config/Marcadores";
import Ayuda from "./config/Ayuda";

export default function Config() {
    return (
        <div className="h-full w-full">

            <main className="w-full h-full flex min-w-0 bg-background dark:bg-background-oscuro outline-2 outline-3 outline-offset outline-borde ">
                <section className="w-1/4 border-r-3 border-r-borde dark:border-r-borde-dark ">
                    <Bloque_config seccion="Cuenta">
                        <Etiqueta_perfil icono={User} nombre="Perfil" active={true} />
                        <Etiqueta_perfil icono={Shield} nombre="Privacidad" active={false} />
                        <Etiqueta_perfil icono={Bell} nombre="Notificaciones" active={false} />
                    </Bloque_config>
                    <Bloque_config seccion="app">
                        <Etiqueta_perfil icono={Map} nombre="Mapas" active={false} />
                        <Etiqueta_perfil icono={Sun} nombre="Apariencia" active={false} />
                        <Etiqueta_perfil icono={Globe} nombre="Idioma" active={false} />
                        <Etiqueta_perfil icono={Bot} nombre="Marcadores" active={false} />
                    </Bloque_config>
                    <Bloque_config seccion="más">
                        <Etiqueta_perfil icono={Info} nombre="Ayuda" active={false} />
                        <Etiqueta_perfil icono={LogOut} nombre="Cerrar sesión" active={false} />
                    </Bloque_config>
                </section>
                <section className="w-3/4   ">
                    <Ayuda />
                </section>
            </main>
        </div>
    );
}