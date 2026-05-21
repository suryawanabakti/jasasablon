import { Link, usePage } from '@inertiajs/react';
import React, { ReactNode, useState } from 'react';
import ChatAi from '@/components/chat-ai';

interface Props {
    children: ReactNode;
}

export default function CustomerLayout({ children }: Props) {
    const { auth } = usePage().props as any;
    const { url } = usePage();
    const user = auth?.user ?? null;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => url.startsWith(path);

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
        { name: 'Profil Saya', href: '/profile', icon: '🙍' },
        { name: 'Katalog Produk', href: '/products', icon: '👕' },
        { name: 'Bahan Kaos', href: '/materials', icon: '🧵' },
        { name: 'Pesanan Saya', href: '/orders', icon: '📦' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
                <div className="container mx-auto flex items-center justify-between px-6 py-5">
                    <Link
                        href="/"
                        className="flex items-center text-2xl font-black tracking-tighter"
                    >
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            MOBSTER
                        </span>
                        <span className="ml-1 text-slate-900">INDONESIA</span>
                    </Link>

                    <div className="hidden space-x-10 md:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-black tracking-widest uppercase transition-all hover:translate-y-[-1px] ${
                                    isActive(item.href)
                                        ? 'text-orange-600'
                                        : 'text-slate-500 hover:text-slate-900'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="hidden text-right lg:block">
                            <p className="text-xs font-black text-slate-900">
                                {user ? user.name : 'Guest'}
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl font-black text-white shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                            {user ? (
                                user.avatar ? (
                                    <img
                                        src={
                                            user.avatar +
                                            (user.updated_at
                                                ? `?v=${new Date(user.updated_at).getTime()}`
                                                : '')
                                        }
                                        alt={user.name ?? 'User'}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-lg">
                                        {(user.name ?? 'U').charAt(0)}
                                    </span>
                                )
                            ) : (
                                <Link
                                    href="/login"
                                    className="text-sm font-black text-slate-700"
                                >
                                    Masuk
                                </Link>
                            )}
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-xl bg-slate-50 p-2 text-slate-500 transition-all active:scale-95 md:hidden"
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
                        {user ? (
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="hidden items-center space-x-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500 shadow-sm transition-all hover:bg-red-50 hover:text-red-600 md:flex"
                            >
                                <span>Keluar</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1H7m6 4v1H7m6 4v1H7"
                                    />
                                </svg>
                            </Link>
                        ) : (
                            <div className="hidden items-center space-x-3 md:flex">
                                <Link
                                    href="/login"
                                    className="text-sm font-black text-slate-700"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-2xl bg-slate-900 px-3 py-2 text-xs font-black text-white"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-x-0 top-[73px] z-50 origin-top space-y-4 border-b border-slate-100 bg-white p-6 shadow-2xl transition-all duration-300 md:hidden ${
                        isMenuOpen
                            ? 'visible scale-y-100 opacity-100'
                            : 'invisible scale-y-0 opacity-0'
                    }`}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-4 rounded-2xl p-4 text-lg font-black transition-all ${
                                isActive(item.href)
                                    ? 'bg-orange-50 text-orange-600'
                                    : 'text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                    {user ? (
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center space-x-4 rounded-2xl border-t border-slate-100 p-4 pt-4 text-lg font-black text-red-600"
                        >
                            <span className="text-2xl">🚪</span>
                            <span>Keluar</span>
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="flex w-full items-center space-x-4 rounded-2xl border-t border-slate-100 p-4 pt-4 text-lg font-black text-slate-900"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="text-2xl">🔐</span>
                            <span>Masuk</span>
                        </Link>
                    )}
                </div>
            </nav>

            <main className="animate-in fade-in slide-in-from-bottom-4 container mx-auto max-w-7xl px-6 py-12 duration-700">
                {children}
            </main>

            <footer className="container mx-auto mt-20 border-t border-slate-200 px-6 py-12">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="text-center md:text-left">
                        <p className="flex items-center justify-center text-lg font-black tracking-tighter md:justify-start">
                            <span className="text-orange-600">MOBSTER</span>
                            <span className="ml-1 text-slate-900">
                                INDONESIA
                            </span>
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-400">
                            Solusi Sablon Berkualitas & Terpercaya.
                        </p>
                    </div>
                    <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                        © 2026 MOBSTER INDONESIA. All Rights Reserved.
                    </p>
                </div>
            </footer>
            <ChatAi />
        </div>
    );
}
