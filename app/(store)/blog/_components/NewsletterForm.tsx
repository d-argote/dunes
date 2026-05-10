"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="flex-1 bg-surface-container-lowest border-none py-4 px-6 text-sm font-medium tracking-widest uppercase focus:ring-2 focus:ring-tertiary outline-none"
        placeholder="TU CORREO ELECTRÓNICO"
        type="email"
      />
      <button
        type="submit"
        className="bg-primary text-on-primary px-8 py-4 font-headline font-bold uppercase tracking-widest hover:scale-105 transition-transform"
      >
        Suscribirse
      </button>
    </form>
  );
}
