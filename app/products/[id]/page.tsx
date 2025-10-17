"use client";
import RequireAuth from "@/components/RequireAuth";
import { useGetProductQuery, useDeleteProductMutation } from "@/store/services/products";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useState } from "react";
import { useAppSelector } from "@/store";
import { toast } from "sonner";

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
  const { email } = useAppSelector(s => s.auth);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--accent)] mx-auto mb-4"></div>
          <p className="text-sm opacity-70">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (isError || !data) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[color:var(--danger)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[color:var(--danger)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
        <p className="opacity-70 mb-4">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/products" className="button button-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  const isOwner = data.createdBy === email;

  const handleDelete = async () => {
    try {
      await del(id).unwrap();
      toast.success("Product deleted successfully");
      router.push("/products");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 gradient-text">{data.name}</h1>
              <div className="flex items-center gap-4 text-sm opacity-70">
                <span>Created by <span className="font-medium text-[color:var(--accent)]">{data.createdByName}</span></span>
                <span>•</span>
                <span>{new Date(data.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[color:var(--warn)] mb-1">${data.price.toFixed(2)}</div>
              <div className="text-sm opacity-70">Price</div>
            </div>
          </div>
          
          {data.description && (
            <div className="bg-[color:var(--surface)]/50 rounded-xl p-6 border border-[color:var(--surface2)]/30">
              <h3 className="font-semibold mb-3 text-lg">Description</h3>
              <p className="opacity-90 leading-relaxed whitespace-pre-wrap">{data.description}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 lg:min-w-[200px]">
          <Link 
            href="/products" 
            className="button button-secondary w-full"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </Link>
          
          {isOwner ? (
            <>
              <Link 
                href={`/products/${id}/edit`} 
                className="button button-primary w-full"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Product
              </Link>
              <button 
                className="button button-danger w-full" 
                onClick={() => setOpen(true)} 
                disabled={deleting}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {deleting ? "Deleting..." : "Delete Product"}
              </button>
            </>
          ) : (
            <div className="text-center p-4 bg-[color:var(--surface)]/30 rounded-xl border border-[color:var(--surface2)]/30">
              <svg className="w-8 h-8 text-[color:var(--border)] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-sm opacity-70">You can only edit/delete your own products</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[color:var(--accent)]/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[color:var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="font-semibold">Category</h3>
          </div>
          <p className="text-lg font-medium">{data.category}</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[color:var(--warn)]/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[color:var(--warn)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </div>
            <h3 className="font-semibold">SKU</h3>
          </div>
          <p className="text-lg font-mono">{data.sku}</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[color:var(--success)]/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[color:var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold">Last Updated</h3>
          </div>
          <p className="text-sm opacity-80">{new Date(data.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      <ConfirmDialog
        open={open}
        title="Delete Product?"
        description="This action cannot be undone. The product will be permanently removed from the system."
        confirmText="Delete Product"
        onConfirm={handleDelete}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
