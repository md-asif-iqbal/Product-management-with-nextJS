// file: app/products/page.tsx
"use client";
import RequireAuth from "@/components/RequireAuth";
import Link from "next/link";
import { useListProductsQuery, useDeleteProductMutation } from "@/store/services/products";
import { useEffect, useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { toast } from "sonner";

export default function ProductsPage() {
  return (
    <RequireAuth>
      <ProductsInner />
    </RequireAuth>
  );
}

function ProductsInner() {
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isFetching, isError, refetch } = useListProductsQuery({ q: debounced, page, limit });
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [del, { isLoading: deleting }] = useDeleteProductMutation();

  const handleDelete = async (productId: string) => {
    try {
      await del(productId).unwrap();
      toast.success("Product deleted successfully");
      setToDelete(null);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    const t = setTimeout(() => { setDebounced(q); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [q]);

  const totalPages = useMemo(() => data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1, [data]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex-1">
          <input 
            className="input" 
            placeholder="Search products..." 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
          />
        </div>
        <div className="flex gap-2 sm:ml-auto">
          <button 
            className="button button-secondary button-header" 
            onClick={() => {
              refetch();
              toast.success("Products refreshed");
            }}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <Link className="button button-primary button-header" href="/products/new">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Product
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isFetching && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card animate-pulse h-40" />
        ))}

        {!isFetching && data?.items.map(p => (
          <div key={p._id} className="card hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{p.name}</h3>
                <p className="helper text-xs">{p.category} • {p.sku}</p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[color:var(--warn)]/20 to-[color:var(--warn)]/30 text-[color:var(--warn)] text-sm font-medium whitespace-nowrap">
                ${p.price.toFixed(2)}
              </span>
            </div>
            <p className="text-sm opacity-80 line-clamp-2 mb-4">{p.description || "No description available"}</p>
            <div className="flex gap-2">
              <Link className="button button-secondary button-sm flex-1" href={`/products/${p._id}`}>
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </Link>
              <Link className="button button-secondary button-sm flex-1" href={`/products/${p._id}/edit`}>
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
              <button 
                className="button button-danger button-sm flex-1" 
                onClick={() => setToDelete(p._id)} 
                disabled={deleting}
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isError && <div className="card">Failed to load products.</div>}
      {!isFetching && !data?.items.length && !isError && <div className="card">No products found.</div>}

      {/* Pagination Section */}
      <div className="flex items-center justify-center gap-3 pt-6 border-t border-[color:var(--surface2)]/30">
        <button 
          className="button button-secondary button-sm" 
          disabled={page <= 1} 
          onClick={() => setPage(p => p - 1)}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
        <span className="opacity-80 text-sm px-3 py-1 bg-[color:var(--surface)] rounded-lg">
          Page {data?.page || page} / {totalPages}
        </span>
        <button 
          className="button button-secondary button-sm" 
          disabled={page >= totalPages} 
          onClick={() => setPage(p => p + 1)}
        >
          Next
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete product?"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => handleDelete(toDelete!)}
        onClose={() => setToDelete(null)}
      />
    </div>
  );
}
