
export default function Notificacion({ mensaje, tipo }) {

    return (

        <div className="w-full z-1050">
            <div className={`p-4  shadow-lg w-full text-xl text-center
            ${tipo === 'success' ? 'bg-success border-2 border-emerald-400 text-white dark:bg-emerald-700 dark:border-emerald-400  '
                    : 'bg-error border-2 border-error text-white dark:bg-error dark:border-rose-900'}`}>
                <p>{mensaje}</p>
            </div>
        </div>
    )
}
