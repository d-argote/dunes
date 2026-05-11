export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-4 border-surface-container-highest border-t-primary rounded-full animate-spin" />
        <p className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Cargando...
        </p>
      </div>
    </div>
  );
}
