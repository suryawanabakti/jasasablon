import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
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
    product: Product;
}

export default function ProductShow({ product }: Props) {
    const [activeImage, setActiveImage] = useState(product.image || '/images/mockup.png');

    const deleteProduct = () => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(`/admin/products/${product.id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title={`Detail Produk: ${product.name}`} />

            <div className="mb-10 flex items-center justify-between">
                <div>
                    <Link href="/admin/products" className="text-xs font-black uppercase tracking-[0.2em] text-orange-600 hover:text-orange-700 transition-colors flex items-center space-x-2 mb-2">
                        <span>← Kembali ke Daftar</span>
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900">{product.name}</h1>
                </div>
                <div className="flex items-center space-x-3">
                    <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-2xl bg-white border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition-all hover:border-slate-900 hover:text-slate-900 active:scale-95"
                    >
                        Edit Produk
                    </Link>
                    <button
                        onClick={deleteProduct}
                        className="rounded-2xl bg-red-50 px-6 py-3 text-sm font-bold text-red-600 transition-all hover:bg-red-100 active:scale-95"
                    >
                        Hapus
                    </button>
                </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
                {/* Images Section */}
                <div className="space-y-6">
                    <div className="aspect-[4/3] rounded-[3rem] overflow-hidden bg-white border border-slate-100 shadow-sm p-4">
                        <img src={activeImage} className="h-full w-full object-cover rounded-[2rem]" alt={product.name} />
                    </div>
                    
                    {product.images && product.images.length > 0 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img) => (
                                <button
                                    key={img.id}
                                    onClick={() => setActiveImage(img.image)}
                                    className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all ${activeImage === img.image ? 'border-orange-600 scale-95' : 'border-white hover:border-slate-200'}`}
                                >
                                    <img src={img.image} className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm space-y-8">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Harga Jual</label>
                            <p className="text-4xl font-black text-orange-600">Rp {product.price.toLocaleString()}</p>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Deskripsi Produk</label>
                            <div className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                                {product.description}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-50 grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Status</label>
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                    Aktif
                                </span>
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Dibuat Pada</label>
                                <p className="text-sm font-bold text-slate-900">
                                    {new Date(product.created_at as any).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
