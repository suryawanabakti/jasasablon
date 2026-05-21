import { Head, Link } from '@inertiajs/react';
import React from 'react';
import CustomerLayout from '@/layouts/customer-layout';

export default function Materials() {
    const materials = [
        {
            name: 'Cotton Combed 30s',
            type: 'Kaos',
            desc: 'Bahan paling populer untuk distro. Karakteristik kain tipis, adem, sangat lembut, dan menyerap keringat dengan sangat baik.',
            features: [
                'Lembut & Nyaman',
                'Menyerap Keringat',
                'Tidak Mudah Menyusut',
            ],
            color: 'from-orange-500 to-orange-600',
        },
        {
            name: 'Cotton Combed 24s',
            type: 'Kaos',
            desc: 'Sedikit lebih tebal dibanding 30s. Pilihan tepat bagi Anda yang menginginkan kaos yang lebih berisi namun tetap adem.',
            features: [
                'Lebih Tebal',
                'Durabilitas Tinggi',
                'Hasil Sablon Maksimal',
            ],
            color: 'from-blue-500 to-blue-600',
        },
        {
            name: 'Cotton Bamboo',
            type: 'Kaos Premium',
            desc: 'Terbuat dari campuran serat kapas dan bambu. Sangat halus, memiliki sifat anti-bakteri, dan sangat ramah lingkungan.',
            features: ['Anti-Bakteri', 'Ultra Lembut', 'Sangat Adem'],
            color: 'from-emerald-500 to-emerald-600',
        },
        {
            name: 'Lacoste CVC',
            type: 'Polo Shirt',
            desc: 'Bahan rajutan dengan pola pori-pori kecil. Memberikan kesan formal namun tetap santai. Sangat awet dan tidak mudah pudar.',
            features: ['Pori-Pori Sirkulasi', 'Kesan Formal', 'Warna Awet'],
            color: 'from-indigo-500 to-indigo-600',
        },
        {
            name: 'Fleece Cotton',
            type: 'Hoodie & Jaket',
            desc: 'Memiliki lapisan bulu halus di bagian dalam. Sangat hangat dan nyaman digunakan di cuaca dingin atau malam hari.',
            features: ['Hangat & Lembut', 'Tebal', 'Fashionable'],
            color: 'from-rose-500 to-rose-600',
        },
        {
            name: 'American Drill',
            type: 'PDH & Almamater',
            desc: 'Karakteristik kain yang kuat, kaku, dan memiliki tekstur miring. Sangat cocok untuk seragam kantor, PDH, atau almamater.',
            features: ['Sangat Kuat', 'Tekstur Eksklusif', 'Warna Solid'],
            color: 'from-slate-700 to-slate-900',
        },
    ];

    return (
        <CustomerLayout>
            <Head>
                <title>Bahan Kain & Kaos - MOBSTER INDONESIA</title>
                <meta
                    name="description"
                    content="Kenali berbagai jenis bahan kain berkualitas premium untuk kebutuhan sablon dan konveksi Anda di MOBSTER INDONESIA."
                />
            </Head>

            {/* Header Section (kept inside layout main) */}
            <header className="relative overflow-hidden rounded-2xl bg-slate-900 pt-8 pb-8 lg:pt-12 lg:pb-10">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 h-full w-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <div className="absolute -top-48 -right-48 h-[600px] w-[600px] rounded-full bg-orange-600/20 blur-[120px]"></div>
                </div>
                <div className="relative z-10 container mx-auto px-6">
                    <div className="max-w-4xl py-8">
                        <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
                            <span className="text-[10px] font-black tracking-[0.2em] text-orange-500 uppercase">
                                Premium Quality Guide
                            </span>
                        </div>
                        <h1 className="mb-4 text-4xl leading-[1.1] font-black tracking-tighter text-white md:text-5xl">
                            Pilih{' '}
                            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent italic">
                                Bahan Terbaik
                            </span>{' '}
                            Untuk Karyamu.
                        </h1>
                        <p className="max-w-2xl text-lg leading-relaxed font-medium text-slate-400 md:text-xl">
                            Kualitas sablon yang juara dimulai dari pemilihan
                            bahan kain yang tepat. Pelajari karakteristik setiap
                            bahan untuk hasil yang maksimal.
                        </p>
                    </div>
                </div>
            </header>

            {/* Materials Grid */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {materials.map((mat, index) => (
                            <div
                                key={index}
                                className="group flex h-full flex-col rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]"
                            >
                                <div
                                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${mat.color} mb-8 flex transform items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                </div>
                                <div className="mb-4">
                                    <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase">
                                        {mat.type}
                                    </span>
                                    <h3 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                                        {mat.name}
                                    </h3>
                                </div>
                                <p className="mb-8 flex-grow leading-relaxed font-medium text-slate-500">
                                    {mat.desc}
                                </p>
                                <div className="space-y-3">
                                    {mat.features.map((f, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center space-x-3"
                                        >
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-50 text-emerald-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-bold text-slate-600">
                                                {f}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="group relative overflow-hidden rounded-[4rem] bg-orange-600 p-12 text-center text-white shadow-2xl lg:p-20">
                        <div className="absolute top-0 left-0 h-full w-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="mb-8 text-4xl font-black tracking-tighter md:text-6xl">
                                Sudah Tahu Bahan Mana yang Anda Butuhkan?
                            </h2>
                            <p className="mx-auto mb-12 max-w-2xl text-lg font-medium text-orange-100 md:text-xl">
                                Langsung konsultasikan desainmu dengan tim ahli
                                kami atau mulai buat pesananmu sekarang juga.
                            </p>
                            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                                <Link
                                    href="/register"
                                    className="rounded-3xl bg-white px-10 py-5 text-lg font-black text-orange-600 shadow-xl transition-all hover:bg-slate-100 active:scale-95"
                                >
                                    Mulai Pesan Sekarang
                                </Link>
                                <a
                                    href="https://wa.me/6281234567890"
                                    target="_blank"
                                    className="rounded-3xl border-2 border-white/30 bg-white/10 px-10 py-5 text-lg font-black text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
                                >
                                    Konsultasi Gratis
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </CustomerLayout>
    );
}
