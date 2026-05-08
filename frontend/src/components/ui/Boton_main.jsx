export default function Boton_main({ nombre }) {
    return (
        <button className="bg-primary text-white cursor-pointer py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-primary-dark">
            {nombre}
        </button>
    );
}