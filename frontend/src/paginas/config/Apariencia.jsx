import { useState, useEffect } from 'react';
import Boton_cuadrado from "../../components/ui/Boton_cuadrado";
import { Sun, Moon, Monitor, Palette, Type } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";

export default function Apariencia({ darkMode, setDarkMode, setPrimaryColor, fontSize, setFontSize }) {

    const paletasDisponibles = [
        { id: 'rosa', primary: '#EA2678', hover: '#F03989', active: '#C41863', dark: '#9A0F4A', light: '#FFDEEF' },
        { id: 'morado', primary: '#7C3AED', hover: '#8B5CF6', active: '#6D28D9', dark: '#4C1D95', light: '#EDE9FE' },
        { id: 'naranja', primary: '#EA580C', hover: '#F97316', active: '#C2410C', dark: '#7C2D12', light: '#FFEDD5' },
        { id: 'verde', primary: '#059669', hover: '#10B981', active: '#047857', dark: '#064E3B', light: '#D1FAE5' }
    ];

    const [colorActual, setColorActual] = useState(() => {
        const guardado = localStorage.getItem('user-theme-palette');
        return guardado ? JSON.parse(guardado).primary : '#EA2678';
    });

    const handleColorClick = (paleta) => {
        setColorActual(paleta.primary);
        setPrimaryColor(paleta);
    };

    return (
        <div className="h-full flex flex-col overflow-hidden dark:bg-background-oscuro bg-background dark:bg-background-oscuro md:pb-0 pb-20">
            <div className="border-b-3 border-borde dark:border-text-tertiary py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold dark:text-background">Apariencia</h1>
            </div>
            <article className="p-5 md:p-10 flex-1 overflow-y-auto dark:text-background dark:bg-background-oscuro">

                <h2 className="text-2xl font-bold py-10 px-2 text-black dark:text-white">Tema</h2>
                <div className="grid grid-cols-2 gap-6 mb-4 ">
                    <button
                        onClick={() => setDarkMode(false)}
                        className={`dark:bg-dark-tarjeta bg-background-claro flex flex-col items-center gap-4 p-6 dark:text-white text-text-main 
                        dark:border-transparent border-borde border-3 rounded-3xl cursor-pointer transition-all ${!darkMode ? 'border-primary shadow-sm' : 'dark:border-white/10 hover:border-primary'}`}>
                        <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-borde">
                            <Sun size={32} className="text-slate-600" />
                        </div>
                        <strong className="text-xl font-semibold">Claro</strong>
                    </button>
                    <button
                        onClick={() => setDarkMode(true)}
                        className={`dark:bg-dark-tarjeta bg-background-claro flex flex-col items-center gap-4 p-6 dark:text-white text-text-main 
                         border-borde border-3 rounded-3xl cursor-pointer transition-all ${darkMode ? 'dark:border-primary hover:border-primary' : 'dark:border-white/10 border-borde hover:border-primary'}`}>
                        <div className="size-16 rounded-full bg-slate-900 flex items-center justify-center border-2 border-slate-700">
                            <Moon size={32} className="text-white" />
                        </div>
                        <strong className="text-xl font-semibold">Oscuro</strong>
                    </button>

                </div>

                <h2 className="text-2xl font-bold py-10 px-2">Personalización</h2>
                <div className="flex flex-col gap-6 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-white/10 py-8 rounded-3xl ">
                    <div className="flex justify-between px-4 md:px-10 items-center">
                        <div className="flex flex-col ">
                            <strong className="text-xl font-semibold">Color de acento</strong>
                            <p className="text-md text-text-tertiary">Personaliza el color principal de la aplicación</p>
                        </div>
                        <div className="flex flex-wrap justify-end md:flex-row gap-4  md:gap-3">
                            {paletasDisponibles.map((paleta) => (
                                <button
                                    key={paleta.id}
                                    onClick={() => handleColorClick(paleta)}
                                    className={`size-10 md:size-8  md:rounded-full ${paleta.primary === colorActual ? 'ring-2 ring-offset-2 ring-primary' : ''} cursor-pointer transition-transform hover:scale-110`}
                                    style={{ backgroundColor: paleta.primary }}
                                />
                            ))}

                        </div>
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-white/10"></span>
                    <div className="flex justify-between px-4 md:px-10 items-center">
                        <strong className="text-xl font-semibold">Tamaño de la fuente</strong>
                        <div className="flex items-center gap-4">
                            <span className="text-sm">A</span>
                            <input type="range" className="w-32 accent-primary" min="14" max="24" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                            <span className="text-xl">A</span>
                        </div>
                    </div>
                </div>



            </article >
        </div >
    );
}
