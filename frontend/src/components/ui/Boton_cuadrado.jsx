
export default function Boton_cuadrado({ icon, onClick, className = "bg-primary text-white size-14 dark:bg-dark-tarjeta dark:text-input dark:border-descripcion", disabled, ...props }) {
    return (
        <button
            onClick={disabled ? null : onClick}
            disabled={disabled}
            className={`${className} p-3 rounded-xl shadow-sm transition-all flex items-center justify-center ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'}`}
            {...props}
        >
            {icon}
        </button>
    );
}
