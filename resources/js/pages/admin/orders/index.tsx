import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';

interface Order {
    id: number;
    user: { name: string; email: string };
    product: { name: string };
    qty: number;
    total_price: number;
    status: string;
    design: string | null;
    note: string | null;
    created_at: string;
}

interface Props {
    orders: Order[];
    filters: {
        search?: string;
        status?: string;
    }
}

export default function OrdersIndex({ orders, filters = {} }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/orders', { search, status }, { preserveState: true });
    };

    const handleStatusFilter = (newStatus: string) => {
        setStatus(newStatus);
        router.get('/admin/orders', { search, status: newStatus }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        setStatus('');
        router.get('/admin/orders', {}, { preserveState: true });
    };

    const updateStatus = (id: number, status: string) => {
        router.put(`/admin/orders/${id}/status`, { status });
    };

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
        <AdminLayout>
            <Head title="Semua Pesanan" />

            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Pesanan</h1>
                    <p className="text-slate-500 text-sm">Pantau dan kelola semua pesanan sablon masuk.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <form onSubmit={handleSearch} className="relative group">
                        <input
                            type="text"
                            placeholder="Cari nama/produk..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-64 rounded-2xl border-slate-100 bg-white px-5 py-3 text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none pl-12"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </form>

                    <select
                        value={status}
                        onChange={(e) => handleStatusFilter(e.target.value)}
                        className="rounded-2xl border-slate-100 bg-white px-5 py-3 text-sm font-bold text-slate-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none cursor-pointer"
                    >
                        <option value="">Semua Status</option>
                        <option value="pending">Pending</option>
                        <option value="dp_paid">DP Paid</option>
                        <option value="process">Process</option>
                        <option value="done">Done</option>
                        <option value="cancel">Cancel</option>
                    </select>

                    {(search || status) && (
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
                </div>
            </div>

            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                <th className="pb-6 pl-4">ID / Tanggal</th>
                                <th className="pb-6">Customer</th>
                                <th className="pb-6">Produk / Qty</th>
                                <th className="pb-6">Desain</th>
                                <th className="pb-6">Catatan</th>
                                <th className="pb-6">Total</th>
                                <th className="pb-6 text-center">Status</th>
                                <th className="pb-6 pr-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-6 pl-4">
                                        <p className="text-sm font-bold text-slate-900">#{order.id}</p>
                                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                                            {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </td>
                                    <td className="py-6">
                                        <p className="text-sm font-bold text-slate-900">{order.user.name}</p>
                                        <p className="text-xs text-slate-400">{order.user.email}</p>
                                    </td>
                                    <td className="py-6">
                                        <p className="text-sm font-medium text-slate-700">{order.product.name}</p>
                                        <p className="text-xs text-slate-400 font-bold">{order.qty} pcs</p>
                                    </td>
                                    <td className="py-6">
                                        {order.design ? (
                                            <a href={`/storage/${order.design}`} target="_blank" className="block h-12 w-12 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 hover:ring-2 hover:ring-orange-500 transition-all">
                                                <img src={`/storage/${order.design}`} className="h-full w-full object-cover" />
                                            </a>
                                        ) : (
                                            <span className="text-[10px] text-slate-300 italic font-medium">No design</span>
                                        )}
                                    </td>
                                    <td className="py-6">
                                        <p className="text-xs text-slate-500 max-w-[150px] line-clamp-2 italic leading-relaxed">
                                            {order.note || '-'}
                                        </p>
                                    </td>
                                    <td className="py-6">
                                        <p className="text-sm font-black text-slate-900">Rp {order.total_price.toLocaleString()}</p>
                                    </td>
                                    <td className="py-6 text-center">
                                        <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                            {order.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="py-6 pr-4 text-right">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            className="rounded-xl border-slate-100 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="dp_paid">DP Paid</option>
                                            <option value="process">Process</option>
                                            <option value="done">Done</option>
                                            <option value="cancel">Cancel</option>
                                        </select>
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
