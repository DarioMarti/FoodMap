export default function Tarjeta_chat() {
    return (
        <div className="w-full flex border-b-3 border-borde  dark:border-borde-dark  p-4 justify-between bg-background ">
            <div className=" h-24 p-3 rounded-2xl flex gap-6">
                <img className="size-16 rounded-full bg-amber-600" src="" alt="" />
                <div className="flex-1">
                    <strong className="text-md font-semibold text-2xl">María</strong>
                    <p className="text-lg font-light mt-1">¿Qué vamos a comer hoy?</p>
                </div>
            </div>
            <div className=" h-24 p-3 rounded-2xl flex flex-col items-end gap-2">
                <p className="text-xl font-light">10:00</p>
                <span className="size-8 bg-primary rounded-full flex items-center justify-center text-input text-md font-semibold">2</span>
            </div>
        </div>
    );
}