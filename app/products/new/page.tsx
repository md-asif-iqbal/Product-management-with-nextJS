// file: app/products/new/page.tsx
"use client";
import RequireAuth from "@/components/RequireAuth";
import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">Create Product</h1>
        <div className="card">
          <ProductForm />
        </div>
      </div>
    </RequireAuth>
  );
}
