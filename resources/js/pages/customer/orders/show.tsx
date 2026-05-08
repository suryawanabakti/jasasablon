import CustomerLayout from '@/layouts/customer-layout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

interface Order {
    id: number;
    product: { name: string; image: string | null; price: number };
    qty: number;
    total_price: number;
    status: string;
    note: string | null;
    payments: any[];
    created_at: string;
}

interface Props {
    order: Order;
}

export default function OrderShow({ order }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        type: 'dp',
        amount: order.total_price * 0.5,
        proof: null as File | null,
    });

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const submitPayment = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/orders/${order.id}/pay`, {
            onSuccess: () => {
                setIsUploadModalOpen(false);
                reset();
            }
        });
    };

    const isDPPaid = order.payments.some(p => p.type === 'dp' && p.status === 'approved');
    const isPendingDP = order.payments.some(p => p.type === 'dp' && p.status === 'pending');

    return (
        <CustomerLayout>
            <Head title={`Detail Pesanan #${order.id}`} />

            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
                <div>
                    <Link href="/orders" className="text-xs font-bold text-slate-400 hover:text-orange-600 transition-colors uppercase tracking-widest flex items-center mb-4">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                        Kembali ke Pesanan
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900">Detail Pesanan #{order.id}</h1>
                </div>
                <div className={`rounded-full px-6 py-2 text-sm font-black uppercase tracking-widest ${
                    order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                }`}>
                    Status: {order.status.replace('_', ' ')}
                </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
                {/* Information Column */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="rounded-[3rem] bg-white border border-slate-100 p-10 shadow-sm">
                        <div className="flex items-center space-x-8 mb-10 pb-10 border-b border-slate-50">
                            <img src={order.product.image || '/images/mockup.png'} className="h-32 w-32 rounded-[2rem] object-cover" />
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{order.product.name}</h2>
                                <p className="text-slate-500 mt-2">{order.qty} pcs x Rp {order.product.price.toLocaleString()}</p>
                                <p className="text-2xl font-black text-orange-600 mt-2">Total Rp {order.total_price.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Catatan Pesanan</h3>
                                    <p className="text-slate-700 leading-relaxed">{order.note || 'Tidak ada catatan.'}</p>
                                </div>
                                {order.design && (
                                    <div>
                                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Desain / Logo</h3>
                                        <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 p-2">
                                            <img src={`/storage/${order.design}`} className="w-full rounded-xl" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 pt-4">
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Metode Bayar</p>
                                    <p className="font-bold text-slate-900">Transfer Bank</p>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">No. Rekening</p>
                                    <p className="font-bold text-slate-900">123-456-7890 (BCA)</p>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">A/N</p>
                                    <p className="font-bold text-slate-900">Sablon Kita Official</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[3rem] bg-white border border-slate-100 p-10 shadow-sm">
                        <h3 className="text-xl font-black text-slate-900 mb-8">Riwayat Pembayaran</h3>
                        <div className="space-y-4">
                            {order.payments.length === 0 ? (
                                <p className="text-slate-400 text-sm italic">Belum ada aktivitas pembayaran.</p>
                            ) : (
                                order.payments.map((payment, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-2xl">💳</div>
                                            <div>
                                                <p className="font-bold text-slate-900 uppercase">{payment.type} Payment</p>
                                                <p className="text-xs text-slate-500">{new Date(payment.created_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-slate-900">Rp {payment.amount.toLocaleString()}</p>
                                            <span className={`text-[10px] font-bold uppercase ${
                                                payment.status === 'approved' ? 'text-green-600' : 'text-orange-600'
                                            }`}>{payment.status}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Column */}
                <div>
                    <div className="sticky top-28 space-y-6">
                        {!isDPPaid && !isPendingDP && (
                            <div className="rounded-[3rem] bg-orange-600 p-10 text-white shadow-xl shadow-orange-600/20">
                                <h3 className="text-2xl font-black mb-4">Bayar DP 50%</h3>
                                <p className="text-orange-100 mb-8 text-sm leading-relaxed">Silakan lakukan pembayaran DP minimal 50% sebesar <b>Rp {(order.total_price * 0.5).toLocaleString()}</b> untuk memulai proses sablon.</p>
                                <button
                                    onClick={() => {
                                        setData('type', 'dp');
                                        setData('amount', order.total_price * 0.5);
                                        setIsUploadModalOpen(true);
                                    }}
                                    className="w-full rounded-2xl bg-white py-4 text-sm font-black text-orange-600 shadow-lg transition-all hover:bg-orange-50 active:scale-95"
                                >
                                    Unggah Bukti Transfer
                                </button>
                            </div>
                        )}

                        {isPendingDP && (
                            <div className="rounded-[3rem] bg-slate-900 p-10 text-white shadow-xl shadow-slate-900/20">
                                <h3 className="text-2xl font-black mb-4">Verifikasi Admin</h3>
                                <p className="text-slate-400 mb-0 text-sm leading-relaxed">Bukti transfer DP Anda sedang diverifikasi oleh tim kami. Mohon tunggu sejenak.</p>
                            </div>
                        )}

                        {isDPPaid && order.status === 'process' && (
                            <div className="rounded-[3rem] bg-blue-600 p-10 text-white shadow-xl shadow-blue-600/20">
                                <h3 className="text-2xl font-black mb-4">Sedang Diproses</h3>
                                <p className="text-blue-100 mb-0 text-sm leading-relaxed">Pesanan Anda dalam tahap pengerjaan sablon. Kami akan menginfokan jika sudah selesai.</p>
                            </div>
                        )}
                        
                        {order.status === 'done' && (
                            <div className="rounded-[3rem] bg-green-600 p-10 text-white shadow-xl shadow-green-600/20">
                                <h3 className="text-2xl font-black mb-4">Selesai!</h3>
                                <p className="text-green-100 mb-8 text-sm leading-relaxed">Pesanan Anda telah selesai dikerjakan. Silakan lunasi sisa pembayaran jika ada.</p>
                                <button
                                    onClick={() => {
                                        setData('type', 'pelunasan');
                                        setData('amount', order.total_price * 0.5);
                                        setIsUploadModalOpen(true);
                                    }}
                                    className="w-full rounded-2xl bg-white py-4 text-sm font-black text-green-600 shadow-lg transition-all hover:bg-green-50 active:scale-95"
                                >
                                    Pelunasan Sekarang
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsUploadModalOpen(false)}></div>
                    <div className="relative w-full max-w-lg rounded-[2.5rem] bg-white p-8 shadow-2xl">
                        <h2 className="mb-6 text-2xl font-black text-slate-900">Unggah Bukti Transfer</h2>
                        
                        <form onSubmit={submitPayment} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Tipe Pembayaran</label>
                                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 uppercase">{data.type}</div>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Jumlah Transfer (Rp)</label>
                                <input
                                    type="number"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', Number(e.target.value))}
                                    className="w-full rounded-2xl border-slate-100 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                                    required
                                />
                                {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Bukti Transfer (Image)</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('proof', e.target.files ? e.target.files[0] : null)}
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                                    required
                                />
                                {errors.proof && <p className="mt-1 text-xs text-red-500">{errors.proof}</p>}
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="flex-1 rounded-2xl bg-slate-100 py-4 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-[2] rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50"
                                >
                                    {processing ? 'Mengunggah...' : 'Kirim Bukti'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </CustomerLayout>
    );
}

import { Link } from '@inertiajs/react';
