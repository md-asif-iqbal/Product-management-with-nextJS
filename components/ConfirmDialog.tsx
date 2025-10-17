// file: components/ConfirmDialog.tsx
"use client";
import { useEffect } from "react";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
};
export function ConfirmDialog({ open, title, description, confirmText="Confirm", cancelText="Cancel", onConfirm, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="card max-w-md w-full">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && <p className="mb-4 opacity-80">{description}</p>}
        <div className="flex gap-2 justify-end">
          <button className="button button-secondary" onClick={onClose}>{cancelText}</button>
          <button className="button button-danger" onClick={() => { onConfirm(); onClose(); }}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
