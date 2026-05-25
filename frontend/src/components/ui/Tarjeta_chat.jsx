import { useState } from "react";
import { IMG_PATH } from "../../connstantes";

export default function Tarjeta_chat({ isActiva, sigla, nombre, texto, hora, onClick, fotoPerfil, mensajesNuevos }) {

    return (
        <div onClick={onClick} className={`w-full cursor-pointer flex border-b-2 border-borde  dark:border-text-tertiary/20  p-4 justify-between ${isActiva ? "bg-secondary/20" : "bg-background dark:bg-dark-tarjeta"}`}>
            <div className=" h-24 p-3 rounded-2xl flex gap-6">
                <span className="flex items-center">
                    {fotoPerfil ? (
                        <img 
                            className="w-12 h-12 rounded-full object-cover bg-amber-600" 
                            src={fotoPerfil.startsWith('http') ? fotoPerfil : import.meta.env.VITE_API_URL + `/uploads/img/${fotoPerfil}`} 
                            alt={nombre} 
                        />
                    ) : (
                        <span className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg  mx-auto">
                            {sigla}
                        </span>
                    )}
                </span>
                <div className="flex-1 flex flex-col justify-center">
                    <strong className="text-md font-semibold text-2xl text-text-main dark:text-background">{nombre}</strong>
                    {texto && (
                        <p className="text-lg font-light mt-1 text-text-tertiary dark:text-background-oscur">{texto}</p>
                    )}
                </div>
            </div>
            <div className=" h-24 p-3 rounded-2xl flex flex-col items-end gap-2">
                <p className="text-xl font-light text-text-main dark:text-background">{hora}</p>
                {mensajesNuevos > 0 && (
                    <span className="size-8 bg-primary rounded-full flex items-center justify-center text-input text-md font-semibold">
                        {mensajesNuevos}
                    </span>
                )}
            </div>
        </div>
    );
}