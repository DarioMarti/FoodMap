import React, { useState } from 'react';
import logotipo from '../assets/foodmap_logo_blanco.svg';
import * as lucideIcons from 'lucide-react';
import { registrar_usuario } from '../servicios/usuario/handler_registrar_usuario';
import { iniciar_sesion } from '../servicios/usuario/handler_iniciar_sesion';

const Login = () => {
    const [formularioMostrado, setFormularioMostrado] = useState("login");
    const [fotoPreview, setFotoPreview] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoPreview(URL.createObjectURL(file));
        }
    };
    const cambiarFormulario = (formulario) => {
        if (formulario === "login") {
            setFormularioMostrado("register");
        } else {
            setFormularioMostrado("login");
        }
    };
    const registro_usuario = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const respuesta = await registrar_usuario(data);
        if (respuesta.ok) {
            window.location.href = "/";
        } else {
            alert(respuesta.error || "Error al registrar usuario");
        }
    }

    const inicio_sesion = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const respuesta = await iniciar_sesion(data);
        if (respuesta.ok) {
            window.location.href = "/";
        } else {
            alert(respuesta.error || "Error al iniciar sesión");
        }
    }

    return (
        <div className="flex items-end justify-center w-full h-screen bg-gradient-to-br from-primary/90 via-primary/70 to-primary/60 font-['Outfit']">
            <main className="flex w-[90%] max-w-[1400px] justify-around items-center">

                {/* Bloque izquierdo */}
                <div className="w-[55%] p-10 mb-[30%] hidden lg:flex flex-col">
                    <img className="w-[120px] mb-10" src={logotipo} alt="Logo" />
                    <h1 className="text-[54px] text-white py-[10px] font-extrabold leading-[1.1]">Hey, Hello!</h1>
                    <h3 className="text-white text-[22px] py-[10px] font-normal">Join The Waitlist For The Design System!</h3>
                    <p className="text-white/80 text-[18px] leading-[28px] py-5">
                        We provide all the advantages that can simplify all your financial transactions.
                    </p>
                    <button
                        onClick={() => cambiarFormulario(formularioMostrado)}
                        className="self-start bg-transparent border-2 border-white text-white mt-5 px-[60px] py-[18px] rounded-full font-bold cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#EA2678] uppercase tracking-wider"
                    >
                        {formularioMostrado === "login" ? "Registrarse" : "Iniciar sesión"}
                    </button>
                </div>

                <form onSubmit={inicio_sesion} className={`rounded-t-[40px] bg-background p-[50px] flex flex-col items-center min-w-[550px] h-[calc(100vh-150px)] transition-all duration-300 shadow-[-10px_0_40px_rgba(0,0,0,0.1)] ${formularioMostrado === "login" ? "flex" : "hidden"}`}>
                    <h2 className="text-[#1a1a1a] text-3xl font-bold mb-[30px]">Iniciar Sesión</h2>

                    <div className="relative w-full my-[10px]">
                        <label className="absolute left-[30px] top-0 bg-white px-[10px] text-[14px] font-bold text-[#EA2678] z-10" htmlFor="loginEmail">Email</label>
                        <input className="w-full px-[25px] py-[18px] rounded-full my-[10px] border-2 border-borde transition-all duration-300 focus:border-[#EA2678] focus:outline-none" id="loginEmail" name="email" type="text" placeholder="usuario@gmail.com" />
                    </div>

                    <div className="relative w-full my-[10px]">
                        <label className="absolute left-[30px] top-0 bg-white px-[10px] text-[14px] font-bold text-[#EA2678] z-10" htmlFor="loginPassword">Password</label>
                        <input className="w-full px-[25px] py-[18px] rounded-full my-[10px] border-2 border-borde transition-all duration-300 focus:border-[#EA2678] focus:outline-none" id="loginPassword" name="password" type="password" placeholder="••••••••" />
                    </div>

                    <p className="text-right text-[14px] text-[#6c757d] mb-[35px] mt-[10px] font-medium cursor-pointer self-end hover:text-[#EA2678]">Forget your password?</p>

                    <button type="submit" className="bg-primary w-full text-white cursor-pointer py-[18px] rounded-full border-none font-bold text-lg hover:bg-primary-hover ">
                        Iniciar sesión
                    </button>
                </form>

                {/* Formulario de registro */}
                <form onSubmit={registro_usuario} className={`rounded-t-[40px] bg-background p-[50px] flex flex-col items-center min-w-[550px] h-[calc(100vh-150px)] transition-all duration-300 shadow-[-10px_0_40px_rgba(0,0,0,0.1)] ${formularioMostrado === "register" ? "flex" : "hidden"}`}>
                    <h2 className="text-[#1a1a1a] text-3xl font-bold mb-[10px]">Crear cuenta</h2>

                    <input type="file" id="fotoPerfil" accept="image/*" className="hidden" onChange={handleFotoChange} />
                    <label
                        htmlFor="fotoPerfil"
                        className="w-[110px] min-h-[110px] rounded-full bg-background bg-cover bg-center my-[15px] flex items-center justify-center border-[3px] border-borde-dark cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{ backgroundImage: `url(${fotoPreview})` }}
                    ></label>

                    <div className="relative w-full my-[5px]">
                        <label className="absolute left-[30px] top-0 bg-background px-[10px] text-[14px] font-bold text-primary z-10" htmlFor="registerName">Nombre</label>
                        <input className="w-full px-[25px] py-[15px] rounded-full my-[10px] border-2 border-borde focus:border-primary-active focus:outline-none" id="registerName" type="text" name="nombre" placeholder="Alberto" />
                    </div>

                    <div className="relative w-full my-[5px]">
                        <label className="absolute left-[30px] top-0 bg-background px-[10px] text-[14px] font-bold text-primary z-10" htmlFor="registerEmail">Email</label>
                        <input className="w-full px-[25px] py-[15px] rounded-full my-[10px] border-2 border-borde focus:border-primary-active focus:outline-none" id="registerEmail" type="text" name="email" placeholder="usuario@gmail.com" />
                    </div>

                    <div className="relative w-full my-[5px]">
                        <label className="absolute left-[30px] top-0 bg-background px-[10px] text-[14px] font-bold text-primary z-10" htmlFor="registerPassword">Contraseña</label>
                        <input className="w-full px-[25px] py-[15px] rounded-full my-[10px] border-2 border-borde focus:border-primary-active focus:outline-none" id="registerPassword" type="password" name="password" placeholder="••••••••" />
                        <lucideIcons.Eye className="absolute right-[18px] top-[26px] cursor-pointer" />
                    </div>

                    <div className="w-full mt-4 space-y-3">
                        <button type="submit" className="bg-primary w-full text-background cursor-pointer py-[18px] rounded-full border-none font-bold text-lg hover:bg-primary-hover">
                            Registrarse
                        </button>
                        <button type="button" onClick={() => setFormularioMostrado("login")} className="w-full text-[#333] font-bold py-2 hover:text-primary cursor-pointer">
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Login;
