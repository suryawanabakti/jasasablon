import { Link, usePage } from '@inertiajs/react';
import React, { ReactNode, useState } from 'react';

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const { auth } = usePage().props as any;
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (path: string) => url.startsWith(path);

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
        { name: 'Pesanan', href: '/admin/orders', icon: '📦' },
        { name: 'Produk', href: '/admin/products', icon: '👕' },
        { name: 'Pembayaran', href: '/admin/payments', icon: '💳' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:hidden sticky top-0 z-50">
                <Link href="/" className="text-xl font-black tracking-tighter flex items-center">
                    <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">MOBSTER</span>
                    <span className="text-slate-900 ml-1">INDONESIA</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="rounded-xl bg-slate-50 p-2 text-slate-500 active:scale-95 transition-all"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[2px] lg:hidden transition-all duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 z-[70] h-screen w-72 border-r border-slate-200 bg-[#0F172A] text-white transition-all duration-300 lg:translate-x-0 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex h-full flex-col p-8">
                    <div className="mb-12 flex items-center justify-between px-2">
                        <div>
                            <Link href="/" className="text-2xl font-black tracking-tighter flex flex-col">
                                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">MOBSTER</span>
                                <span className="text-white text-sm tracking-[0.3em] font-light -mt-1 opacity-80">INDONESIA</span>
                            </Link>
                            <div className="mt-4 flex items-center space-x-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Control</p>
                            </div>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <nav className="flex-1 space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center space-x-4 rounded-2xl px-5 py-4 text-sm font-bold transition-all group ${
                                    isActive(item.href)
                                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-600/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive(item.href) ? 'scale-110' : ''}`}>{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto border-t border-white/10 pt-8">
                        <div className="flex items-center space-x-4 px-2 mb-8 group cursor-pointer">
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:rotate-6 transition-all duration-300">
                                {auth.user.name.charAt(0)}
                            </div>
                            <div className="truncate">
                                <p className="text-sm font-black text-white truncate">{auth.user.name}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Master Admin</p>
                            </div>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="w-full rounded-2xl bg-white/5 py-4 text-sm font-bold text-slate-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1H7m6 4v1H7m6 4v1H7"/></svg>
                            <span>Sign Out</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-72 transition-all duration-300">
                <header className="hidden lg:flex items-center justify-between px-10 py-6 bg-white/50 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-40">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace</p>
                        <h2 className="text-sm font-black text-slate-900 capitalize">{url.split('/')[2] || 'Dashboard'}</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                        </div>
                    </div>
                </header>
                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
