export default function Chat_mensaje({ texto, hora, isMe }) {
    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[70%] py-3 px-6 rounded-2xl ${isMe ? 'bg-primary text-white' : 'bg-background-claro text-text-main'}`}>
                <p className="text-lg ">{texto}</p>
                <span className="text-[12px] opacity-70 mt-1 block text-right">{hora}</span>
            </div>
        </div>
    );
}
