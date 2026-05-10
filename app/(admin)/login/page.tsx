"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const maxAge = remember ? 604800 : 28800;
    document.cookie = `dunes-admin-session=active; path=/; max-age=${maxAge}; SameSite=Lax`;
    router.push("/admin/dashboard");
  }

  return (
    <div className="flex w-full h-screen">
      <div
        className="hidden md:flex w-[60%] relative overflow-hidden bg-surface-container-highest flex-col items-center justify-center"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmgvIknRO2wRP7Xh-KqFeCVub8EeCIXvuvBmQJETy-YHzEonx5_J0kigHZm2-bSlLiBob0rekgJu6Jfb4apDCkZTs41ubU63xn_hT8SvnqdNN6AQRkWqvsITkBKu353i1lSGUuyTCdx-f20iSONPJoLdFAONjiBTvSI3TeeMuldGMag5ZQ9nCGRsxLVCO_-J3wi5mUev2q3fq58-1w-JdqwMsOYVLf71PdFUk6s3-IIuzqQP5RIyH_rwVYPB2ZT0nZUF8W8wmOHw')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 text-center flex flex-col items-center gap-4 px-12">
          <h1 className="font-brand font-bold text-white tracking-[0.1em] leading-none uppercase text-[72px]">DUNES</h1>
          <p className="font-headline text-[12px] text-white/60 tracking-widest uppercase">
            PANEL DE CONTROL — SISTEMA ADMINISTRATIVO 2026
          </p>
        </div>
      </div>
      <div className="w-full md:w-[40%] bg-surface flex flex-col justify-center px-8 md:px-16 lg:px-24 h-full z-10 shadow-[-16px_0_32px_rgba(28,28,24,0.05)]">
        <div className="w-full max-w-sm mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="font-brand font-bold text-primary tracking-tighter uppercase text-[32px]">DUNES</h2>
            <div className="flex flex-col gap-2">
              <span className="font-body text-[10px] text-secondary uppercase tracking-widest font-semibold">ACCESO ADMINISTRATIVO</span>
              <h3 className="font-headline text-3xl font-bold text-on-surface tracking-[-0.02em]">Bienvenido de vuelta.</h3>
            </div>
          </div>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="relative">
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo Electronico" required className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant text-on-surface focus:ring-0 focus:border-primary px-0 py-2 font-body text-base placeholder-transparent transition-colors outline-none" />
              <label htmlFor="email" className="absolute left-0 -top-4 font-body text-xs font-semibold text-on-surface-variant transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary uppercase tracking-widest">Correo Electronico</label>
            </div>
            <div className="relative">
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contrasena" required className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant text-on-surface focus:ring-0 focus:border-primary px-0 py-2 font-body text-base placeholder-transparent transition-colors outline-none" />
              <label htmlFor="password" className="absolute left-0 -top-4 font-body text-xs font-semibold text-on-surface-variant transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary uppercase tracking-widest">Contrasena</label>
            </div>
            <div className="flex items-center mt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="sr-only peer" />
                  <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                </div>
                <span className="font-body text-xs text-on-surface-variant group-hover:text-on-surface transition-colors font-semibold">Recordar dispositivo</span>
              </label>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-on-primary font-brand font-semibold tracking-[0.15em] uppercase py-4 px-8 rounded-[2px] hover:bg-primary-container transition-colors mt-4 disabled:opacity-70">
              {loading ? "ACCEDIENDO..." : "INICIAR SESION"}
            </button>
          </form>
          <div className="text-center">
            <button type="button" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors border-b border-transparent hover:border-primary font-semibold">
              Olvidaste tu contrasena?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}