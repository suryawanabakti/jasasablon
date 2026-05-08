import CustomerLayout from '@/layouts/customer-layout';
import { Head, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

interface ProductImage {
    id: number;
    image: string;
    is_primary: boolean;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
    images: ProductImage[];
}

interface Props {
    products: Product[];
    filters: {
        search?: string;
        sortBy?: string;
    }
}

function ProductCard({ product, openOrderModal }: { product: Product, openOrderModal: (p: Product) => void }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const displayImages = product.images && product.images.length > 0
        ? product.images
        : [{ id: 0, image: product.image || '/images/mockup.png', is_primary: true }];

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveImageIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    };

    return (
        <div className="group relative rounded-[2.5rem] border border-slate-100 bg-white p-4 transition-all hover:shadow-2xl hover:shadow-slate-200/60 flex flex-col">
            <div className="aspect-[4/3] mb-6 overflow-hidden rounded-3xl bg-slate-50 relative group/img">
                <img
                    src={displayImages[activeImageIndex].image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {displayImages.length > 1 && (
                    <>
                        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <button onClick={prevImage} className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-900 shadow-sm hover:bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={nextImage} className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-900 shadow-sm hover:bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5">
                            {displayImages.map((_, idx) => (
                                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeImageIndex ? 'w-4 bg-orange-600' : 'w-1.5 bg-slate-300'}`}></div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="px-2 pb-2 flex-1 flex flex-col">
                <h3 className="mb-1 text-xl font-black text-slate-900">{product.name}</h3>
                <p className="mb-4 text-sm font-bold text-orange-600 tracking-wider">Rp {product.price.toLocaleString()}</p>
                <p className="mb-8 text-sm text-slate-500 leading-relaxed line-clamp-3">{product.description}</p>

                <button
                    onClick={() => openOrderModal(product)}
                    className="mt-auto w-full rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 active:scale-95"
                >
                    Pesan Sekarang
                </button>
            </div>
        </div>
    );
}

export default function ProductsIndex({ products, filters }: Props) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState(filters?.search ?? '');
    const [sortBy, setSortBy] = useState(filters?.sortBy ?? '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/products', { search, sortBy }, { preserveState: true });
    };

    const handleSort = (newSort: string) => {
        setSortBy(newSort);
        router.get('/products', { search, sortBy: newSort }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        setSortBy('');
        router.get('/products', {}, { preserveState: true });
    };

    const { data, setData, post, processing, reset } = useForm({
        product_id: '',
        qty: 1,
        note: '',
        design: null as File | null
    });

    const openOrderModal = (product: Product) => {
        setSelectedProduct(product);
        setData({
            product_id: product.id.toString(),
            qty: 1,
            note: '',
            design: null
        });
        setIsModalOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/orders', {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            }
        });
    };

    return (
        <CustomerLayout>
            <Head title="Katalog Produk Sablon" />

            <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-black text-slate-900">Katalog Produk</h1>
                    <p className="text-slate-500 mt-2">Pilih produk terbaik kami untuk kebutuhan sablon Anda.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <form onSubmit={handleSearch} className="relative group flex-1 sm:w-80">
                        <input
                            type="text"
                            placeholder="Cari kaos, hoodie, atau jersey..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-[1.5rem] border-slate-100 bg-white px-6 py-4 text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none pl-14 shadow-sm"
                        />
                        <svg className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </form>

                    <div className="flex items-center space-x-3">
                        <label className="hidden sm:block text-xs font-black uppercase tracking-widest text-slate-400">Urutkan:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => handleSort(e.target.value)}
                            className="flex-1 sm:flex-none rounded-[1.5rem] border-slate-100 bg-white px-6 py-4 text-sm font-bold text-slate-700 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none cursor-pointer shadow-sm"
                        >
                            <option value="">Terbaru</option>
                            <option value="price_asc">Harga Terendah</option>
                            <option value="price_desc">Harga Tertinggi</option>
                        </select>

                        {(search || sortBy) && (
                            <button
                                onClick={handleReset}
                                className="flex items-center space-x-2 rounded-[1.5rem] bg-slate-100 px-6 py-4 text-sm font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                                title="Reset Filter"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} openOrderModal={openOrderModal} />
                ))}
            </div>

            {/* Order Modal */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative w-full max-w-lg rounded-[2.5rem] bg-white p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h2 className="mb-6 text-2xl font-black text-slate-900">Konfirmasi Pesanan</h2>

                        <div className="mb-6 flex items-center space-x-4 rounded-2xl bg-slate-50 p-4">
                            <img src={selectedProduct.image || '/images/mockup.png'} className="h-16 w-16 rounded-xl object-cover" />
                            <div>
                                <p className="font-bold text-slate-900">{selectedProduct.name}</p>
                                <p className="text-xs font-bold text-orange-600">Rp {selectedProduct.price.toLocaleString()} / pcs</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Jumlah (pcs)</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.qty}
                                    onChange={(e) => setData('qty', Number(e.target.value))}
                                    className="w-full rounded-2xl border-slate-100 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Unggah Desain / Logo</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-100 border-dashed rounded-3xl bg-slate-50">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-slate-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-slate-600">
                                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500">
                                                <span>Klik untuk pilih file</span>
                                                <input
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={(e) => setData('design', e.target.files ? e.target.files[0] : null)}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                                        {data.design && (
                                            <p className="text-xs font-bold text-green-600">Terpilih: {data.design.name}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Catatan Pesanan</label>
                                <textarea
                                    value={data.note}
                                    onChange={(e) => setData('note', e.target.value)}
                                    className="w-full h-32 rounded-2xl border-slate-100 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all outline-none resize-none"
                                    placeholder="Warna kaos, ukuran, instruksi khusus, dll..."
                                ></textarea>
                            </div>

                            <div className="rounded-2xl bg-orange-50 p-4 text-center">
                                <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">Total Bayar</p>
                                <p className="text-3xl font-black text-orange-600">Rp {(selectedProduct.price * data.qty).toLocaleString()}</p>
                                <p className="mt-1 text-[10px] font-bold text-orange-400 uppercase tracking-widest">DP 50% (Rp {(selectedProduct.price * data.qty * 0.5).toLocaleString()})</p>
                            </div>

                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 rounded-2xl bg-slate-100 py-4 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-[2] rounded-2xl bg-orange-600 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {processing ? 'Memproses...' : 'Buat Pesanan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </CustomerLayout>
    );
}
