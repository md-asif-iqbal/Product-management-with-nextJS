"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  text, 
  className = "" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-[color:var(--accent)] ${sizeClasses[size]}`}></div>
      {text && <span className="text-sm opacity-70">{text}</span>}
    </div>
  );
}
