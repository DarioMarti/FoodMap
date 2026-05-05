export default function Toggle() {
    return (
        <div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="
                    relative w-14 h-7
                    bg-background border-2 border-borde-dark
                    rounded-full
                    peer-checked:bg-primary peer-checked:border-primary
                    transition-all duration-300
                    after:content-['']
                    after:absolute after:top-[3px] after:start-[3px]
                    after:bg-borde-dark after:rounded-full
                    after:h-[18px] after:w-[18px]
                    after:transition-all after:duration-300
                    peer-checked:after:translate-x-7
                    peer-checked:after:bg-white
                "></div>
            </label>
        </div>
    );
}
