"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Admin error]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 p-8">
      <span className="material-symbols-outlined text-5xl text-error">error</span>
      <div className="text-center">
        <h2 className="font-headline text-2xl font-bold text-on-surface uppercase tracking-tight mb-2">
          Algo salió mal
        </h2>
        <p className="font-body text-sm text-on-surface-variant max-w-sm">
          {error.message || "Error inesperado en el panel de administración."}
        </p>
      </div>
      <button
        onClick={reset}
        className="bg-primary text-on-primary font-brand text-sm font-semibold uppercase tracking-widest px-8 py-3 hover:bg-primary-container transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
