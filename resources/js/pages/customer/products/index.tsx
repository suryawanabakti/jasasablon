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

interface Addon {
    id: number;
    name: string;
    description: string | null;
    price: number;
}

interface Category {
    id: number;
    name: string;
}

interface Props {
    products: Product[];
    categories: Category[];
    addons: Addon[];
    filters: {
        search?: string;
        sortBy?: string;
        category_id?: string;
    };
}

function ProductCard({
    product,
    openOrderModal,
}: {
    product: Product;
    openOrderModal: (p: Product) => void;
}) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const displayImages =
        product.images && product.images.length > 0
            ? product.images
            : [
                {
                    id: 0,
                    image: product.image || '/images/mockup.png',
                    is_primary: true,
                },
            ];

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveImageIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveImageIndex(
            (prev) => (prev - 1 + displayImages.length) % displayImages.length,
        );
    };

    return (
        <div className="group relative flex flex-col rounded-[2.5rem] border border-slate-100 bg-white p-4 transition-all hover:shadow-2xl hover:shadow-slate-200/60">
            <div className="group/img relative mb-6 aspect-[4/3] overflow-hidden rounded-3xl bg-slate-50">
                <img
                    src={displayImages[activeImageIndex].image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {displayImages.length > 1 && (
                    <>
                        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 transition-opacity group-hover/img:opacity-100">
                            <button
                                onClick={prevImage}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-sm backdrop-blur-md hover:bg-white"
                            >
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
                                        strokeWidth={3}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={nextImage}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-sm backdrop-blur-md hover:bg-white"
                            >
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
                                        strokeWidth={3}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="absolute right-0 bottom-4 left-0 flex justify-center space-x-1.5">
                            {displayImages.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeImageIndex ? 'w-4 bg-orange-600' : 'w-1.5 bg-slate-300'}`}
                                ></div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="flex flex-1 flex-col px-2 pb-2">
                <h3 className="mb-1 text-xl font-black text-slate-900">
                    {product.name}
                </h3>
                <p className="mb-4 text-sm font-bold tracking-wider text-orange-600">
                    Rp {product.price.toLocaleString()}
                </p>
                <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-slate-500">
                    {product.description}
                </p>

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

export default function ProductsIndex({
    products = [],
    categories = [],
    addons = [],
    filters,
}: Props) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState(filters?.search ?? '');
    const [sortBy, setSortBy] = useState(filters?.sortBy ?? '');
    const [categoryId, setCategoryId] = useState(filters?.category_id ?? '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/products',
            { search, sortBy, category_id: categoryId },
            { preserveState: true },
        );
    };

    const handleSort = (newSort: string) => {
        setSortBy(newSort);
        router.get(
            '/products',
            { search, sortBy: newSort, category_id: categoryId },
            { preserveState: true },
        );
    };

    const handleCategory = (newCat: string) => {
        setCategoryId(newCat);
        router.get(
            '/products',
            { search, sortBy, category_id: newCat },
            { preserveState: true },
        );
    };

    const handleReset = () => {
        setSearch('');
        setSortBy('');
        setCategoryId('');
        router.get('/products', {}, { preserveState: true });
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: '',
        qty: 32,
        note: '',
        design: null as File | null,
        addon_ids: [] as number[],
        addon_notes: {} as Record<number, string>,
    });

    const toggleAddon = (addonId: number) => {
        const current = [...data.addon_ids];
        const index = current.indexOf(addonId);
        if (index > -1) {
            current.splice(index, 1);
            // Also clear the note for this addon
            const updatedNotes = { ...data.addon_notes };
            delete updatedNotes[addonId];
            setData('addon_notes', updatedNotes);
        } else {
            current.push(addonId);
        }
        setData('addon_ids', current);
    };

    const setAddonNote = (addonId: number, note: string) => {
        setData('addon_notes', { ...data.addon_notes, [addonId]: note });
    };

    const calculateAddonTotal = () => {
        return addons
            .filter((a) => data.addon_ids.includes(a.id))
            .reduce((sum, a) => sum + a.price, 0);
    };

    const openOrderModal = (product: Product) => {
        setSelectedProduct(product);
        setData({
            product_id: product.id.toString(),
            qty: 32,
            note: '',
            design: null,
            addon_ids: [],
            addon_notes: {},
        });
        setIsModalOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/orders', {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    return (
        <CustomerLayout>
            <Head title="Katalog Produk Sablon" />

            <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-black text-slate-900">
                        Katalog Produk
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Pilih produk terbaik kami untuk kebutuhan sablon Anda.
                    </p>
                </div>

                <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                    <form
                        onSubmit={handleSearch}
                        className="group relative flex-1 sm:w-80"
                    >
                        <input
                            type="text"
                            placeholder="Cari kaos, hoodie, atau jersey..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-[1.5rem] border-slate-100 bg-white px-6 py-4 pl-14 text-sm shadow-sm transition-all outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                        />
                        <svg
                            className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-hover:text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </form>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center space-x-3">
                            <label className="hidden text-xs font-black tracking-widest text-slate-400 uppercase sm:block">
                                Kategori:
                            </label>
                            <select
                                value={categoryId}
                                onChange={(e) => handleCategory(e.target.value)}
                                className="cursor-pointer rounded-[1.5rem] border-slate-100 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                            >
                                <option value="">Semua Kategori</option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center space-x-3">
                            <label className="hidden text-xs font-black tracking-widest text-slate-400 uppercase sm:block">
                                Urutkan:
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => handleSort(e.target.value)}
                                className="cursor-pointer rounded-[1.5rem] border-slate-100 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                            >
                                <option value="">Terbaru</option>
                                <option value="price_asc">
                                    Harga Terendah
                                </option>
                                <option value="price_desc">
                                    Harga Tertinggi
                                </option>
                            </select>
                        </div>

                        {(search || sortBy || categoryId) && (
                            <button
                                onClick={handleReset}
                                className="flex items-center space-x-2 rounded-[1.5rem] bg-slate-100 px-6 py-4 text-sm font-bold text-slate-500 shadow-sm transition-all hover:bg-red-50 hover:text-red-600"
                                title="Reset Filter"
                            >
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
                                        strokeWidth={2.5}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        openOrderModal={openOrderModal}
                    />
                ))}
            </div>

            {/* Order Modal */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2.5rem] bg-white p-8 shadow-2xl">
                        <h2 className="mb-6 text-2xl font-black text-slate-900">
                            Konfirmasi Pesanan
                        </h2>

                        <div className="mb-6 flex items-center space-x-4 rounded-2xl bg-slate-50 p-4">
                            <img
                                src={
                                    selectedProduct.image ||
                                    '/images/mockup.png'
                                }
                                className="h-16 w-16 rounded-xl object-cover"
                            />
                            <div>
                                <p className="font-bold text-slate-900">
                                    {selectedProduct.name}
                                </p>
                                <p className="text-xs font-bold text-orange-600">
                                    Rp {selectedProduct.price.toLocaleString()}{' '}
                                    / pcs
                                </p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="mb-2 block text-xs font-black tracking-widest text-slate-400 uppercase">
                                    Jumlah (pcs)
                                </label>
                                <input
                                    type="number"
                                    min="32"

                                    onChange={(e) =>
                                        setData('qty', Number(e.target.value))
                                    }
                                    className="w-full rounded-2xl border-slate-100 bg-slate-50 px-4 py-3 text-sm transition-all outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                    required
                                />
                                {errors.qty && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.qty}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-black tracking-widest text-slate-400 uppercase">
                                    Unggah Desain / Logo
                                </label>
                                <div className="mt-1 flex justify-center rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-slate-300"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-slate-600">
                                            <label className="relative cursor-pointer rounded-md bg-white font-medium text-orange-600 hover:text-orange-500">
                                                <span>
                                                    Klik untuk pilih file
                                                </span>
                                                <input
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={(e) =>
                                                        setData(
                                                            'design',
                                                            e.target.files
                                                                ? e.target
                                                                    .files[0]
                                                                : null,
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            PNG, JPG up to 5MB
                                        </p>
                                        {data.design && (
                                            <p className="text-xs font-bold text-green-600">
                                                Terpilih: {data.design.name}
                                            </p>
                                        )}
                                        {errors.design && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.design}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="mb-4 block text-xs font-black tracking-widest text-slate-400 uppercase">
                                    Tambahan (Opsional)
                                </label>
                                <div className="grid grid-cols-1 gap-3">
                                    {addons?.map((addon) => (
                                        <div
                                            key={addon.id}
                                            className="space-y-0"
                                        >
                                            <div
                                                onClick={() =>
                                                    toggleAddon(addon.id)
                                                }
                                                className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${data.addon_ids.includes(
                                                    addon.id,
                                                )
                                                        ? 'border-orange-500 bg-orange-50'
                                                        : 'border-slate-100 bg-white hover:border-slate-200'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${data.addon_ids.includes(
                                                            addon.id,
                                                        )
                                                                ? 'border-orange-500 bg-orange-500'
                                                                : 'border-slate-300'
                                                            }`}
                                                    >
                                                        {data.addon_ids.includes(
                                                            addon.id,
                                                        ) && (
                                                                <svg
                                                                    className="h-3 w-3 text-white"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            4
                                                                        }
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            )}
                                                    </div>
                                                    <div>
                                                        <span
                                                            className={`text-sm font-bold ${data.addon_ids.includes(addon.id) ? 'text-orange-900' : 'text-slate-700'}`}
                                                        >
                                                            {addon.name}
                                                        </span>
                                                        {addon.description && (
                                                            <p className="mt-0.5 text-[11px] text-slate-400">
                                                                {
                                                                    addon.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <span
                                                    className={`text-xs font-black ${data.addon_ids.includes(addon.id) ? 'text-orange-600' : 'text-slate-400'}`}
                                                >
                                                    + Rp{' '}
                                                    {addon.price.toLocaleString()}
                                                </span>
                                            </div>
                                            {data.addon_ids.includes(
                                                addon.id,
                                            ) &&
                                                addon.description && (
                                                    <div className="mt-2 mb-1 ml-8">
                                                        <input
                                                            type="text"
                                                            value={
                                                                data
                                                                    .addon_notes[
                                                                addon.id
                                                                ] || ''
                                                            }
                                                            onChange={(e) =>
                                                                setAddonNote(
                                                                    addon.id,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                            className="w-full rounded-xl border-orange-200 bg-orange-50/50 px-4 py-2.5 text-sm transition-all outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                                            placeholder={
                                                                addon.description
                                                            }
                                                        />
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-black tracking-widest text-slate-400 uppercase">
                                    Catatan Pesanan
                                </label>
                                <textarea
                                    value={data.note}
                                    onChange={(e) =>
                                        setData('note', e.target.value)
                                    }
                                    className="h-32 w-full resize-none rounded-2xl border-slate-100 bg-slate-50 px-4 py-3 text-sm transition-all outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                                    placeholder="Warna kaos, ukuran, instruksi khusus, dll..."
                                ></textarea>
                            </div>

                            <div className="rounded-2xl bg-orange-50 p-4 text-center">
                                <p className="text-xs font-bold tracking-widest text-orange-400 uppercase">
                                    Total Bayar
                                </p>
                                <p className="text-3xl font-black text-orange-600">
                                    Rp{' '}
                                    {(
                                        (selectedProduct.price +
                                            calculateAddonTotal()) *
                                        data.qty
                                    ).toLocaleString()}
                                </p>
                                <p className="mt-1 text-[10px] font-bold tracking-widest text-orange-400 uppercase">
                                    DP 50% (Rp{' '}
                                    {(
                                        (selectedProduct.price +
                                            calculateAddonTotal()) *
                                        data.qty *
                                        0.5
                                    ).toLocaleString()}
                                    )
                                </p>
                            </div>

                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 rounded-2xl bg-slate-100 py-4 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-[2] rounded-2xl bg-orange-600 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-700 active:scale-95 disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Memproses...'
                                        : 'Buat Pesanan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </CustomerLayout>
    );
}
