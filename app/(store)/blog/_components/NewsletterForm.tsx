"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Error al suscribirse");
      }
      setState("success");
      setEmail("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <p className="font-body text-sm font-semibold text-on-primary-container uppercase tracking-widest flex items-center justify-center gap-2">
        <span className="material-symbols-outlined">check_circle</span>
        Suscrito correctamente
      </p>
    );
  }

  return (
    <form
      className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-1 bg-surface-container-lowest border-none py-4 px-6 text-sm font-medium tracking-widest uppercase focus:ring-2 focus:ring-tertiary outline-none"
        placeholder="TU CORREO ELECTRÓNICO"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state === "loading"}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="bg-primary text-on-primary px-8 py-4 font-headline font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
      >
        {state === "loading" ? "..." : "Suscribirse"}
      </button>
      {state === "error" && (
        <p className="w-full text-center font-body text-xs text-error mt-1">{errorMsg}</p>
      )}
    </form>
  );
}

