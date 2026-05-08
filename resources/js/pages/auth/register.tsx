import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
            <Head title="Daftar - Sablon Jasa Kita" />

            <div className="w-full max-w-md">
                <div className="mb-10 text-center">
                    <Link href="/" className="inline-block text-3xl font-black tracking-tighter text-orange-600">
                        SABLON<span className="text-slate-900">KITA</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-black text-slate-900">Buat Akun Baru</h2>
                    <p className="mt-2 text-sm text-slate-500">Mulai pesan sablon kualitas premium hari ini</p>
                </div>

                <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none"
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                            {errors.name && <p className="mt-1 text-xs font-medium text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none"
                                placeholder="nama@email.com"
                                required
                            />
                            {errors.email && <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none"
                                placeholder="Min. 8 karakter"
                                required
                            />
                            {errors.password && <p className="mt-1 text-xs font-medium text-red-500">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Konfirmasi Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none"
                                placeholder="Ulangi password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-2xl bg-orange-600 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-700 active:scale-[0.98] disabled:opacity-50 mt-4"
                        >
                            {processing ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-100 pt-8">
                        <p className="text-sm text-slate-500">
                            Sudah punya akun?{' '}
                            <Link href="/login" className="font-bold text-orange-600 hover:underline">Masuk di sini</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
