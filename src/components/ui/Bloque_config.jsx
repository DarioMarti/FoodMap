export default function Bloque_config({ seccion, children }) {
    return (
        <div>
            <h2 className="text-xl  py-6 px-10 text-text-tertiary dark:text-text-tertiary uppercase">{seccion}</h2>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    );
}