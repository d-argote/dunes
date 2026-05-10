"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductEditorData {
  name: string;
  description: string;
  price: string;
  comparePrice: string;
  stock: number;
  metaTitle: string;
  metaDescription: string;
}

const initialData: ProductEditorData = {
  name: "Hydrating Amazonian Serum",
  description: "Formulated with rare extracts from the Colombian rainforest, this serum provides deep architectural repair to the cellular matrix...",
  price: "185000",
  comparePrice: "",
  stock: 142,
  metaTitle: "Hydrating Amazonian Serum | DUNES Botanical",
  metaDescription: "Discover the architectural repair of our Amazonian Serum. Formulated with rare Colombian biodiversity extracts to restore your skin's structural integrity.",
};

export default function ProductEditorPage() {
  const router = useRouter();
  const [data, setData] = useState<ProductEditorData>(initialData);

  function set(field: keyof ProductEditorData, value: string | number) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 md:p-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1440px] mx-auto">

          {/* LEFT: Form 8 cols */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-24">

            {/* Basic Info */}
            <section className="flex flex-col gap-8">
              <div className="border-l-4 border-primary pl-4">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Basic Information</h2>
              </div>
              <input
                className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-0 py-4 font-headline text-3xl font-bold text-on-surface placeholder-on-surface-variant transition-colors outline-none tracking-[-0.02em]"
                placeholder="PRODUCT NAME"
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
              />
              <div className="flex flex-col gap-2 mt-8">
                <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Product Description</label>
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
                  />
                </div>
              </div>
            </section>

            {/* Pricing & Stock */}
            <section className="flex flex-col gap-8">
              <div className="border-l-4 border-primary pl-4">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Pricing &amp; Stock</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Base Price (COP)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg text-on-surface-variant">$</span>
                    <input
                      type="number"
                      className="w-full bg-surface-container-highest border-0 p-4 pl-8 font-body text-lg text-on-surface focus:ring-2 focus:ring-primary outline-none"
                      value={data.price}
                      onChange={(e) => set("price", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Compare at Price (COP)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-lg text-on-surface-variant">$</span>
                    <input
                      type="number"
                      className="w-full bg-surface-container-highest border-0 p-4 pl-8 font-body text-lg text-on-surface focus:ring-2 focus:ring-primary outline-none"
                      placeholder="0"
                      value={data.comparePrice}
                      onChange={(e) => set("comparePrice", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Inventory Available</label>
                  <div className="flex items-center gap-0 w-max border-2 border-surface-container-highest bg-surface-container-highest">
                    <button type="button" onClick={() => set("stock", Math.max(0, data.stock - 1))} className="p-4 text-on-surface hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      type="number"
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
              <div className="border-l-4 border-primary pl-4">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Media Gallery</h2>
              </div>
              <div className="w-full border-2 border-dashed border-outline-variant bg-surface-container-low p-16 flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:bg-surface-container transition-colors group">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span>
                </div>
                <div>
                  <p className="font-headline text-xl font-bold text-on-surface uppercase tracking-[-0.02em]">Drag &amp; Drop High-Res Imagery</p>
                  <p className="font-body text-base text-on-surface-variant mt-2">Supports JPG, PNG, WEBP, MP4 (Max 50MB)</p>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto py-2">
                <div className="w-24 h-24 shrink-0 bg-surface-container-highest border-2 border-primary relative">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg_3ALSRrZRzgbCFiQl-eUw-J1OMGqW3jTKIoRvwbiHcWUEPniifOAiSMpdG1mWhuyFKb7dBzteytjNnoide-2k6gqsd2KjhzUtThT5arGOHnidWU_HoOewZmbIdgeYseYIb3ZRYaQalVSVZ-ZZAkoep6EFZ6k9AL057AcFzxszfHnAFt19DoN-zun--YDAVT6wNJuQSqNktnRTKjlOQDhnPsoyg6h3u-0Fcwz3Tz0wH7vIrWUiXlN2R18LZEA6_OacX54mIQLUA" alt="Thumbnail" width={96} height={96} className="w-full h-full object-cover opacity-80" />
                  <span className="absolute -top-2 -right-2 bg-error text-on-error w-6 h-6 rounded-full flex items-center justify-center text-xs cursor-pointer">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </span>
                </div>
                <div className="w-24 h-24 shrink-0 border border-outline-variant border-dashed flex items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined">add</span>
                </div>
              </div>
            </section>

            {/* SEO */}
            <section className="flex flex-col gap-8">
              <div className="border-l-4 border-primary pl-4">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Search Engine Optimization</h2>
              </div>
              <div className="bg-surface-container-low p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Meta Title</label>
                    <span className="font-body text-xs font-semibold text-on-surface-variant">{data.metaTitle.length} / 60</span>
                  </div>
                  <input type="text" className="w-full bg-surface border-0 p-4 font-body text-base text-on-surface focus:ring-2 focus:ring-primary outline-none" value={data.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <label className="font-headline text-xl font-bold uppercase text-on-surface tracking-[-0.02em]">Meta Description</label>
                    <span className={`font-body text-xs font-semibold ${data.metaDescription.length > 150 ? "text-primary" : "text-on-surface-variant"}`}>{data.metaDescription.length} / 160</span>
                  </div>
                  <textarea className="w-full bg-surface border-0 p-4 h-24 font-body text-base text-on-surface focus:ring-2 focus:ring-primary outline-none resize-none" value={data.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} />
                </div>
                <div className="mt-4 p-6 border border-outline-variant bg-surface">
                  <p className="font-body text-xs font-semibold uppercase text-on-surface-variant mb-4">Search Result Preview</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-body text-base text-[#1a0dab] truncate cursor-pointer hover:underline">{data.metaTitle}</p>
                    <p className="font-body text-sm text-[#006621]">https://dunesbotanical.com/products/amazonian-serum</p>
                    <p className="font-body text-sm text-[#545454] line-clamp-2">{data.metaDescription}</p>
                  </div>
                </div>
              </div>
            </section>
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
                  <div className="h-[300px] w-full bg-surface-container-low relative">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1A4iSOBrflYg49w-2eQ-PYx4bd_cbcD1rOikpPpouahtDS6w1whg3oMqgmja1qT_InmzabM4OlactSb5r3LGqbb9nQNg4tAit8DJdKwMcAwPQdm6m1OZKmNyC5c7mhf1SxdtgzRhJ3J44IpbwtqRXZRolX1eKKplKWQSnQh2A6kXpE2UlyOB66EUvtWN7HwMa3rF-TiobUI5KXvq_Xe61Fitmtq6aVZNSapBaeYNDokTnYyboEo9P6WwFOSXVcC8toaiUoQreQ" alt="Product Mockup" fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <p className="font-body text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1">Face Collection</p>
                      <h4 className="font-headline text-2xl font-bold text-on-surface tracking-[-0.02em]">{data.name}</h4>
                    </div>
                    <p className="font-body text-lg font-bold text-on-surface">${parseInt(data.price || "0").toLocaleString()} COP</p>
                    <div className="mt-4 pt-4 border-t border-outline-variant">
                      <p className="font-body text-base text-on-surface-variant line-clamp-3">{data.description}</p>
                    </div>
                    <div className="w-full bg-primary text-on-primary font-brand text-sm font-semibold uppercase py-4 mt-4 text-center tracking-widest">
                      ADD TO CART
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
          <span className="font-brand text-xs font-semibold text-on-surface-variant tracking-widest uppercase hidden sm:block">2026 BOTANICAL ARCHITECT</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="hidden lg:flex items-center gap-6">
            <span className="font-brand text-sm font-semibold tracking-widest uppercase text-primary underline cursor-default">AUTO-SAVE: ACTIVE</span>
            <span className="font-brand text-sm font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary cursor-default">EDITOR MODE</span>
          </span>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="bg-primary text-on-primary font-brand text-sm font-semibold uppercase px-8 py-4 tracking-widest hover:bg-primary-container transition-colors"
          >
            PUBLICAR PRODUCTO
          </button>
        </div>
      </footer>
    </div>
  );
}