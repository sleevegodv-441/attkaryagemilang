import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminMessages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

    useEffect(() => {
        fetchMessages();

        // Subscribe to real-time updates
        const channel = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                setMessages((prev) => [payload.new, ...prev]);
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            setMessages(data);
        }
        setLoading(false);
    };

    const handleMessageClick = async (message: any) => {
        setSelectedMessage(message);
        // Mark as read if it's currently unread
        if (!message.is_read) {
            const { error } = await supabase.from('messages').update({ is_read: true }).eq('id', message.id);
            if (!error) {
                setMessages(prev => prev.map(m => m.id === message.id ? { ...m, is_read: true } : m));
            }
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Delete this message?')) {
            const { error } = await supabase.from('messages').delete().eq('id', id);
            if (!error) {
                setMessages(prev => prev.filter(m => m.id !== id));
                if (selectedMessage?.id === id) setSelectedMessage(null);
            }
        }
    };

    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="-m-8 h-[calc(100vh)] flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined">inbox</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Inbox</h1>
                        <p className="text-xs text-gray-400">Pesan dari halaman Contact Us</p>
                    </div>
                </div>
            </div>

            {/* Split layout */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Message List */}
                <div className="w-full lg:w-1/3 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-gray-100 bg-white overflow-y-auto flex flex-col">
                    {loading ? (
                        <div className="p-6 flex justify-center"><span className="material-symbols-outlined animate-spin text-gray-400">progress_activity</span></div>
                    ) : messages.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
                            <span className="material-symbols-outlined text-4xl text-gray-300 mb-3">mark_email_read</span>
                            <p className="text-sm font-medium text-gray-500">Belum ada pesan masuk.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    onClick={() => handleMessageClick(m)}
                                    className={`p-4 cursor-pointer hover:bg-blue-50/50 transition-colors flex gap-3 ${selectedMessage?.id === m.id ? 'bg-blue-50' : m.is_read ? 'bg-white' : 'bg-white border-l-4 border-l-blue-500'}`}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${m.is_read ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-600'}`}>
                                            {m.name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className={`text-sm truncate pr-2 ${m.is_read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>{m.name}</p>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap">{formatDate(m.created_at).split(' ')[0]}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${m.service === 'konsultasi' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {m.service}
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-gray-500 truncate">{m.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Message Detail View */}
                <div className="w-full lg:w-2/3 h-1/2 lg:h-full bg-gray-50/50 flex flex-col overflow-hidden">
                    {selectedMessage ? (
                        <div className="flex-1 flex flex-col mx-auto w-full max-w-3xl p-8">
                            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">
                                {/* Detail Header */}
                                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-white">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                            {selectedMessage.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 leading-tight">{selectedMessage.name}</h2>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                <a href={`https://wa.me/${selectedMessage.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-green-600 transition-colors">
                                                    <span className="material-symbols-outlined text-[16px]">call</span>
                                                    {selectedMessage.phone || 'Nomor tidak disertakan'}
                                                </a>
                                                <span className="flex items-center gap-1 text-gray-400">
                                                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                                                    {formatDate(selectedMessage.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => handleDelete(selectedMessage.id, e)}
                                        className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                        title="Hapus Pesan"
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>

                                {/* Detail Body (Scrollable) */}
                                <div className="p-8 flex-1 overflow-y-auto">
                                    <div className="mb-6 inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-blue-100">
                                        Tipe Layanan: {selectedMessage.service === 'bangun' ? 'Bangun Baru' : selectedMessage.service === 'renovasi' ? 'Renovasi Total' : selectedMessage.service === 'interior' ? 'Desain Interior' : 'Konsultasi Umum'}
                                    </div>
                                    <div className="prose prose-sm max-w-none text-gray-700">
                                        <p className="whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                                    </div>
                                </div>

                                {/* Detail Footer (Actions) */}
                                <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
                                    <a
                                        href={`https://wa.me/${selectedMessage.phone?.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#1DA851] transition-colors flex-1"
                                    >
                                        <span className="material-symbols-outlined text-sm">chat</span> Balas via WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">mail</span>
                            <p className="font-medium">Pilih pesan di sebelah kiri untuk membaca.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
