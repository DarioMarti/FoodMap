export default function NavItem({ icon, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all ${active
                ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20'
                : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
        >
            {icon}
        </button>
    );
}