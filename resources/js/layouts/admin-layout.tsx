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
        { name: 'Pengaturan', href: '/admin/settings/company', icon: '⚙️' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            {/* Mobile Header */}
            <div className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:hidden">
                <Link
                    href="/"
                    className="flex items-center text-xl font-black tracking-tighter"
                >
                    <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        MOBSTER
                    </span>
                    <span className="ml-1 text-slate-900">INDONESIA</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="rounded-xl bg-slate-50 p-2 text-slate-500 transition-all active:scale-95"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[2px] transition-all duration-300 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-[70] h-screen w-72 border-r border-slate-200 bg-[#0F172A] text-white transition-all duration-300 lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col p-8">
                    <div className="mb-12 flex items-center justify-between px-2">
                        <div>
                            <Link
                                href="/"
                                className="flex flex-col text-2xl font-black tracking-tighter"
                            >
                                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                    MOBSTER
                                </span>
                                <span className="-mt-1 text-sm font-light tracking-[0.3em] text-white opacity-80">
                                    INDONESIA
                                </span>
                            </Link>
                            <div className="mt-4 flex items-center space-x-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    Admin Control
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-slate-400 transition-colors hover:text-white lg:hidden"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex-1 space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`group flex items-center space-x-4 rounded-2xl px-5 py-4 text-sm font-bold transition-all ${
                                    isActive(item.href)
                                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-600/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <span
                                    className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive(item.href) ? 'scale-110' : ''}`}
                                >
                                    {item.icon}
                                </span>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto border-t border-white/10 pt-8">
                        <div className="group mb-8 flex cursor-pointer items-center space-x-4 px-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-black text-white shadow-lg transition-all duration-300 group-hover:rotate-6">
                                {auth.user.name.charAt(0)}
                            </div>
                            <div className="truncate">
                                <p className="truncate text-sm font-black text-white">
                                    {auth.user.name}
                                </p>
                                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                                    Master Admin
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-white/5 py-4 text-sm font-bold text-slate-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1H7m6 4v1H7m6 4v1H7"
                                />
                            </svg>
                            <span>Sign Out</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="transition-all duration-300 lg:pl-72">
                <header className="sticky top-0 z-40 hidden items-center justify-between border-b border-slate-100 bg-white/50 px-10 py-6 backdrop-blur-sm lg:flex">
                    <div>
                        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                            Workspace
                        </p>
                        <h2 className="text-sm font-black text-slate-900 capitalize">
                            {url.split('/')[2] || 'Dashboard'}
                        </h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </div>
                    </div>
                </header>
                <div className="mx-auto max-w-7xl p-6 md:p-10">{children}</div>
            </main>
        </div>
    );
}
