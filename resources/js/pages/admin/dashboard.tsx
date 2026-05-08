import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import React from 'react';

interface Props {
    stats: {
        total_orders: number;
        total_revenue: number;
        pending_payments: number;
        total_customers: number;
    };
    recent_orders: any[];
}

export default function Dashboard({ stats, recent_orders }: Props) {
    return (
        <AdminLayout>
            <Head title="Dashboard Admin" />

            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Ringkasan aktivitas toko sablon Anda hari ini.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                {[
                    { label: 'Total Pesanan', value: stats.total_orders, icon: '📦', color: 'bg-blue-50 text-blue-600' },
                    { label: 'Total Pendapatan', value: `Rp ${stats.total_revenue.toLocaleString()}`, icon: '💰', color: 'bg-green-50 text-green-600' },
                    { label: 'Pembayaran Pending', value: stats.pending_payments, icon: '⏳', color: 'bg-orange-50 text-orange-600' },
                    { label: 'Total Customer', value: stats.total_customers, icon: '👥', color: 'bg-purple-50 text-purple-600' },
                ].map((stat, i) => (
                    <div key={i} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color} text-2xl`}>
                            {stat.icon}
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        <p className="mt-1 text-2xl font-black text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900">Pesanan Terbaru</h2>
                    <button className="text-sm font-bold text-orange-600 hover:underline">Lihat Semua</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                <th className="pb-4 pl-4">Customer</th>
                                <th className="pb-4">Produk</th>
                                <th className="pb-4">Qty</th>
                                <th className="pb-4">Total</th>
                                <th className="pb-4 text-center">Status</th>
                                <th className="pb-4 pr-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {recent_orders.map((order, i) => (
                                <tr key={i} className="group transition-colors hover:bg-slate-50/50">
                                    <td className="py-4 pl-4">
                                        <p className="text-sm font-bold text-slate-900">{order.user.name}</p>
                                        <p className="text-xs text-slate-400">{order.user.email}</p>
                                    </td>
                                    <td className="py-4">
                                        <p className="text-sm font-medium text-slate-700">{order.product.name}</p>
                                    </td>
                                    <td className="py-4">
                                        <p className="text-sm font-bold text-slate-900">{order.qty}</p>
                                    </td>
                                    <td className="py-4">
                                        <p className="text-sm font-black text-slate-900">Rp {order.total_price.toLocaleString()}</p>
                                    </td>
                                    <td className="py-4 text-center">
                                        <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                            order.status === 'done' ? 'bg-green-100 text-green-600' : 
                                            order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4 text-right">
                                        <button className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-slate-900/10 opacity-0 transition-all group-hover:opacity-100 active:scale-95">
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
