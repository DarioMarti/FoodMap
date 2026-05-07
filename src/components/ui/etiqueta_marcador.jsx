
export default function Etiqueta_marcador({ icon, texto, color_borde, color_fondo, className = "bg-primary-light border-2 border-primary text-primary dark:bg-error/20 dark:border-error dark:text-error " }) {
    return (
        <button className={`${className} dark:bg-${color_fondo}/30 dark:text-${color_borde} py-3 px-6 rounded-full  shadow-sm  transition-all flex items-center gap-2`}>
            {icon}
            <span className="font-semibold text-sm">{texto}</span>
        </button>
    );
}