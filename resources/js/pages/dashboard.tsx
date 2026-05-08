import CustomerLayout from '@/layouts/customer-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

export default function Dashboard() {
    const { auth } = usePage().props as any;

    return (
        <CustomerLayout>
            <Head title="Dashboard Customer" />
            
            <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900">Halo, {auth.user.name.split(' ')[0]}! 👋</h1>
                <p className="text-slate-500 text-lg mt-2">Senang melihat Anda kembali. Apa yang ingin Anda sablon hari ini?</p>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
                <div className="group relative overflow-hidden rounded-[3rem] bg-orange-600 p-12 text-white shadow-2xl shadow-orange-600/30 transition-all hover:-translate-y-1">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4">Mulai Pesanan Baru</h2>
                        <p className="text-orange-100 mb-10 text-lg leading-relaxed max-w-xs">Jelajahi katalog produk kami dan buat desain impianmu jadi kenyataan.</p>
                        <Link href="/products" className="inline-block bg-white text-orange-600 font-black px-10 py-5 rounded-2xl shadow-xl hover:bg-orange-50 transition-all active:scale-95">
                            Lihat Katalog
                        </Link>
                    </div>
                    <div className="absolute -right-10 -bottom-10 text-[15rem] opacity-10 rotate-12 pointer-events-none">👕</div>
                </div>

                <div className="rounded-[3rem] bg-white p-12 border border-slate-100 shadow-sm flex flex-col justify-center">
                    <h2 className="text-2xl font-black mb-6 text-slate-900">Aktivitas Terakhir</h2>
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="text-5xl mb-6 opacity-20 grayscale">📦</div>
                        <p className="text-slate-400 font-bold mb-8">Belum ada aktivitas pesanan terbaru.</p>
                        <Link href="/orders" className="text-sm font-black text-orange-600 uppercase tracking-widest hover:underline">
                            Lihat Semua Pesanan
                        </Link>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
