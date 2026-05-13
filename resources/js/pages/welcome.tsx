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
}

export default function Welcome({ products = [], reviews = [] }: Props) {
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
                <meta name="description" content="Jasa Sablon kualitas premium dengan sistem DP 50%. Pesan kaos, hoodie, dan merch lainnya dengan mudah." />
            </Head>

            {/* Navbar */}
            <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto flex items-center justify-between px-6">
                    <Link href="/" className="text-2xl font-black tracking-tighter flex items-center">
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">MOBSTER</span>
                        <span className="text-slate-900 ml-1">INDONESIA</span>
                    </Link>
                    <div className="hidden space-x-10 lg:flex">
                        <Link href="#products" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-orange-600 transition-colors">Produk</Link>
                        <Link href="/materials" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-orange-600 transition-colors">Bahan</Link>
                        <Link href="#features" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-orange-600 transition-colors">Keunggulan</Link>
                        <Link href="#how-it-works" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-orange-600 transition-colors">Cara Pesan</Link>
                        <Link href="#testimonials" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-orange-600 transition-colors">Testimoni</Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link href="/login" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-orange-600 transition-colors">Masuk</Link>
                        <Link href="/register" className="rounded-2xl bg-slate-900 px-8 py-3 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95">Daftar</Link>
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
                            <div className="inline-flex items-center space-x-2 rounded-full bg-orange-100 px-4 py-2 mb-8">
                                <span className="h-2 w-2 rounded-full bg-orange-600 animate-pulse"></span>
                                <span className="text-[10px] font-black tracking-[0.2em] text-orange-600 uppercase">Premium Screen Printing</span>
                            </div>
                            <h1 className="mb-8 text-6xl font-black leading-[1.1] text-slate-900 md:text-8xl tracking-tighter">
                                Sablon Kelas <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-400 bg-clip-text text-transparent italic">Juara</span> Untuk Anda.
                            </h1>
                            <p className="mb-12 text-lg leading-relaxed text-slate-500 md:text-2xl max-w-2xl font-medium">
                                Wujudkan desain impianmu dengan kualitas cetak terbaik. Proses cepat, hasil maksimal, dan pembayaran fleksibel dengan sistem <strong>DP 50%</strong>.
                            </p>
                            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center lg:justify-start">
                                <Link href="/register" className="rounded-[2rem] bg-orange-600 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-orange-600/40 hover:bg-orange-700 transition-all hover:translate-y-[-2px] active:scale-95">Mulai Pesan</Link>
                                <Link href="#products" className="rounded-[2rem] border-2 border-slate-200 bg-white px-10 py-5 text-lg font-black text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all active:scale-95 shadow-sm">Lihat Produk</Link>
                            </div>
                        </div>
                        <div className="relative mt-20 lg:mt-0 lg:w-2/5">
                            <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-white/20">
                                <img src="/images/hero.jpeg" alt="Sablon Workshop" className="w-full transform transition-transform duration-1000 hover:scale-110" />
                            </div>
                            <div className="absolute -bottom-8 -left-8 z-20 flex items-center space-x-4 rounded-3xl bg-white p-5 shadow-2xl border border-slate-50">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-slate-100 overflow-hidden">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                                        </div>
                                    ))}
                                </div>
                                <div className="pr-4 border-l border-slate-100 pl-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dipercaya Oleh</p>
                                    <p className="text-lg font-black text-slate-900">500+ Customer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Section (DP 50%) */}
            <section id="features" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="rounded-[4rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 text-center text-white lg:p-24 shadow-3xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="inline-block bg-orange-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">Special Offer</div>
                            <h2 className="mb-8 text-5xl font-black md:text-7xl tracking-tighter">Bisa DP Mulai 50%!</h2>
                            <p className="mx-auto mb-12 max-w-3xl text-lg text-slate-300 md:text-2xl leading-relaxed font-medium">
                                Kami mengerti kebutuhan Anda. Cukup bayar setengah di awal, dan sisa pembayaran bisa dilunasi saat barang siap dikirim. Mudah, aman, dan terpercaya.
                            </p>
                            <Link href="/register" className="inline-block rounded-[2rem] bg-white px-12 py-5 text-xl font-black text-slate-900 shadow-2xl hover:bg-orange-600 hover:text-white transition-all hover:scale-105 active:scale-95">Coba Sekarang</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="mb-20 flex flex-col items-center text-center">
                        <span className="text-[10px] font-black tracking-[0.4em] text-orange-600 uppercase">Premium Selection</span>
                        <h2 className="mt-4 text-5xl font-black text-slate-900 md:text-7xl tracking-tighter">Katalog Produk</h2>
                        <div className="mt-6 h-2 w-24 rounded-full bg-gradient-to-r from-orange-600 to-red-600"></div>
                    </div>

                    <div className="grid gap-12 md:grid-cols-3">
                        {products?.map((product, index) => (
                            <div key={index} className="group relative rounded-[3rem] border border-slate-100 bg-white p-5 transition-all hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-2">
                                <div className="aspect-[4/5] mb-8 overflow-hidden rounded-[2.5rem] bg-slate-50 shadow-inner">
                                    <img src={product.image || '/images/mockup.png'} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="px-3 pb-6 text-center">
                                    <h3 className="mb-3 text-3xl font-black text-slate-900 tracking-tight line-clamp-1">{product.name}</h3>
                                    <p className="mb-8 text-sm text-slate-500 leading-relaxed font-medium line-clamp-2">{product.description}</p>
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="text-center">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mulai Dari</span>
                                            <p className="text-3xl font-black text-orange-600 tracking-tighter">Rp {product.price.toLocaleString()}</p>
                                        </div>
                                        <Link href="/register" className="w-full rounded-2xl bg-slate-900 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all group-hover:bg-orange-600 group-hover:shadow-orange-600/20 active:scale-95">
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
                <section id="testimonials" className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="mb-20 text-center">
                            <span className="text-[10px] font-black tracking-[0.4em] text-orange-600 uppercase">Testimonials</span>
                            <h2 className="mt-4 text-5xl font-black text-slate-900 md:text-7xl tracking-tighter">Apa Kata Mereka?</h2>
                        </div>

                        <div className="grid gap-10 md:grid-cols-3">
                            {reviews?.map((review) => (
                                <div key={review.id} className="relative rounded-[2.5rem] bg-slate-50 p-10 transition-all hover:shadow-xl hover:bg-white border border-transparent hover:border-slate-100">
                                    <div className="mb-6 flex text-orange-400">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-slate-200'}>★</span>
                                        ))}
                                    </div>
                                    <p className="mb-8 text-lg font-medium leading-relaxed text-slate-600 italic">"{review.comment}"</p>
                                    <div className="flex items-center space-x-4">
                                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center font-black text-orange-600">
                                            {review.user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900">{review.user.name}</h4>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{review.product.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-[#F8FAFC]">
                <div className="container mx-auto px-6">
                    <div className="mb-20 text-center">
                        <span className="text-[10px] font-black tracking-[0.4em] text-orange-600 uppercase">Work Flow</span>
                        <h2 className="mt-4 text-5xl font-black text-slate-900 md:text-7xl tracking-tighter">Cara Kerja</h2>
                    </div>

                    <div className="grid gap-10 md:grid-cols-4">
                        {[
                            { step: '01', title: 'Pilih Produk', desc: 'Pilih jenis kaos atau hoodie yang Anda inginkan.' },
                            { step: '02', title: 'Upload Desain', desc: 'Unggah desain atau kirim instruksi sablon Anda.' },
                            { step: '03', title: 'Bayar DP 50%', desc: 'Bayar uang muka untuk memulai proses produksi.' },
                            { step: '04', title: 'Pelunasan', desc: 'Bayar sisa pembayaran saat barang selesai dikerjakan.' },
                        ].map((item, index) => (
                            <div key={index} className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all hover:border-orange-200">
                                <span className="absolute top-6 right-8 text-7xl font-black text-slate-50 transition-colors group-hover:text-orange-50">{item.step}</span>
                                <h3 className="mb-6 text-2xl font-black text-slate-900 relative z-10 tracking-tight">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed relative z-10 font-medium">{item.desc}</p>
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
                            <Link href="/" className="mb-8 block text-3xl font-black tracking-tighter text-white">
                                <span className="text-orange-600">MOBSTER</span> INDONESIA
                            </Link>
                            <p className="mb-10 text-lg leading-relaxed text-slate-500 font-medium max-w-md">
                                Jasa sablon terpercaya dengan kualitas premium dan pelayanan terbaik untuk komunitas, organisasi, dan perorangan. Solusi cetak profesional sejak 2026.
                            </p>
                            <div className="flex space-x-6">
                                {['FB', 'IG', 'TW', 'YT'].map((sc) => (
                                    <a key={sc} href="#" className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-xs font-black text-slate-500 hover:bg-orange-600 hover:text-white transition-all shadow-lg">{sc}</a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-8 font-black text-white uppercase tracking-[0.2em] text-xs">Produk</h4>
                            <ul className="space-y-5 text-sm font-bold">
                                <li><a href="#" className="hover:text-orange-600 transition-colors">Sablon Kaos Premium</a></li>
                                <li><a href="#" className="hover:text-orange-600 transition-colors">Hoodie & Sweater</a></li>
                                <li><a href="#" className="hover:text-orange-600 transition-colors">Totebag Kanvas</a></li>
                                <li><a href="#" className="hover:text-orange-600 transition-colors">Merchandise Custom</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-8 font-black text-white uppercase tracking-[0.2em] text-xs">Info Kontak</h4>
                            <ul className="space-y-5 text-sm font-bold">
                                <li>
                                    <span className="flex items-start space-x-3 italic text-slate-500">
                                        <span>📍</span>
                                        <span className="leading-relaxed">Komp. Kodam Katangka No.E/-/01, RT.002/RW.02, Gn. Sari, Kec. Rappocini, Kota Makassar, Sulawesi Selatan 90222</span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span>📞</span>
                                    <span>+62 812 3456 7890</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span>✉️</span>
                                    <span>hello@mobster.id</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-20 border-t border-slate-900 pt-10 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">© 2026 MOBSTER INDONESIA. Developed for Excellence.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
