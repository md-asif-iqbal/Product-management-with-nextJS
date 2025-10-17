// file: components/NavBar.tsx
"use client";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter, usePathname } from "next/navigation";

export function NavBar() {
  const { email, name, token, isAuthenticated } = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color:var(--bg)]/80 border-b border-[color:var(--surface2)]/50 shadow-lg">
      <div className="mx-auto max-w-8xl px-4 py-4 flex items-center gap-4">
        <Link href="/products" className="flex items-center gap-2 text-lg font-bold hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--warn)] rounded-lg flex items-center justify-center">
            <span className="text-sm">🛍️</span>
          </div>
          <span className="hidden sm:inline">Product Manager</span>
        </Link>
        
        <nav className="ml-auto flex items-center gap-3">
          {isAuthenticated && token && pathname !== "/products" && (
            <Link className="button button-secondary text-sm" href="/products">
              <span className="hidden sm:inline">Products</span>
              <span className="sm:hidden">📦</span>
            </Link>
          )}
          
          {isAuthenticated && token && (
            <>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[color:var(--surface)]/50 rounded-lg border border-[color:var(--surface2)]/30">
                  <div className="w-6 h-6 bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--warn)] rounded-full flex items-center justify-center text-xs font-semibold text-white">
                    {name ? name.charAt(0).toUpperCase() : email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{name || "User"}</div>
                    <div className="text-xs opacity-70">{email}</div>
                  </div>
                </div>
                
                <button
                  className="button button-danger text-sm"
                  onClick={() => { 
                    dispatch(logout()); 
                    router.push("/login"); 
                  }}
                >
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">🚪</span>
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
