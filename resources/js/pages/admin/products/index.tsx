import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm, router, Link } from '@inertiajs/react';
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

export default function ProductsIndex({ products, filters }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const [sortBy, setSortBy] = useState(filters?.sortBy ?? '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/products', { search, sortBy }, { preserveState: true });
    };

    const handleSort = (newSort: string) => {
        setSortBy(newSort);
        router.get('/admin/products', { search, sortBy: newSort }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        setSortBy('');
        router.get('/admin/products', {}, { preserveState: true });
    };

    const deleteProduct = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Produk" />

            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Produk</h1>
                    <p className="text-slate-500 text-sm">Kelola katalog produk sablon yang tersedia.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <form onSubmit={handleSearch} className="relative group">
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-64 rounded-2xl border-slate-100 bg-white px-5 py-3 text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none pl-12"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </form>

                    <select
                        value={sortBy}
                        onChange={(e) => handleSort(e.target.value)}
                        className="rounded-2xl border-slate-100 bg-white px-5 py-3 text-sm font-bold text-slate-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none cursor-pointer"
                    >
                        <option value="">Terbaru</option>
                        <option value="price_asc">Harga Terendah</option>
                        <option value="price_desc">Harga Tertinggi</option>
                    </select>

                    {(search || sortBy) && (
                        <button
                            onClick={handleReset}
                            className="flex items-center space-x-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                            title="Reset Filter"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}

                    <Link
                        href="/admin/products/create"
                        className="rounded-2xl bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-700 active:scale-95 flex items-center justify-center space-x-2"
                    >
                        <span>+ Tambah</span>
                    </Link>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div key={product.id} className="group relative rounded-[2.5rem] border border-slate-100 bg-white p-4 transition-all hover:shadow-2xl hover:shadow-slate-200/60">
                        <Link href={`/admin/products/${product.id}`} className="aspect-[4/3] mb-6 overflow-hidden rounded-3xl bg-slate-50 relative block">
                            <img src={product.image || '/images/mockup.png'} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            {product.images && product.images.length > 1 && (
                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-slate-900 shadow-sm border border-white/50">
                                    {product.images.length} FOTO
                                </div>
                            )}
                        </Link>
                        <div className="px-2 pb-2">
                            <Link href={`/admin/products/${product.id}`}>
                                <h3 className="mb-1 text-xl font-black text-slate-900 hover:text-orange-600 transition-colors">{product.name}</h3>
                            </Link>
                            <p className="mb-4 text-xs font-bold text-orange-600 tracking-wider">Rp {product.price.toLocaleString()}</p>
                            <p className="mb-6 text-sm text-slate-500 line-clamp-2 leading-relaxed">{product.description}</p>

                            <div className="flex items-center space-x-2">
                                <Link
                                    href={`/admin/products/${product.id}/edit`}
                                    className="flex-1 rounded-xl bg-slate-100 py-3 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all text-center"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="flex-1 rounded-xl bg-red-50 py-3 text-xs font-bold text-red-600 hover:bg-red-100 transition-all"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
