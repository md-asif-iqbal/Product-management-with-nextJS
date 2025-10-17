"use client";
import { useAppSelector } from "@/store";
import { useListProductsQuery } from "@/store/services/products";

export default function GlobalLoader() {
  const { isAuthenticated } = useAppSelector(s => s.auth);
  const { isFetching } = useListProductsQuery({ q: "", page: 1, limit: 10 });
  
  if (!isAuthenticated || !isFetching) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-[color:var(--surface)] rounded-2xl p-8 shadow-2xl border border-[color:var(--surface2)]/50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--accent)]"></div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">Loading...</h3>
            <p className="text-sm opacity-70">Please wait while we fetch the products data</p>
          </div>
        </div>
      </div>
    </div>
  );
}
