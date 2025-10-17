"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t border-[color:var(--surface2)]/30 bg-[color:var(--surface)]/20 backdrop-blur-sm">
      <div className="mx-auto max-w-8xl px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--warn)] rounded-lg flex items-center justify-center">
              <span className="text-xs">🛍️</span>
            </div>
            <span className="text-sm hidden md:block font-medium">Product Management App</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm opacity-70">
            <span>© {currentYear} Product Management App</span>
            <span className="hidden sm:inline">•</span>
            <span>Created by <span className="font-medium text-[color:var(--accent)]">ASIF</span></span>
          </div>
          
          <div className="flex items-center gap-4 text-xs opacity-60">
            <span>Built with Next.js</span>
            <span>•</span>
            <span>Redux Toolkit</span>
            <span>•</span>
            <span>MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
