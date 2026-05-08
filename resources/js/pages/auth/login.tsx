import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
            <Head title="Masuk - Sablon Jasa Kita" />

            <div className="w-full max-w-md">
                <div className="mb-10 text-center">
                    <Link href="/" className="inline-block text-3xl font-black tracking-tighter text-orange-600">
                        MOBSTER<span className="text-slate-900"> INDONESIA</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-black text-slate-900">Selamat Datang Kembali</h2>
                    <p className="mt-2 text-sm text-slate-500">Masuk untuk mengelola pesanan sablon Anda</p>
                </div>

                <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <form onSubmit={submit} className="space-y-6">
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
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-bold text-slate-700">Password</label>
                                <a href="#" className="text-xs font-bold text-orange-600 hover:underline">Lupa Password?</a>
                            </div>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="mt-1 text-xs font-medium text-red-500">{errors.password}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                            />
                            <label className="ml-2 text-sm font-medium text-slate-600">Ingat saya</label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
                        >
                            {processing ? 'Memproses...' : 'Masuk Sekarang'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500">
                            Belum punya akun?{' '}
                            <Link href="/register" className="font-bold text-orange-600 hover:underline">Daftar di sini</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
