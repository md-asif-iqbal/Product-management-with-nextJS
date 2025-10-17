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
      <div className="mx-auto max-w-8xl px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo Section */}
          <Link href="/products" className="flex items-center gap-2 text-lg font-bold hover:opacity-90 transition-opacity min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--warn)] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xs sm:text-sm">🛍️</span>
            </div>
            <span className="hidden sm:inline text-base lg:text-lg">Product Management App</span>
            <span className="sm:hidden text-sm">PMA</span>
          </Link>
          
          {/* Navigation Section */}
          <nav className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Products Link - Only show when not on products page */}
            {isAuthenticated && token && pathname !== "/products" && (
              <Link className="button button-secondary text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2" href="/products">
                <span className="hidden sm:inline">Products</span>
                <span className="sm:hidden">📦</span>
              </Link>
            )}
            
            {/* User Section - Only show when authenticated */}
            {isAuthenticated && token && (
              <>
                {/* Desktop User Info */}
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-[color:var(--surface)]/50 rounded-lg border border-[color:var(--surface2)]/30">
                  <div className="w-6 h-6 bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--warn)] rounded-full flex items-center justify-center text-xs font-semibold text-white">
                    {name ? name.charAt(0).toUpperCase() : email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm min-w-0">
                    <div className="font-medium truncate">{name || "User"}</div>
                    <div className="text-xs opacity-70 truncate">{email}</div>
                  </div>
                </div>

                {/* Mobile User Avatar */}
                <div className="md:hidden w-8 h-8 bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--warn)] rounded-full flex items-center justify-center text-xs font-semibold text-white">
                  {name ? name.charAt(0).toUpperCase() : email?.charAt(0).toUpperCase()}
                </div>
                
                {/* Logout Button - Always visible when authenticated */}
                <button
                  className="button button-danger text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 flex-shrink-0"
                  onClick={() => { 
                    dispatch(logout()); 
                    router.push("/login"); 
                  }}
                  title="Logout"
                >
                  <svg className="w-4 h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

