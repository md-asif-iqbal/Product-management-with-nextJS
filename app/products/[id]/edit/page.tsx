// file: app/products/[id]/edit/page.tsx
"use client";
import RequireAuth from "@/components/RequireAuth";
import ProductForm from "@/components/ProductForm";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        <div className="card">
          <ProductForm id={id} />
        </div>
      </div>
    </RequireAuth>
  );
}
