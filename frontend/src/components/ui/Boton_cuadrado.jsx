
export default function Boton_cuadrado({ icon, onClick, className = "bg-primary text-white size-14 dark:bg-dark-tarjeta dark:text-input dark:border-descripcion" }) {
    return (
        <button
            onClick={onClick}
            className={`${className} p-3 rounded-xl shadow-sm hover:opacity-80 transition-all flex items-center justify-center cursor-pointer`}
        >
            {icon}
        </button>
    );
}
