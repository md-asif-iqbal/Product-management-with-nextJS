// file: app/layout.tsx
import "./globals.css";
import Providers from "./providers";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export const metadata = {
  title: "Product Management App",
  description: "Product management application built with Next.js and Redux Toolkit",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[color:var(--bg)] text-[color:var(--text)] min-h-screen">
        <div className="min-h-screen bg-gradient-to-br from-[color:var(--bg)] via-[color:var(--surface)]/20 to-[color:var(--bg)] flex flex-col">
          <Providers>
            <NavBar />
            <main className="flex-1 mx-auto max-w-8xl p-4 sm:p-6 w-full">
              {children}
            </main>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--surface)',
                  border: '1px solid var(--surface2)',
                  color: 'var(--text)',
                },
              }}
            />
          </Providers>
        </div>
      </body>
    </html>
  );
}
