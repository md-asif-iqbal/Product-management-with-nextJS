// file: app/products/[id]/page.tsx
"use client";
import RequireAuth from "@/components/RequireAuth";
import { useGetProductQuery, useDeleteProductMutation } from "@/store/services/products";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useState } from "react";

export default function ProductDetailsPage() {
  return (
    <RequireAuth>
      <DetailsInner />
    </RequireAuth>
  );
}

function DetailsInner() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductQuery(id);
  const [open, setOpen] = useState(false);
  const [del, { isLoading: deleting }] = useDeleteProductMutation();
  const router = useRouter();

  if (isLoading) return <div className="card">Loading…</div>;
  if (isError || !data) return <div className="card">Not found.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <h1 className="text-2xl font-semibold">{data.name}</h1>
        <span className="px-2 py-1 rounded-lg bg-[color:var(--warn)]/20 text-[color:var(--warn)] text-sm">${data.price.toFixed(2)}</span>
        <div className="ml-auto flex gap-2">
          <Link className="button button-secondary" href={`/products/${id}/edit`}>Edit</Link>
          <button className="button button-danger" onClick={() => setOpen(true)} disabled={deleting}>Delete</button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="opacity-70">Category</span><span>{data.category}</span>
            <span className="opacity-70">SKU</span><span>{data.sku}</span>
            <span className="opacity-70">Created</span><span>{new Date(data.createdAt).toLocaleString()}</span>
            <span className="opacity-70">Updated</span><span>{new Date(data.updatedAt).toLocaleString()}</span>
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="opacity-90 whitespace-pre-wrap">{data.description || "—"}</p>
        </div>
      </div>

      <ConfirmDialog
        open={open}
        title="Delete product?"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={async () => {
          await del(id).unwrap();
          router.push("/products");
        }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
