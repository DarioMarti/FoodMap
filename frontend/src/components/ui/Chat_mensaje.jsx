import * as lucideIcons from 'lucide-react';

export default function Chat_mensaje({ texto, hora, isMe, isBot }) {
    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} gap-3`}>
            {isBot ? (
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <lucideIcons.Bot className="size-6 text-white" />
                </div>
            ) : null}
            <div className={`max-w-[70%] py-3 px-6 rounded-2xl ${isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-background-claro text-text-main rounded-tl-none'}`}>
                <p className="text-lg ">{texto}</p>
                <span className="text-[12px] opacity-70 mt-1 block text-right">{hora}</span>
            </div>
        </div>
    );
}
