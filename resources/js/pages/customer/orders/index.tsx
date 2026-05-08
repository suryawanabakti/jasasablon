import CustomerLayout from '@/layouts/customer-layout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface Order {
    id: number;
    product: { name: string; image: string | null };
    qty: number;
    total_price: number;
    status: string;
    created_at: string;
}

interface Props {
    orders: Order[];
}

export default function OrdersIndex({ orders }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-orange-100 text-orange-600';
            case 'dp_paid': return 'bg-blue-100 text-blue-600';
            case 'process': return 'bg-purple-100 text-purple-600';
            case 'done': return 'bg-green-100 text-green-600';
            case 'cancel': return 'bg-red-100 text-red-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <CustomerLayout>
            <Head title="Pesanan Saya" />

            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-900">Pesanan Saya</h1>
                <p className="text-slate-500 mt-2">Lacak status dan pembayaran pesanan sablon Anda.</p>
            </div>

            {orders.length === 0 ? (
                <div className="rounded-[3rem] border-4 border-dashed border-slate-100 p-20 text-center">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-5xl">📦</div>
                    <h3 className="text-2xl font-black text-slate-900">Belum Ada Pesanan</h3>
                    <p className="mx-auto mt-2 max-w-xs text-slate-500 mb-8">Anda belum memesan apa pun. Lihat katalog kami sekarang!</p>
                    <Link href="/products" className="inline-block rounded-2xl bg-orange-600 px-10 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all">
                        Lihat Produk
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="group relative rounded-[2.5rem] border border-slate-100 bg-white p-6 transition-all hover:shadow-xl hover:shadow-slate-200/40">
                            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0">
                                <div className="flex items-center space-x-6">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50">
                                        <img src={order.product.image || '/images/mockup.png'} className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-3 mb-1">
                                            <p className="text-xs font-bold text-slate-400">#{order.id}</p>
                                            <span className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                                {order.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900">{order.product.name}</h3>
                                        <p className="text-sm text-slate-500">{order.qty} pcs • Rp {order.total_price.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="text-right hidden md:block">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tgl Pesan</p>
                                        <p className="text-sm font-bold text-slate-900">{new Date(order.created_at).toLocaleDateString('id-ID')}</p>
                                    </div>
                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="w-full md:w-auto rounded-2xl bg-slate-100 px-8 py-4 text-sm font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-center"
                                    >
                                        Detail & Pembayaran
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </CustomerLayout>
    );
}
