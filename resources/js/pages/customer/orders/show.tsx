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
    addons: { name: string; price: number; pivot: { price: number; notes: string | null } }[];
    review: { rating: number; comment: string | null } | null;
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

    const { data: reviewData, setData: setReviewData, post: postReview, processing: reviewProcessing, errors: reviewErrors, reset: resetReview } = useForm({
        order_id: order.id,
        rating: 5,
        comment: '',
    });

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const submitPayment = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/orders/${order.id}/pay`, {
            onSuccess: () => {
                setIsUploadModalOpen(false);
                reset();
            }
        });
    };

    const submitReview = (e: React.FormEvent) => {
        e.preventDefault();
        postReview('/reviews', {
            onSuccess: () => {
                setIsReviewModalOpen(false);
                resetReview();
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
                                {order.addons.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Tambahan:</p>
                                        {order.addons.map((addon, i) => (
                                            <div key={i} className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-bold text-slate-600">• {addon.name}</span>
                                                    <span className="text-xs font-black text-orange-600">+ Rp {addon.pivot.price.toLocaleString()}</span>
                                                </div>
                                                {addon.pivot.notes && (
                                                    <p className="mt-1 ml-3 text-xs text-slate-500 italic">↳ {addon.pivot.notes}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <p className="text-2xl font-black text-orange-600 mt-4">Total Rp {order.total_price.toLocaleString()}</p>
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
                                <div className="rounded-2xl bg-slate-50 p-4 text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">No. Rekening</p>
                                    <p className="font-bold text-slate-900">8260282795 (BCA)</p>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-4 text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">A/N</p>
                                    <p className="font-bold text-slate-900 uppercase">Irfandi Amir</p>
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
                                
                                <div className="space-y-3">
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

                                    {!order.review ? (
                                        <button
                                            onClick={() => setIsReviewModalOpen(true)}
                                            className="w-full rounded-2xl bg-green-700/50 py-4 text-sm font-black text-white border-2 border-green-400/30 transition-all hover:bg-green-700 active:scale-95"
                                        >
                                            Beri Rating & Ulasan
                                        </button>
                                    ) : (
                                        <div className="rounded-2xl bg-white/10 p-4 border border-white/20">
                                            <p className="text-[10px] font-black text-green-100 uppercase tracking-widest mb-1 text-center">Rating Anda</p>
                                            <div className="flex justify-center text-xl">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < order.review!.rating ? 'text-yellow-400' : 'text-white/20'}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
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
            {/* Review Modal */}
            {isReviewModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsReviewModalOpen(false)}></div>
                    <div className="relative w-full max-w-lg rounded-[2.5rem] bg-white p-8 shadow-2xl">
                        <h2 className="mb-2 text-2xl font-black text-slate-900">Beri Ulasan</h2>
                        <p className="text-sm text-slate-500 mb-8">Bagaimana pengalaman Anda memesan di Surya Wana Bakti?</p>
                        
                        <form onSubmit={submitReview} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Rating Produk</label>
                                <div className="flex justify-between items-center px-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewData('rating', star)}
                                            className={`text-4xl transition-all ${
                                                reviewData.rating >= star ? 'text-yellow-400 scale-110' : 'text-slate-200'
                                            } hover:scale-125`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                                {reviewErrors.rating && <p className="mt-1 text-xs text-red-500">{reviewErrors.rating}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Komentar (Opsional)</label>
                                <textarea
                                    value={reviewData.comment}
                                    onChange={(e) => setReviewData('comment', e.target.value)}
                                    placeholder="Ceritakan kepuasan Anda..."
                                    className="w-full rounded-2xl border-slate-100 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all outline-none min-h-[120px]"
                                />
                                {reviewErrors.comment && <p className="mt-1 text-xs text-red-500">{reviewErrors.comment}</p>}
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsReviewModalOpen(false)}
                                    className="flex-1 rounded-2xl bg-slate-100 py-4 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={reviewProcessing}
                                    className="flex-[2] rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50"
                                >
                                    {reviewProcessing ? 'Mengirim...' : 'Kirim Ulasan'}
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
