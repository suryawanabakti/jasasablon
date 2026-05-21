import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
}

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    user: { name: string };
    product: { name: string };
}

interface Props {
    products: Product[];
    reviews: Review[];
    company?: {
        name?: string;
        description?: string | null;
        address?: string | null;
        phone?: string | null;
        email?: string | null;
        instagram?: string | null;
        facebook?: string | null;
    };
}

export default function Welcome({
    products = [],
    reviews = [],
    company,
}: Props) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-orange-500 selection:text-white">
            <Head>
                <title>MOBSTER INDONESIA - Jasa Sablon Terpercaya</title>
                <meta
                    name="description"
                    content="Jasa Sablon kualitas premium dengan sistem DP 50%. Pesan kaos, hoodie, dan merch lainnya dengan mudah."
                />
            </Head>

            {/* Navbar */}
            <nav
                className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-white/80 py-4 shadow-sm backdrop-blur-xl' : 'bg-transparent py-6'}`}
            >
                <div className="container mx-auto flex items-center justify-between px-6">
                    <Link
                        href="/"
                        className="flex items-center text-2xl font-black tracking-tighter"
                    >
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            MOBSTER
                        </span>
                        <span className="ml-1 text-slate-900">INDONESIA</span>
                    </Link>
                    <div className="hidden space-x-10 lg:flex">
                        <Link
                            href="#products"
                            className="text-sm font-black tracking-widest text-slate-500 uppercase transition-colors hover:text-orange-600"
                        >
                            Produk
                        </Link>
                        <Link
                            href="/materials"
                            className="text-sm font-black tracking-widest text-slate-500 uppercase transition-colors hover:text-orange-600"
                        >
                            Bahan
                        </Link>
                        <Link
                            href="#features"
                            className="text-sm font-black tracking-widest text-slate-500 uppercase transition-colors hover:text-orange-600"
                        >
                            Keunggulan
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm font-black tracking-widest text-slate-500 uppercase transition-colors hover:text-orange-600"
                        >
                            Cara Pesan
                        </Link>
                        <Link
                            href="#testimonials"
                            className="text-sm font-black tracking-widest text-slate-500 uppercase transition-colors hover:text-orange-600"
                        >
                            Testimoni
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link
                            href="/login"
                            className="text-sm font-black tracking-widest text-slate-500 uppercase transition-colors hover:text-orange-600"
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-2xl bg-slate-900 px-8 py-3 text-xs font-black tracking-widest text-white uppercase shadow-xl shadow-slate-900/20 transition-all hover:bg-slate-800 active:scale-95"
                        >
                            Daftar
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative overflow-hidden pt-32 pb-20 lg:pt-56 lg:pb-40">
                <div className="absolute top-0 right-0 -z-10 h-[1000px] w-full overflow-hidden">
                    <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-orange-50/50 via-transparent to-transparent"></div>
                    <div className="absolute -top-48 -right-48 h-[800px] w-[800px] rounded-full bg-orange-200/20 blur-[120px]"></div>
                </div>

                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center lg:flex-row lg:gap-20">
                        <div className="text-center lg:w-3/5 lg:text-left">
                            <div className="mb-8 inline-flex items-center space-x-2 rounded-full bg-orange-100 px-4 py-2">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-orange-600"></span>
                                <span className="text-[10px] font-black tracking-[0.2em] text-orange-600 uppercase">
                                    Premium Screen Printing
                                </span>
                            </div>
                            <h1 className="mb-8 text-6xl leading-[1.1] font-black tracking-tighter text-slate-900 md:text-8xl">
                                Sablon Kelas{' '}
                                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-400 bg-clip-text text-transparent italic">
                                    Juara
                                </span>{' '}
                                Untuk Anda.
                            </h1>
                            <p className="mb-12 max-w-2xl text-lg leading-relaxed font-medium text-slate-500 md:text-2xl">
                                Wujudkan desain impianmu dengan kualitas cetak
                                terbaik. Proses cepat, hasil maksimal, dan
                                pembayaran fleksibel dengan sistem{' '}
                                <strong>DP 50%</strong>.
                            </p>
                            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 lg:justify-start">
                                <Link
                                    href="/register"
                                    className="rounded-[2rem] bg-orange-600 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-orange-600/40 transition-all hover:translate-y-[-2px] hover:bg-orange-700 active:scale-95"
                                >
                                    Mulai Pesan
                                </Link>
                                <Link
                                    href="#products"
                                    className="rounded-[2rem] border-2 border-slate-200 bg-white px-10 py-5 text-lg font-black text-slate-700 shadow-sm transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-95"
                                >
                                    Lihat Produk
                                </Link>
                            </div>
                        </div>
                        <div className="relative mt-20 lg:mt-0 lg:w-2/5">
                            <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-white/20">
                                <img
                                    src="/images/hero.jpeg"
                                    alt="Sablon Workshop"
                                    className="w-full transform transition-transform duration-1000 hover:scale-110"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 z-20 flex items-center space-x-4 rounded-3xl border border-slate-50 bg-white p-5 shadow-2xl">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="h-12 w-12 overflow-hidden rounded-full border-4 border-white bg-slate-100"
                                        >
                                            <img
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                                                alt="User"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="border-l border-slate-100 pr-4 pl-4">
                                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                        Dipercaya Oleh
                                    </p>
                                    <p className="text-lg font-black text-slate-900">
                                        500+ Customer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Section (DP 50%) */}
            <section id="features" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="shadow-3xl group relative overflow-hidden rounded-[4rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 text-center text-white lg:p-24">
                        <div className="absolute top-0 left-0 h-full w-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 transition-opacity group-hover:opacity-30"></div>
                        <div className="relative z-10">
                            <div className="mb-8 inline-block rounded-full bg-orange-600 px-4 py-1 text-[10px] font-black tracking-[0.3em] uppercase">
                                Special Offer
                            </div>
                            <h2 className="mb-8 text-5xl font-black tracking-tighter md:text-7xl">
                                Bisa DP Mulai 50%!
                            </h2>
                            <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed font-medium text-slate-300 md:text-2xl">
                                Kami mengerti kebutuhan Anda. Cukup bayar
                                setengah di awal, dan sisa pembayaran bisa
                                dilunasi saat barang siap dikirim. Mudah, aman,
                                dan terpercaya.
                            </p>
                            <Link
                                href="/register"
                                className="inline-block rounded-[2rem] bg-white px-12 py-5 text-xl font-black text-slate-900 shadow-2xl transition-all hover:scale-105 hover:bg-orange-600 hover:text-white active:scale-95"
                            >
                                Coba Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section
                id="products"
                className="relative overflow-hidden bg-white py-24"
            >
                <div className="container mx-auto px-6">
                    <div className="mb-20 flex flex-col items-center text-center">
                        <span className="text-[10px] font-black tracking-[0.4em] text-orange-600 uppercase">
                            Premium Selection
                        </span>
                        <h2 className="mt-4 text-5xl font-black tracking-tighter text-slate-900 md:text-7xl">
                            Katalog Produk
                        </h2>
                        <div className="mt-6 h-2 w-24 rounded-full bg-gradient-to-r from-orange-600 to-red-600"></div>
                    </div>

                    <div className="grid gap-12 md:grid-cols-3">
                        {products?.map((product, index) => (
                            <div
                                key={index}
                                className="group relative rounded-[3rem] border border-slate-100 bg-white p-5 transition-all hover:-translate-y-2 hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.1)]"
                            >
                                <div className="mb-8 aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-50 shadow-inner">
                                    <img
                                        src={
                                            product.image ||
                                            '/images/mockup.png'
                                        }
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="px-3 pb-6 text-center">
                                    <h3 className="mb-3 line-clamp-1 text-3xl font-black tracking-tight text-slate-900">
                                        {product.name}
                                    </h3>
                                    <p className="mb-8 line-clamp-2 text-sm leading-relaxed font-medium text-slate-500">
                                        {product.description}
                                    </p>
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="text-center">
                                            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                                Mulai Dari
                                            </span>
                                            <p className="text-3xl font-black tracking-tighter text-orange-600">
                                                Rp{' '}
                                                {product.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <Link
                                            href="/register"
                                            className="w-full rounded-2xl bg-slate-900 py-4 text-sm font-black tracking-widest text-white uppercase shadow-xl transition-all group-hover:bg-orange-600 group-hover:shadow-orange-600/20 active:scale-95"
                                        >
                                            Pesan Sekarang
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {reviews.length > 0 && (
                <section id="testimonials" className="bg-white py-24">
                    <div className="container mx-auto px-6">
                        <div className="mb-20 text-center">
                            <span className="text-[10px] font-black tracking-[0.4em] text-orange-600 uppercase">
                                Testimonials
                            </span>
                            <h2 className="mt-4 text-5xl font-black tracking-tighter text-slate-900 md:text-7xl">
                                Apa Kata Mereka?
                            </h2>
                        </div>

                        <div className="grid gap-10 md:grid-cols-3">
                            {reviews?.map((review) => (
                                <div
                                    key={review.id}
                                    className="relative rounded-[2.5rem] border border-transparent bg-slate-50 p-10 transition-all hover:border-slate-100 hover:bg-white hover:shadow-xl"
                                >
                                    <div className="mb-6 flex text-orange-400">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={
                                                    i < review.rating
                                                        ? 'text-yellow-400'
                                                        : 'text-slate-200'
                                                }
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <p className="mb-8 text-lg leading-relaxed font-medium text-slate-600 italic">
                                        "{review.comment}"
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-black text-orange-600">
                                            {review.user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900">
                                                {review.user.name}
                                            </h4>
                                            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                                                {review.product.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* How It Works */}
            <section id="how-it-works" className="bg-[#F8FAFC] py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-20 text-center">
                        <span className="text-[10px] font-black tracking-[0.4em] text-orange-600 uppercase">
                            Work Flow
                        </span>
                        <h2 className="mt-4 text-5xl font-black tracking-tighter text-slate-900 md:text-7xl">
                            Cara Kerja
                        </h2>
                    </div>

                    <div className="grid gap-10 md:grid-cols-4">
                        {[
                            {
                                step: '01',
                                title: 'Pilih Produk',
                                desc: 'Pilih jenis kaos atau hoodie yang Anda inginkan.',
                            },
                            {
                                step: '02',
                                title: 'Upload Desain',
                                desc: 'Unggah desain atau kirim instruksi sablon Anda.',
                            },
                            {
                                step: '03',
                                title: 'Bayar DP 50%',
                                desc: 'Bayar uang muka untuk memulai proses produksi.',
                            },
                            {
                                step: '04',
                                title: 'Pelunasan',
                                desc: 'Bayar sisa pembayaran saat barang selesai dikerjakan.',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group relative rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm transition-all hover:border-orange-200"
                            >
                                <span className="absolute top-6 right-8 text-7xl font-black text-slate-50 transition-colors group-hover:text-orange-50">
                                    {item.step}
                                </span>
                                <h3 className="relative z-10 mb-6 text-2xl font-black tracking-tight text-slate-900">
                                    {item.title}
                                </h3>
                                <p className="relative z-10 leading-relaxed font-medium text-slate-500">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 pt-24 pb-12 text-slate-400">
                <div className="container mx-auto px-6">
                    <div className="grid gap-16 md:grid-cols-4 lg:gap-24">
                        <div className="md:col-span-2">
                            <Link
                                href="/"
                                className="mb-8 block text-3xl font-black tracking-tighter text-white"
                            >
                                <span className="text-orange-600">MOBSTER</span>{' '}
                                INDONESIA
                            </Link>
                            <p className="mb-10 max-w-md text-lg leading-relaxed font-medium text-slate-500">
                                {company?.description ??
                                    'Jasa sablon terpercaya dengan kualitas premium dan pelayanan terbaik untuk komunitas, organisasi, dan perorangan. Solusi cetak profesional sejak 2026.'}
                            </p>
                            <div className="flex space-x-6">
                                {company?.facebook ? (
                                    <a
                                        href={
                                            company.facebook.startsWith('http')
                                                ? company.facebook
                                                : `https://facebook.com/${company.facebook.replace(/^@/, '')}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xs font-black text-slate-500 shadow-lg transition-all hover:bg-orange-600 hover:text-white"
                                    >
                                        FB
                                    </a>
                                ) : null}
                                {company?.instagram ? (
                                    <a
                                        href={
                                            company.instagram.startsWith('http')
                                                ? company.instagram
                                                : `https://instagram.com/${company.instagram.replace(/^@/, '')}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xs font-black text-slate-500 shadow-lg transition-all hover:bg-orange-600 hover:text-white"
                                    >
                                        IG
                                    </a>
                                ) : null}
                                {/* fallback placeholders if socials not set */}
                                {!company?.facebook && !company?.instagram && (
                                    <>
                                        <a
                                            href="#"
                                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xs font-black text-slate-500 shadow-lg transition-all hover:bg-orange-600 hover:text-white"
                                        >
                                            FB
                                        </a>
                                        <a
                                            href="#"
                                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xs font-black text-slate-500 shadow-lg transition-all hover:bg-orange-600 hover:text-white"
                                        >
                                            IG
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-8 text-xs font-black tracking-[0.2em] text-white uppercase">
                                Produk
                            </h4>
                            <ul className="space-y-5 text-sm font-bold">
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-orange-600"
                                    >
                                        Sablon Kaos Premium
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-orange-600"
                                    >
                                        Hoodie & Sweater
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-orange-600"
                                    >
                                        Totebag Kanvas
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-orange-600"
                                    >
                                        Merchandise Custom
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-8 text-xs font-black tracking-[0.2em] text-white uppercase">
                                Info Kontak
                            </h4>
                            <ul className="space-y-5 text-sm font-bold">
                                <li>
                                    <span className="flex items-start space-x-3 text-slate-500 italic">
                                        <span>📍</span>
                                        <span className="leading-relaxed">
                                            {company?.address ??
                                                'Komp. Kodam Katangka No.E/-/01, RT.002/RW.02, Gn. Sari, Kec. Rappocini, Kota Makassar, Sulawesi Selatan 90222'}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span>📞</span>
                                    <span>
                                        {company?.phone ?? '+62 812 3456 7890'}
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span>✉️</span>
                                    <span>
                                        {company?.email ?? 'hello@mobster.id'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-10 border-t border-slate-900 pt-10 text-center">
                        <div className="mb-4 flex items-center justify-center gap-4">
                            {company?.instagram ? (
                                <a
                                    href={
                                        company.instagram.startsWith('http')
                                            ? company.instagram
                                            : `https://instagram.com/${company.instagram.replace(/^@/, '')}`
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-xs font-black text-slate-500 shadow-lg transition-all hover:bg-orange-600 hover:text-white"
                                >
                                    IG
                                </a>
                            ) : null}
                            {company?.facebook ? (
                                <a
                                    href={
                                        company.facebook.startsWith('http')
                                            ? company.facebook
                                            : `https://facebook.com/${company.facebook.replace(/^@/, '')}`
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-xs font-black text-slate-500 shadow-lg transition-all hover:bg-orange-600 hover:text-white"
                                >
                                    FB
                                </a>
                            ) : null}
                        </div>
                        <p className="text-[10px] font-black tracking-[0.4em] text-slate-700 uppercase">
                            © 2026 {company?.name ?? 'MOBSTER INDONESIA'}.
                            Developed for Excellence.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
