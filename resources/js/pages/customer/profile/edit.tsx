import CustomerLayout from '@/layouts/customer-layout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

interface Props {
    user: any;
}

export default function EditProfile({ user }: Props) {
    const form = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: undefined as File | undefined,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put('/profile');
    };

    return (
        <CustomerLayout>
            <Head title="Profil Saya" />

            <div className="max-w-3xl">
                <h1 className="text-3xl font-black text-slate-900">
                    Profil Saya
                </h1>
                <p className="mb-6 text-sm text-slate-500">
                    Perbarui informasi akun Anda di sini.
                </p>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            Nama
                        </label>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData('name', e.target.value)
                            }
                            className="w-full rounded-xl border px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.data.email}
                            onChange={(e) =>
                                form.setData('email', e.target.value)
                            }
                            className="w-full rounded-xl border px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            No. HP
                        </label>
                        <input
                            type="tel"
                            value={form.data.phone}
                            onChange={(e) =>
                                form.setData('phone', e.target.value)
                            }
                            className="w-full rounded-xl border px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            Alamat
                        </label>
                        <textarea
                            value={form.data.address}
                            onChange={(e) =>
                                form.setData('address', e.target.value)
                            }
                            className="h-24 w-full rounded-xl border px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            Avatar
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                form.setData(
                                    'avatar',
                                    e.target.files
                                        ? e.target.files[0]
                                        : undefined,
                                )
                            }
                            className="w-full"
                        />
                        {user.avatar && (
                            <img
                                src={
                                    user.avatar +
                                    (user.updated_at
                                        ? `?v=${new Date(user.updated_at).getTime()}`
                                        : '')
                                }
                                alt="avatar"
                                className="mt-3 h-20 w-20 rounded-full object-cover"
                            />
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </CustomerLayout>
    );
}
