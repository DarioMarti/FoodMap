export default function CategoriaBoton({ cat, IconoDinamico, mostrarEtiquetas, marcadoresGrandes, mostrarIconos }) {

    return (
        <button
            key={cat.id}
            style={{ backgroundColor: cat.Color }}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md`}
        >
            <div style={{ color: '#ffffff' }} className={`transition-all`}>
                {mostrarIconos && <IconoDinamico nombre={cat.Icono} size={20} />}
            </div>
            <strong style={{ color: '#ffffff', }} className={`text-md font-semibold ${marcadoresGrandes ? "text-xl" : "text-md"}  text-text-main dark:text-white transition-colors`}>{mostrarEtiquetas ? cat.Nombre : ""}</strong>
            <span style={{
                backgroundColor: "#ffffff",
                color: cat.Color,
                borderColor: 'transparent'
            }} className="ml-1 px-2 py-0.5 bg-slate-100 dark:bg-background text-text-tertiary dark:text-text-tertiary text-[10px] font-bold rounded-full border border-borde dark:border-borde-dark transition-all duration-300 shadow-inner">
                {cat.count}
            </span>
        </button>
    );
};  