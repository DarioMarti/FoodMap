import { useState, useEffect } from 'react';
import Boton_cuadrado from "../../components/ui/Boton_cuadrado";
import { Sun, Moon, Monitor, Palette, Type } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";

export default function Apariencia() {
    const [darkMode, setDarkMode] = useState(true);

    // Apply dark mode class to html
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);



    return (
        <div className="h-full flex flex-col overflow-hidden dark:bg-text-main bg-red-500">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold">Apariencia</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto dark:text-background">

                <h2 className="text-2xl font-bold py-10 px-2 text-black dark:text-white">Tema</h2>
                <div className="grid grid-cols-2 gap-6 mb-4 ">
                    <button
                        onClick={() => setDarkMode(false)}
                        className={`dark:bg-dark-tarjeta bg-background-claro flex flex-col items-center gap-4 p-6 dark:text-white text-text-main 
                        dark:border-transparent border-borde border-3 rounded-3xl cursor-pointer transition-all ${!darkMode ? 'border-primary shadow-sm' : 'border-borde hover:border-primary'}`}>
                        <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-borde">
                            <Sun size={32} className="text-slate-600" />
                        </div>
                        <strong className="text-xl font-semibold">Claro</strong>
                    </button>
                    <button
                        onClick={() => setDarkMode(true)}
                        className={`dark:bg-dark-tarjeta bg-background-claro flex flex-col items-center gap-4 p-6 dark:text-white text-text-main 
                        dark:border-transparent border-borde border-3 rounded-3xl cursor-pointer transition-all ${!darkMode ? 'border-primary shadow-sm' : 'border-borde hover:border-primary'}`}>º
                        <div className="size-16 rounded-full bg-slate-900 flex items-center justify-center border-2 border-slate-700">
                            <Moon size={32} className="text-white" />
                        </div>
                        <strong className="text-xl font-semibold">Oscuro</strong>
                    </button>

                </div>

                <h2 className="text-2xl font-bold py-10 px-2">Personalización</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <div className="flex flex-col">
                            <strong className="text-xl font-semibold">Color de acento</strong>
                            <p className="text-md text-text-tertiary">Personaliza el color principal de la aplicación</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="size-8 rounded-full bg-primary ring-2 ring-offset-2 ring-primary cursor-pointer"></div>
                            <div className="size-8 rounded-full bg-blue-500 cursor-pointer"></div>
                            <div className="size-8 rounded-full bg-purple-500 cursor-pointer"></div>
                            <div className="size-8 rounded-full bg-rose-500 cursor-pointer"></div>
                        </div>
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Tamaño de la fuente</strong>
                        <div className="flex items-center gap-4">
                            <span className="text-sm">A</span>
                            <input type="range" className="w-32 accent-primary" />
                            <span className="text-xl">A</span>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold py-10 px-2">Accesibilidad</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Alto contraste</strong>
                        <Toggle id="alto-contraste" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Reducir animaciones</strong>
                        <Toggle id="reducir-animaciones" />
                    </div>
                </div>

            </article >
        </div>
    );
}
