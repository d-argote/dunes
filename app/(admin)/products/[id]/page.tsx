"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

interface ProductForm {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
  images: string[];       // up to 4 gallery images
  video_url: string;      // optional product video
  metaTitle: string;
  metaDescription: string;
}

const empty: ProductForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  stock: 0,
  image_url: "",
  images: ["", "", "", ""],
  video_url: "",
  metaTitle: "",
  metaDescription: "",
};

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProductEditorPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const [data, setData] = useState<ProductForm>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // null = not uploading, number = image slot index (0-3), "video" = video slot
  const [uploadingSlot, setUploadingSlot] = useState<number | "video" | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const imageInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  function set<K extends keyof ProductForm>(field: K, value: ProductForm[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function handleNameChange(value: string) {
    set("name", value);
    if (isNew) set("slug", toSlug(value));
  }

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${params.id}`);
      if (!res.ok) { router.push("/admin/products"); return; }
      const p = await res.json();
      // Normalize images array to always have 4 slots
      const rawImages: string[] = Array.isArray(p.images) ? p.images : [];
      const images: string[] = [
        rawImages[0] ?? p.image_url ?? "",
        rawImages[1] ?? "",
        rawImages[2] ?? "",
        rawImages[3] ?? "",
      ];
      setData({
        name: p.name ?? "",
        slug: p.slug ?? "",
        description: p.description ?? "",
        price: String(p.price ?? ""),
        stock: p.stock ?? 0,
        image_url: p.image_url ?? "",
        images,
        video_url: p.video_url ?? "",
        metaTitle: p.name ? `${p.name} | DUNES Botanical` : "",
        metaDescription: p.description ?? "",
      });
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    if (!isNew) fetchProduct();
  }, [isNew, fetchProduct]);

  /** Upload a file (image or video) and return its public URL */
  async function uploadFile(file: File): Promise<string | null> {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const json = await res.json();
    if (!res.ok) { showToast(json.error ?? "Error al subir archivo.", false); return null; }
    return json.url as string;
  }

  /** Persist images + video_url immediately if editing an existing product */
  async function persistMedia(images: string[], video_url: string) {
    if (isNew) return;
    const cleanImages = images.filter(Boolean);
    await fetch(`/api/products/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images: cleanImages,
        image_url: cleanImages[0] ?? null,
        video_url: video_url || null,
      }),
    });
  }

  async function handleImageUpload(slotIndex: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSlot(slotIndex);
    try {
      const url = await uploadFile(file);
      if (!url) return;
      const newImages = [...data.images];
      newImages[slotIndex] = url;
      // Slot 0 also sets image_url (main image)
      const newImageUrl = newImages[0] || data.image_url;
      setData((prev) => ({ ...prev, images: newImages, image_url: newImageUrl }));
      await persistMedia(newImages, data.video_url);
      showToast(`Imagen ${slotIndex + 1} subida.`, true);
    } finally {
      setUploadingSlot(null);
      e.target.value = "";
    }
  }

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSlot("video");
    try {
      const url = await uploadFile(file);
      if (!url) return;
      setData((prev) => ({ ...prev, video_url: url }));
      await persistMedia(data.images, url);
      showToast("Video subido.", true);
    } finally {
      setUploadingSlot(null);
      e.target.value = "";
    }
  }

  function removeImage(slotIndex: number) {
    const newImages = [...data.images];
    newImages[slotIndex] = "";
    const newImageUrl = newImages[0] || data.image_url;
    setData((prev) => ({ ...prev, images: newImages, image_url: newImageUrl }));
    persistMedia(newImages, data.video_url);
  }

  function removeVideo() {
    setData((prev) => ({ ...prev, video_url: "" }));
    persistMedia(data.images, "");
  }

  async function handleSave() {
    if (!data.name || !data.slug || !data.price) {
      showToast("Nombre, slug y precio son requeridos.", false);
      return;
    }
    setSaving(true);
    try {
      const cleanImages = data.images.filter(Boolean);
      const body = {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        price: parseFloat(data.price),
        stock: data.stock,
        image_url: (cleanImages[0] ?? data.image_url) || null,
        images: cleanImages,
        video_url: data.video_url || null,
      };
      const res = await fetch(
        isNew ? "/api/products" : `/api/products/${params.id}`,
        { method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
      );
      const json = await res.json();
      if (!res.ok) { showToast(json.error ?? "Error al guardar.", false); return; }
      showToast(isNew ? "Producto creado." : "Cambios guardados.", true);
      if (isNew) router.push(`/admin/products/${json.id}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${params.id}`, { method: "DELETE" });
      if (!res.ok) { showToast("Error al eliminar.", false); return; }
      router.push("/admin/products");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] gap-4 text-on-surface-variant">
        <span className="material-symbols-outlined animate-spin">progress_activity</span>
        <span className="font-body text-base">Cargando producto...</span>
      </div>
    );
  }

  const previewImageUrl = data.images[0] || data.image_url;

  return (
    <div className="flex flex-col h-full">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 font-body text-sm font-semibold shadow-lg ${toast.ok ? "bg-primary text-on-primary" : "bg-error text-on-error"}`}>
          {toast.msg}
        </div>
      )}

      <div className="p-6 md:p-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1440px] mx-auto">

          {/* LEFT: Form 8 cols */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-24">

            {/* Basic Info */}
            <section className="flex flex-col gap-8">
              <div className="border-l-4 border-primary pl-4">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Información Básica</h2>
              </div>
              <input
                className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-0 py-4 font-headline text-3xl font-bold text-on-surface placeholder-on-surface-variant transition-colors outline-none tracking-[-0.02em]"
                placeholder="NOMBRE DEL PRODUCTO"
                value={data.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs font-semibold uppercase text-on-surface-variant tracking-widest">Slug (URL)</label>
                <input
                  className="w-full bg-surface-container-highest border-0 p-4 font-body text-base text-on-surface-variant focus:ring-2 focus:ring-primary outline-none"
                  placeholder="mi-producto"
                  value={data.slug}
                  onChange={(e) => set("slug", toSlug(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Descripción</label>
                <div className="border border-outline-variant bg-surface-container-lowest overflow-hidden flex flex-col">
                  <div className="flex items-center gap-2 p-2 bg-surface-container-low border-b border-outline-variant">
                    {["format_bold","format_italic","format_underlined","format_list_bulleted","format_list_numbered"].map((icon) => (
                      <button key={icon} type="button" className="p-1 text-on-surface-variant hover:text-primary">
                        <span className="material-symbols-outlined text-xl">{icon}</span>
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="w-full h-64 p-4 bg-transparent border-0 focus:ring-0 font-body text-base text-on-surface resize-y outline-none"
                    value={data.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Describe el producto..."
                  />
                </div>
              </div>
            </section>

            {/* Pricing & Stock */}
            <section className="flex flex-col gap-8">
              <div className="border-l-4 border-primary pl-4">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Precio y Stock</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Precio (COP)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg text-on-surface-variant">$</span>
                    <input
                      type="number"
                      min="0"
                      className="w-full bg-surface-container-highest border-0 p-4 pl-8 font-body text-lg text-on-surface focus:ring-2 focus:ring-primary outline-none"
                      value={data.price}
                      onChange={(e) => set("price", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Stock Disponible</label>
                  <div className="flex items-center gap-0 w-max border-2 border-surface-container-highest bg-surface-container-highest">
                    <button type="button" onClick={() => set("stock", Math.max(0, data.stock - 1))} className="p-4 text-on-surface hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      type="number"
                      min="0"
                      className="w-24 text-center bg-transparent border-0 p-4 font-body text-lg text-on-surface font-bold focus:ring-0 outline-none"
                      value={data.stock}
                      onChange={(e) => set("stock", parseInt(e.target.value) || 0)}
                    />
                    <button type="button" onClick={() => set("stock", data.stock + 1)} className="p-4 text-on-surface hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Media Gallery */}
            <section className="flex flex-col gap-8">
              <div className="border-l-4 border-secondary pl-4">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Galería de Medios</h2>
                <p className="font-body text-sm text-on-surface-variant mt-1">Hasta 4 imágenes + 1 video. La primera imagen es la principal.</p>
              </div>

              {/* 4 Image Slots */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((slotIndex) => {
                  const url = data.images[slotIndex] ?? "";
                  const isUploading = uploadingSlot === slotIndex;
                  return (
                    <div key={slotIndex} className="flex flex-col gap-2">
                      <div className="relative aspect-square bg-surface-container-low overflow-hidden group">
                        {url ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt={`Imagen ${slotIndex + 1}`} className="w-full h-full object-cover" />
                            {/* Overlay with remove button */}
                            <div className="absolute inset-0 bg-surface/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => imageInputRefs.current[slotIndex]?.click()}
                                className="p-2 bg-primary text-on-primary hover:bg-primary/80 transition-colors"
                                title="Cambiar imagen"
                              >
                                <span className="material-symbols-outlined text-xl">edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => removeImage(slotIndex)}
                                className="p-2 bg-error text-on-error hover:bg-error/80 transition-colors"
                                title="Eliminar imagen"
                              >
                                <span className="material-symbols-outlined text-xl">delete</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => imageInputRefs.current[slotIndex]?.click()}
                            disabled={isUploading}
                            className="w-full h-full flex flex-col items-center justify-center gap-2 hover:bg-surface-container-high transition-colors disabled:cursor-wait"
                          >
                            <span className="material-symbols-outlined text-4xl text-outline">add_photo_alternate</span>
                            <span className="font-body text-xs text-on-surface-variant uppercase tracking-widest">Foto {slotIndex + 1}{slotIndex === 0 ? " (principal)" : ""}</span>
                          </button>
                        )}
                        {isUploading && (
                          <div className="absolute inset-0 bg-surface/80 flex flex-col items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
                            <span className="font-body text-xs text-on-surface">Subiendo...</span>
                          </div>
                        )}
                        {/* Badge principal */}
                        {slotIndex === 0 && url && (
                          <span className="absolute top-2 left-2 bg-primary text-on-primary font-body text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5">Principal</span>
                        )}
                        <input
                          ref={(el) => { imageInputRefs.current[slotIndex] = el; }}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          className="hidden"
                          disabled={isUploading}
                          onChange={(e) => handleImageUpload(slotIndex, e)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Video Slot */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs font-semibold uppercase text-on-surface-variant tracking-widest">Video del producto (MP4 / WebM · máx. 100 MB)</label>
                <div className="relative w-full bg-surface-container-low overflow-hidden">
                  {data.video_url ? (
                    <div className="relative group">
                      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                      <video
                        src={data.video_url}
                        controls
                        className="w-full max-h-64 object-contain bg-black"
                      />
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => videoInputRef.current?.click()}
                          className="p-2 bg-primary text-on-primary hover:bg-primary/80 transition-colors"
                          title="Cambiar video"
                        >
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={removeVideo}
                          className="p-2 bg-error text-on-error hover:bg-error/80 transition-colors"
                          title="Eliminar video"
                        >
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      disabled={uploadingSlot === "video"}
                      className="w-full h-40 flex flex-col items-center justify-center gap-3 hover:bg-surface-container-high transition-colors disabled:cursor-wait"
                    >
                      <span className="material-symbols-outlined text-5xl text-outline">video_call</span>
                      <span className="font-body text-sm text-on-surface-variant uppercase tracking-widest">Subir Video</span>
                    </button>
                  )}
                  {uploadingSlot === "video" && (
                    <div className="absolute inset-0 bg-surface/80 flex flex-col items-center justify-center gap-3">
                      <span className="material-symbols-outlined text-primary text-4xl animate-spin">progress_activity</span>
                      <span className="font-body text-sm text-on-surface">Subiendo video...</span>
                    </div>
                  )}
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    className="hidden"
                    disabled={uploadingSlot === "video"}
                    onChange={handleVideoUpload}
                  />
                </div>
              </div>
            </section>

            {/* SEO */}
            <section className="flex flex-col gap-8">
              <div className="border-l-4 border-primary pl-4">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">SEO</h2>
              </div>
              <div className="bg-surface-container-low p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Meta Título</label>
                    <span className="font-body text-xs font-semibold text-on-surface-variant">{data.metaTitle.length} / 60</span>
                  </div>
                  <input type="text" className="w-full bg-surface border-0 p-4 font-body text-base text-on-surface focus:ring-2 focus:ring-primary outline-none" value={data.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Meta Descripción</label>
                    <span className={`font-body text-xs font-semibold ${data.metaDescription.length > 150 ? "text-primary" : "text-on-surface-variant"}`}>{data.metaDescription.length} / 160</span>
                  </div>
                  <textarea className="w-full bg-surface border-0 p-4 h-24 font-body text-base text-on-surface focus:ring-2 focus:ring-primary outline-none resize-none" value={data.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} />
                </div>
                <div className="mt-4 p-6 border border-outline-variant bg-surface">
                  <p className="font-body text-xs font-semibold uppercase text-on-surface-variant mb-4">Vista previa SERP</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-body text-base text-[#1a0dab] truncate">{data.metaTitle || "Título del producto"}</p>
                    <p className="font-body text-sm text-[#006621]">dunesbotanical.com/producto/{data.slug || "slug"}</p>
                    <p className="font-body text-sm text-[#545454] line-clamp-2">{data.metaDescription || "Descripción del producto..."}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Danger zone (edit only) */}
            {!isNew && (
              <section className="flex flex-col gap-4">
                <div className="border-l-4 border-error pl-4">
                  <h2 className="font-headline text-xl font-bold uppercase text-error tracking-[-0.02em]">Zona de Peligro</h2>
                </div>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="self-start border-2 border-error text-error font-brand text-sm font-semibold uppercase px-8 py-4 tracking-widest hover:bg-error hover:text-on-error transition-colors disabled:opacity-50"
                >
                  {deleting ? "ELIMINANDO..." : "ELIMINAR PRODUCTO"}
                </button>
              </section>
            )}
          </div>

          {/* RIGHT: Live Preview 4 cols */}
          <div className="col-span-1 lg:col-span-4 hidden lg:block relative">
            <div className="sticky top-[100px] flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-6">
                <h3 className="font-brand text-xs font-semibold uppercase tracking-widest text-on-surface-variant">VISTA PREVIA — PDP</h3>
                <span className="flex items-center gap-1 font-body text-xs font-semibold text-primary bg-primary-container/20 px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-sm animate-pulse">sensors</span> LIVE
                </span>
              </div>
              <div className="w-[320px] h-[640px] bg-background border-[12px] border-surface-container-highest rounded-[40px] overflow-hidden shadow-[0px_16px_32px_rgba(28,28,24,0.05)] relative flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-surface-container-highest rounded-b-xl z-20" />
                <div className="flex-1 overflow-y-auto bg-surface relative">
                  <div className="h-[300px] w-full bg-surface-container-low relative overflow-hidden">
                    {previewImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={previewImageUrl} alt={data.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-outline" style={{ fontVariationSettings: "'wght' 100" }}>image</span>
                      </div>
                    )}
                  </div>
                  {/* Thumbnail strip in preview */}
                  {data.images.some(Boolean) && (
                    <div className="flex gap-1 px-2 py-2 bg-surface-container-low">
                      {data.images.filter(Boolean).map((url, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={url} alt="" className={`w-12 h-12 object-cover cursor-pointer ${i === 0 ? "ring-2 ring-primary" : "opacity-60"}`} />
                      ))}
                      {data.video_url && (
                        <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-xl">play_circle</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <p className="font-body text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1">DUNES Botanical</p>
                      <h4 className="font-headline text-2xl font-bold text-on-surface tracking-[-0.02em]">{data.name || "Nombre del producto"}</h4>
                    </div>
                    <p className="font-body text-lg font-bold text-on-surface">${parseFloat(data.price || "0").toLocaleString("es-CO")} COP</p>
                    <div className="mt-4 pt-4 border-t border-outline-variant">
                      <p className="font-body text-base text-on-surface-variant line-clamp-3">{data.description || "Descripción del producto..."}</p>
                    </div>
                    <div className="w-full bg-primary text-on-primary font-brand text-sm font-semibold uppercase py-4 mt-4 text-center tracking-widest">
                      AGREGAR AL CARRITO
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky footer action bar */}
      <footer className="sticky bottom-0 w-full bg-surface-container-high border-t-2 border-primary flex justify-between items-center px-6 py-4 z-30">
        <div className="flex items-center gap-6">
          <span className="font-brand font-bold text-primary text-2xl tracking-tighter">DUNES</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="text-on-surface-variant font-brand text-sm font-semibold uppercase px-6 py-4 tracking-widest hover:text-primary transition-colors"
          >
            CANCELAR
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-on-primary font-brand text-sm font-semibold uppercase px-8 py-4 tracking-widest hover:bg-primary-container transition-colors disabled:opacity-50"
          >
            {saving ? "GUARDANDO..." : isNew ? "CREAR PRODUCTO" : "GUARDAR CAMBIOS"}
          </button>
        </div>
      </footer>
    </div>
  );
}
