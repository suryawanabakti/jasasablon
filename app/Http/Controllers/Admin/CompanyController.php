<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    public function edit()
    {
        $company = Company::first();

        return Inertia::render('admin/settings/company', [
            'company' => $company
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:png,jpg,jpeg,svg|max:4096'
        ]);

        $company = Company::first();

        $data = $request->only(['name', 'description', 'phone', 'email', 'address', 'instagram', 'facebook']);

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $path = $file->store('company', 'public');
            $data['logo'] = '/storage/' . $path;

            // Optionally delete previous logo
            if ($company && $company->logo && preg_match('#^/storage/#', $company->logo)) {
                $oldPath = str_replace('/storage/', '', $company->logo);
                Storage::disk('public')->delete($oldPath);
            }
        }

        if ($company) {
            $company->update($data);
        } else {
            Company::create($data);
        }

        return redirect()->route('admin.settings.company')->with('success', 'Pengaturan perusahaan berhasil disimpan.');
    }
}
