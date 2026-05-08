import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function ChatAi() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
        { role: 'ai', text: 'Halo Kak! Saya Mobie, asisten AI Mobster Indonesia. Ada yang bisa saya bantu tentang sablon?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsTyping(true);

        try {
            const response = await axios.post('/ai-chat', {
                message: userMsg,
                history: messages.slice(-5) // Send last 5 messages for context
            });

            setMessages(prev => [...prev, { role: 'ai', text: response.data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: 'Maaf Kak, sepertinya koneksi saya sedang bermasalah. Coba lagi nanti ya!' }]);
        } finally {
            setIsTyping(false);
        }
    };

    const formatText = (text: string) => {
        // Handle Bold (**text**)
        const boldParts = text.split(/(\*\*.*?\*\*)/g);
        return boldParts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                const inner = part.slice(2, -2);
                // Handle Italic (*text*) inside Bold
                return <b key={i}>{formatItalic(inner)}</b>;
            }
            return formatItalic(part);
        });
    };

    const formatItalic = (text: string) => {
        const italicParts = text.split(/(\*.*?\*)/g);
        return italicParts.map((part, i) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                return <i key={i}>{part.slice(1, -1)}</i>;
            }
            return part;
        });
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-[100] h-16 w-16 rounded-full bg-slate-900 text-white shadow-2xl shadow-slate-900/40 transition-all hover:scale-110 active:scale-95 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            >
                <div className="relative">
                    <span className="text-2xl">🤖</span>
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-orange-600 animate-pulse border-2 border-slate-900"></span>
                </div>
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-8 right-8 z-[110] w-[calc(100vw-4rem)] md:w-[400px] h-[600px] max-h-[80vh] rounded-[2.5rem] bg-white shadow-2xl transition-all duration-500 origin-bottom-right border border-slate-100 overflow-hidden flex flex-col ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-20 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20">
                            🤖
                        </div>
                        <div>
                            <p className="font-black tracking-tight">Mobie CS AI</p>
                            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em]">Online Now</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="rounded-xl bg-white/10 p-2 text-white/60 hover:text-white transition-all">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed whitespace-pre-wrap ${
                                msg.role === 'user' 
                                    ? 'bg-slate-900 text-white rounded-tr-none shadow-lg' 
                                    : 'bg-white text-slate-700 rounded-tl-none shadow-sm border border-slate-100'
                            }`}>
                                {formatText(msg.text)}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-slate-100 flex space-x-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce"></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0.2s]"></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Tanya Mobie sesuatu..."
                        className="flex-1 rounded-2xl border-none bg-slate-50 px-4 py-3 text-sm focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                    />
                    <button
                        type="submit"
                        disabled={isTyping}
                        className="h-12 w-12 rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-600/20 flex items-center justify-center hover:bg-orange-700 active:scale-95 disabled:opacity-50 transition-all"
                    >
                        <svg className="h-5 w-5 transform rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </form>
            </div>
        </>
    );
}
