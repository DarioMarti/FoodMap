export default function Toggle({ id, checked, onChange }) {
    return (
        <div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    id={id}
                    className="sr-only peer" 
                    checked={checked} 
                    onChange={onChange} 
                />
                <div className="
                    relative w-20 h-10
                    bg-background border-2 border-borde-dark
                    rounded-full
                    peer-checked:bg-primary peer-checked:border-primary
                    transition-all duration-300
                    after:content-['']
                    after:absolute after:top-[3px] after:start-[3px]
                    after:bg-borde-dark after:rounded-full
                    after:h-[30px] after:w-[30px]
                    after:transition-all after:duration-300
                    peer-checked:after:translate-x-10
                    peer-checked:after:bg-white
                "></div>
            </label>
        </div>
    );
}
