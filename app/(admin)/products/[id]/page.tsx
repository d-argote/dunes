"use client";

import { use, useState } from "react";
import { useDropzone } from "react-dropzone";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const highlights = ["Reduce caída visible", "Refuerza rutina diaria", "Escala bundles", "Mejora recompra"];

export default function AdminProductEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const readableId = id.replace(/-/g, " ");
  const [price, setPrice] = useState("89000");
  const [stock, setStock] = useState("124");
  const [status, setStatus] = useState("Activo");
  const [uploads, setUploads] = useState<File[]>([]);

  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: `
      <h2>Posicionamiento</h2>
      <p>Fórmula botánica diseñada para hombres que buscan detener la caída y sostener una rutina disciplinada de crecimiento capilar.</p>
      <ul>
        <li>Claims centrados en evidencia, no milagros.</li>
        <li>Copy alineado a disciplina diaria y consistencia.</li>
        <li>Cross-sell sugerido: masajeador capilar + tónico.</li>
      </ul>
    `,
  });

  const dropzone = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => setUploads((current) => [...current, ...acceptedFiles]),
  });

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[2.25rem] bg-surface-container-low px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-secondary">Editor de producto</p>
          <h1 className="mt-2 font-headline text-4xl font-semibold uppercase tracking-[-0.05em] text-primary">
            {readableId}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant">
            Ajusta pricing, inventario, narrativa de producto y media sin salir del mismo screen operativo.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full bg-surface px-3 py-2 text-[11px] font-brand tracking-[0.18em] uppercase text-secondary"
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-[2.25rem] bg-primary px-5 py-5 text-white shadow-[0_24px_56px_rgba(35,75,29,0.18)] sm:px-6">
          <p className="font-brand text-[11px] tracking-[0.3em] uppercase text-white/72">Checklist</p>
          <div className="mt-5 space-y-3">
            {[
              "Validar inventario versus bundles activos.",
              "Confirmar claim principal y proof points.",
              "Actualizar galerías verticales para Meta y TikTok Shop.",
            ].map((item) => (
              <div key={item} className="rounded-[1.6rem] bg-white/10 px-4 py-4 backdrop-blur-md">
                <p className="text-sm leading-6 text-white/90">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="space-y-6 rounded-[2.25rem] bg-surface px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-on-surface">Precio COP</span>
              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-full rounded-[1.3rem] bg-surface-container-highest px-4 py-3 text-sm outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-on-surface">Inventario</span>
              <input
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                className="w-full rounded-[1.3rem] bg-surface-container-highest px-4 py-3 text-sm outline-none"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-on-surface">Estado comercial</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-[1.3rem] bg-surface-container-highest px-4 py-3 text-sm outline-none"
            >
              <option>Activo</option>
              <option>Bajo stock</option>
              <option>Pausado</option>
            </select>
          </label>

          <div className="space-y-3">
            <p className="font-brand text-[11px] tracking-[0.28em] uppercase text-secondary">Media uploader</p>
            <div
              {...dropzone.getRootProps()}
              className="rounded-[2rem] bg-surface-container-low px-5 py-8 text-center text-on-surface-variant shadow-[inset_0_0_0_1px_rgba(35,75,29,0.08)]"
            >
              <input {...dropzone.getInputProps()} />
              <span className="material-symbols-outlined text-[32px] text-primary">upload</span>
              <p className="mt-4 text-sm leading-6">
                Arrastra imágenes aquí o haz click para cargar assets de PDP, ads y social proof.
              </p>
            </div>

            <div className="space-y-2">
              {uploads.length === 0 ? (
                <p className="text-sm text-on-surface-variant">Aún no hay archivos cargados.</p>
              ) : (
                uploads.map((file) => (
                  <div key={file.name} className="rounded-[1.4rem] bg-surface-container-highest px-4 py-3 text-sm text-on-surface">
                    {file.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </article>

        <article className="rounded-[2.25rem] bg-surface-container-low px-5 py-5 shadow-[0_20px_48px_rgba(28,28,24,0.05)] sm:px-6">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "H2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
              { label: "Bold", action: () => editor?.chain().focus().toggleBold().run() },
              { label: "Italic", action: () => editor?.chain().focus().toggleItalic().run() },
              { label: "Lista", action: () => editor?.chain().focus().toggleBulletList().run() },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-on-surface transition-transform duration-200 hover:scale-[1.02]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="prose prose-stone mt-6 max-w-none rounded-[2rem] bg-surface px-5 py-5 prose-headings:font-headline prose-headings:text-primary prose-li:text-on-surface-variant prose-p:text-on-surface-variant">
            <EditorContent editor={editor} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { label: "Precio live", value: `$ ${Number(price).toLocaleString("es-CO")}` },
              { label: "Stock live", value: `${stock} uds.` },
              { label: "Estado", value: status },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.75rem] bg-surface px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">{item.label}</p>
                <p className="mt-3 text-lg font-semibold text-on-surface">{item.value}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}