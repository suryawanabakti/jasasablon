import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import React, { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function ProductCreate({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: 0,
        category_id: '' as string | number,
        images: [] as File[]
    });

    const [previews, setPreviews] = useState<{file: File, url: string}[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length === 0) return;

        const newEntries = files.map(file => ({
            file: file,
            url: URL.createObjectURL(file)
        }));

        const updatedPreviews = [...previews, ...newEntries];
        setPreviews(updatedPreviews);
        setData('images', updatedPreviews.map(p => p.file));
    };

    const removePreview = (index: number) => {
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
        setData('images', updatedPreviews.map(p => p.file));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/products');
    };

    return (
        <AdminLayout>
            <Head title="Tambah Produk Baru" />

            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Tambah Produk</h1>
                    <p className="text-slate-500 text-sm">Buat item baru untuk katalog produk sablon Anda.</p>
                </div>
                <Link
                    href="/admin/products"
                    className="rounded-2xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200 active:scale-95 flex items-center space-x-2"
                >
                    <span>Kembali</span>
                </Link>
            </div>

            <div className="max-w-4xl bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
                <form onSubmit={submit} className="space-y-8">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Nama Produk</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-2xl border-slate-100 bg-slate-50 px-5 py-4 text-sm focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="Masukkan nama produk..."
                                    required
                                />
                                {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Kategori</label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', Number(e.target.value))}
                                    className="w-full rounded-2xl border-slate-100 bg-slate-50 px-5 py-4 text-sm focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all outline-none cursor-pointer"
                                    required
                                >
                                    <option value="">Pilih Kategori...</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="mt-2 text-xs text-red-500 font-bold">{errors.category_id}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Harga (Rp)</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', Number(e.target.value))}
                                    className="w-full rounded-2xl border-slate-100 bg-slate-50 px-5 py-4 text-sm focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    placeholder="0"
                                    required
                                />
                                {errors.price && <p className="mt-2 text-xs text-red-500 font-bold">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full h-48 rounded-2xl border-slate-100 bg-slate-50 px-5 py-4 text-sm focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all outline-none resize-none"
                                    placeholder="Jelaskan detail produk..."
                                    required
                                ></textarea>
                                {errors.description && <p className="mt-2 text-xs text-red-500 font-bold">{errors.description}</p>}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Gambar Produk (Pilih Banyak)</label>
                                <div className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-slate-100 border-dashed rounded-[2rem] bg-slate-50 hover:border-orange-200 transition-all cursor-pointer relative group">
                                    <input
                                        type="file"
                                        multiple
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                    />
                                    <div className="space-y-2 text-center">
                                        <div className="mx-auto h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm group-hover:scale-110 transition-transform">
                                            <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="text-sm text-slate-600">
                                            <span className="font-bold text-orange-600">Klik untuk upload</span> atau drag and drop
                                        </div>
                                        <p className="text-xs text-slate-400">PNG, JPG up to 2MB (Bisa multiple)</p>
                                    </div>
                                </div>
                                {errors.images && <p className="mt-2 text-xs text-red-500 font-bold">{errors.images}</p>}
                            </div>

                            {previews.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 p-4 rounded-[2rem] bg-slate-50 border border-slate-100">
                                    {previews.map((preview, idx) => (
                                        <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden shadow-sm ring-2 ring-white">
                                            <img src={preview.url} className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removePreview(idx)}
                                                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-900"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-2xl bg-slate-900 px-10 py-5 text-sm font-black text-white shadow-2xl shadow-slate-900/20 hover:bg-orange-600 hover:shadow-orange-600/20 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Produk'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
