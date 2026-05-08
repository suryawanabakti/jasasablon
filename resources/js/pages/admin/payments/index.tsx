import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import React from 'react';

interface Payment {
    id: number;
    order: {
        id: number;
        user: { name: string };
        product: { name: string };
    };
    type: string;
    amount: number;
    proof: string | null;
    status: string;
    created_at: string;
}

interface Props {
    payments: Payment[];
}

export default function PaymentsIndex({ payments }: Props) {
    const approve = (id: number) => {
        if (confirm('Setujui pembayaran ini?')) {
            router.post(`/admin/payments/${id}/approve`);
        }
    };

    const reject = (id: number) => {
        if (confirm('Tolak pembayaran ini?')) {
            router.post(`/admin/payments/${id}/reject`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Verifikasi Pembayaran" />

            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900">Pembayaran</h1>
                <p className="text-slate-500 text-sm">Verifikasi bukti transfer dari customer.</p>
            </div>

            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                <th className="pb-6 pl-4">Order ID / Tanggal</th>
                                <th className="pb-6">Customer</th>
                                <th className="pb-6">Tipe</th>
                                <th className="pb-6">Jumlah</th>
                                <th className="pb-6">Bukti</th>
                                <th className="pb-6 text-center">Status</th>
                                <th className="pb-6 pr-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {payments.map((payment) => (
                                <tr key={payment.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-6 pl-4">
                                        <p className="text-sm font-bold text-slate-900">#{payment.order.id}</p>
                                        <p className="text-[10px] font-medium text-slate-400 uppercase">
                                            {new Date(payment.created_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </td>
                                    <td className="py-6">
                                        <p className="text-sm font-bold text-slate-900">{payment.order.user.name}</p>
                                        <p className="text-xs text-slate-400">{payment.order.product.name}</p>
                                    </td>
                                    <td className="py-6">
                                        <span className={`inline-block rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tighter ${
                                            payment.type === 'dp' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                            {payment.type}
                                        </span>
                                    </td>
                                    <td className="py-6">
                                        <p className="text-sm font-black text-slate-900">Rp {payment.amount.toLocaleString()}</p>
                                    </td>
                                    <td className="py-6">
                                        {payment.proof ? (
                                            <a href={`/storage/${payment.proof}`} target="_blank" className="text-xs font-bold text-orange-600 hover:underline">Lihat Bukti</a>
                                        ) : (
                                            <span className="text-xs text-slate-300">Tidak ada bukti</span>
                                        )}
                                    </td>
                                    <td className="py-6 text-center">
                                        <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                            payment.status === 'approved' ? 'bg-green-100 text-green-600' : 
                                            payment.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                                        }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="py-6 pr-4 text-right">
                                        {payment.status === 'pending' && (
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => approve(payment.id)}
                                                    className="rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all active:scale-95"
                                                >
                                                    Setuju
                                                </button>
                                                <button
                                                    onClick={() => reject(payment.id)}
                                                    className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95"
                                                >
                                                    Tolak
                                                </button>
                                            </div>
                                        )}
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
