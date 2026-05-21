import CustomerLayout from '@/layouts/customer-layout';
import { Head, Link, router } from '@inertiajs/react';
import React from 'react';

interface Order {
    id: number;
    product: { name: string; image: string | null };
    qty: number;
    total_price: number;
    status: string;
    review: any;
    created_at: string;
}

interface Props {
    orders: Order[];
}

export default function OrdersIndex({ orders }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-orange-100 text-orange-600';
            case 'dp_paid':
                return 'bg-blue-100 text-blue-600';
            case 'process':
                return 'bg-purple-100 text-purple-600';
            case 'done':
                return 'bg-green-100 text-green-600';
            case 'cancel':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <CustomerLayout>
            <Head title="Pesanan Saya" />

            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-900">
                    Pesanan Saya
                </h1>
                <p className="mt-2 text-slate-500">
                    Lacak status dan pembayaran pesanan sablon Anda.
                </p>
            </div>

            {orders.length === 0 ? (
                <div className="rounded-[3rem] border-4 border-dashed border-slate-100 p-20 text-center">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-5xl">
                        📦
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                        Belum Ada Pesanan
                    </h3>
                    <p className="mx-auto mt-2 mb-8 max-w-xs text-slate-500">
                        Anda belum memesan apa pun. Lihat katalog kami sekarang!
                    </p>
                    <Link
                        href="/products"
                        className="inline-block rounded-2xl bg-orange-600 px-10 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/20 transition-all hover:bg-orange-700"
                    >
                        Lihat Produk
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="group relative rounded-[2.5rem] border border-slate-100 bg-white p-6 transition-all hover:shadow-xl hover:shadow-slate-200/40"
                        >
                            <div className="flex flex-col justify-between space-y-6 md:flex-row md:items-center md:space-y-0">
                                <div className="flex items-center space-x-6">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50">
                                        <img
                                            src={
                                                order.product.image ||
                                                '/images/mockup.png'
                                            }
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-1 flex items-center space-x-3">
                                            <p className="text-xs font-bold text-slate-400">
                                                #{order.id}
                                            </p>
                                            <span
                                                className={`rounded-full px-3 py-0.5 text-[10px] font-bold tracking-wider uppercase ${getStatusColor(order.status)}`}
                                            >
                                                {order.status.replace('_', ' ')}
                                            </span>
                                            {order.review && (
                                                <span className="flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-[10px] font-bold tracking-wider text-yellow-600 uppercase">
                                                    <span className="mr-1">
                                                        ★
                                                    </span>{' '}
                                                    Diulas
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900">
                                            {order.product.name}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {order.qty} pcs • Rp{' '}
                                            {order.total_price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="hidden text-right md:block">
                                        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                                            Tgl Pesan
                                        </p>
                                        <p className="text-sm font-bold text-slate-900">
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="w-full rounded-2xl bg-slate-100 px-8 py-4 text-center text-sm font-bold text-slate-600 transition-all hover:bg-slate-900 hover:text-white md:w-auto"
                                    >
                                        Detail & Pembayaran
                                    </Link>
                                    {(order.status === 'pending' ||
                                        order.status === '0' ||
                                        order.status === 0) && (
                                        <button
                                            onClick={() => {
                                                if (
                                                    !confirm(
                                                        'Hapus pesanan ini?',
                                                    )
                                                )
                                                    return;
                                                router.delete(
                                                    `/orders/${order.id}`,
                                                );
                                            }}
                                            className="ml-3 hidden items-center rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 md:inline-flex"
                                        >
                                            Hapus
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </CustomerLayout>
    );
}
