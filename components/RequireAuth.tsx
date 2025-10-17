// file: components/RequireAuth.tsx
"use client";
import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, token } = useAppSelector(s => s.auth);
  const router = useRouter();
  
  useEffect(() => { 
    if (!isAuthenticated || !token) {
      router.replace("/login"); 
    }
  }, [isAuthenticated, token, router]);
  
  if (!isAuthenticated || !token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[color:var(--accent)] mx-auto mb-4"></div>
          <p className="text-sm opacity-70">Redirecting...</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}
