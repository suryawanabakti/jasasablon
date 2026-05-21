import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

interface Props {
    company: any;
}

export default function CompanySettings({ company }: Props) {
    const form = useForm({
        name: company?.name || '',
        description: company?.description || '',
        phone: company?.phone || '',
        email: company?.email || '',
        address: company?.address || '',
        instagram: company?.instagram || '',
        facebook: company?.facebook || '',
        logo: undefined as File | undefined,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put('/admin/settings/company');
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan Perusahaan" />

            <div className="max-w-3xl">
                <h1 className="text-3xl font-black text-slate-900">
                    Pengaturan Perusahaan
                </h1>
                <p className="mb-6 text-sm text-slate-500">
                    Atur informasi dasar perusahaan yang akan ditampilkan di
                    frontend.
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
                            Deskripsi
                        </label>
                        <textarea
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            className="w-full rounded-xl border px-4 py-3"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-bold">
                                Telepon
                            </label>
                            <input
                                type="text"
                                value={form.data.phone}
                                onChange={(e) =>
                                    form.setData('phone', e.target.value)
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
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            Alamat
                        </label>
                        <input
                            type="text"
                            value={form.data.address}
                            onChange={(e) =>
                                form.setData('address', e.target.value)
                            }
                            className="w-full rounded-xl border px-4 py-3"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-bold">
                                Instagram
                            </label>
                            <input
                                type="text"
                                value={form.data.instagram}
                                onChange={(e) =>
                                    form.setData('instagram', e.target.value)
                                }
                                className="w-full rounded-xl border px-4 py-3"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-bold">
                                Facebook
                            </label>
                            <input
                                type="text"
                                value={form.data.facebook}
                                onChange={(e) =>
                                    form.setData('facebook', e.target.value)
                                }
                                className="w-full rounded-xl border px-4 py-3"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold">
                            Logo
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                form.setData(
                                    'logo',
                                    e.target.files
                                        ? e.target.files[0]
                                        : undefined,
                                )
                            }
                            className="w-full"
                        />
                        {company?.logo && (
                            <img
                                src={company.logo}
                                alt="logo"
                                className="mt-3 h-20 object-contain"
                            />
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
