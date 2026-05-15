export default function InputGeneral({ placeholder, type, value, onChange, name, className }) {
    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} className={`w-full p-2 text-lg border-2 border-borde rounded-xl focus:outline-none focus:border-primary dark:bg-dark-tarjeta dark:text-white ${className}`} />
    )
}