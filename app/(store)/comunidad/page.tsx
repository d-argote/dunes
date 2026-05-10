import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comunidad — Hombres que Cuidan su Cabello con Disciplina",
  description:
    "Conoce la comunidad DUNES: hombres que apostaron por el shampoo natural orgánico colombiano y transformaron su cabello con ciencia botánica y disciplina.",
  alternates: { canonical: "https://ditechdev.com/comunidad" },
  openGraph: {
    title: "Comunidad DUNES | Shampoo Natural para Hombres en Colombia",
    description:
      "Hombres de disciplina que eligieron el cuidado capilar natural. Shampoo orgánico colombiano sin químicos agresivos.",
    url: "https://ditechdev.com/comunidad",
    type: "website",
  },
};

export default function ComunidadPage() {
  return (
    <main className="pt-24">
      {/* ── Hero ── */}
      <section className="relative min-h-[795px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover"
            alt="Comunidad DUNES — hombres de disciplina"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlmVL5o_DMZb0I4TkpACfIEPG-T96dB-RUypdgrWLuYisfAQGet4QfBAURdsrnoVZufhvfs3im0DzJkdqXMah1HoP0p4C6Qu0wQMJk6rgKIiL1hsh2VUu7wty93bAb-Gtri9xBp5fzRlMLASPqOOzxIX4m0n79XPPBqrrU9uNbK_iHetnfVN-7zFvIvnaRl0YREn8JCv2ShkvkogpPPmlVH_kElimd8TdIo6iGk3TlSGnFSlfBWKoUr_lifGMocfdKl4"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto">
          <h1 className="font-brand text-[12vw] md:text-[8vw] leading-none text-white font-bold tracking-tighter uppercase">
            SOMOS<br />DUNES
          </h1>
          <div className="mt-8 flex md:justify-end">
            <p className="max-w-md text-white/90 text-lg md:text-xl font-light leading-relaxed border-l-2 border-primary-fixed-dim pl-6">
              Una comunidad forjada en la disciplina, el rigor científico y la
              herencia botánica de nuestra tierra.
            </p>
          </div>
        </div>
      </section>

      {/* ── Manifiesto ── */}
      <section className="py-24 bg-surface px-6">
        <div className="max-w-4xl mx-auto">
          <span className="font-brand text-secondary tracking-[0.3em] uppercase text-sm mb-6 block">
            El Manifiesto
          </span>
          <div className="space-y-12">
            <h2 className="font-brand text-4xl md:text-6xl text-on-surface leading-tight">
              No somos negación.<br />No somos filtros.<br />No somos excusas.
            </h2>
            <div className="grid md:grid-cols-2 gap-12 font-body text-on-surface-variant leading-loose text-lg">
              <p>
                Entendemos el cuidado como un acto de arquitectura personal. No
                buscamos la perfección artificial, sino la salud estructural. En
                DUNES, creemos que el rostro de un hombre cuenta su historia de
                perseverancia, y nuestro propósito es asegurar que esa historia se
                mantenga con vigor.
              </p>
              <p>
                Nuestra disciplina no conoce atajos. Combinamos la sabiduría
                ancestral de las plantas colombianas con los estándares más estrictos
                de la dermatología moderna. Somos el puente entre la selva y el
                laboratorio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nuestro Proceso (Bento) ── */}
      <section className="py-24 bg-surface-container-low px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="font-brand text-secondary tracking-[0.3em] uppercase text-sm mb-4 block">
                Fabricación
              </span>
              <h2 className="font-brand text-5xl text-on-surface uppercase tracking-tighter">
                Nuestro Proceso
              </h2>
            </div>
            <p className="max-w-sm text-on-surface-variant text-sm uppercase tracking-widest font-medium">
              Hecho en Colombia • Ciencia Botánica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 h-[500px] overflow-hidden relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                alt="Laboratorio botánico DUNES"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaqXK7SCPHbhpDQWmswPDqnUtmjWc8VxS-9SRPjFRUKAq3lFv2JHPXYxpKTzk25Eh4uHr4mYifpwTUFg4clv7cxbKJUlMQbdjpsML0N_4K-Ji-lPJoZu5pPgi3pKza05_Ha1FROhaBjXyN9HhWMHm3tTt38CbWBCzKwF5vsBu4H-a9pJ7Bk5HV-zwHOmD-vj7g6dxb8qlVLm4p3k17DatZnIRV8qDCOuzxWmxxM6NZIRuX6GQYJSR6llbzpuXvsVsJRi2oioaQYjM"
              />
              <div className="absolute bottom-8 left-8 text-white z-10">
                <h3 className="font-brand text-2xl uppercase mb-2">Rigor Científico</h3>
                <p className="text-sm font-light max-w-xs opacity-80">
                  Extracciones controladas grado farmacéutico.
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="md:col-span-4 h-[500px] bg-surface-container-highest p-8 flex flex-col justify-center">
              <span className="material-symbols-outlined text-primary text-5xl mb-6">
                science
              </span>
              <h3 className="font-brand text-3xl uppercase text-on-surface mb-4">
                Herencia Viva
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                Desde el romero del Altiplano hasta el jengibre de las regiones
                cálidas, cada ingrediente es seleccionado por su pureza y potencia
                biológica.
              </p>
            </div>

            <div className="md:col-span-4 h-[400px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt="Ingredientes botánicos DUNES seleccionados a mano"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB98t4hYhDpD0nG_WixmzenPjVQHq7H9TpLYjSnSmyRqM9e_FSa8SnMo6YSIq_hrnU4jfHinrK2W2o6_wlc3FnEeTaFxHBthCil74_SoBUNmtpyFjYikSDrE9va-Wh89q3eJLzFJjcmNh6ai7pkHcy_Y-JAUEPtRwGJz42qrvVTege8upF6YMhUfPD4TWHaNu2T1wR3gBDy_2zRjtpYMB6SyiSW-XmG8M6XJv4APo5zz98zUp2L-yRjCikab774dEG0vl3ROWLGDjM"
              />
            </div>

            <div className="md:col-span-8 h-[400px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt="Control de calidad línea de producción DUNES"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMvABDvr5IOZEbgDDbHDMq3_w68D_2C3kRlDZgc0Fx0_V4qWdx0NW256aj3fmIxFZqVBEX2XqyoayLMwNyULA1SCRRUTJy4Hy_CagwtY_4njbtmJnMvOAgiLMrmYfJ7y0gdscNnnsrPNRsRSR5ZKX0zgaH6tzUl-zywyOAx1kA5LAMp5gjLwmxNNc_kUBL5TzBi-bO4g6-rBTs6lyo00Q2ean2MBuNNNcFg6PyGF_3ttNoD0HBAUaH0BIWqGT8ocq4ZS9plcyxJM4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Comunidad Gallery ── */}
      <section className="py-24 bg-surface px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="font-brand text-secondary tracking-[0.3em] uppercase text-sm mb-4 block">
            La Comunidad
          </span>
          <h2 className="font-brand text-5xl text-on-surface uppercase">Hombres de Disciplina</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="aspect-[4/5] overflow-hidden bg-surface-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
              alt="Usuario DUNES — cuidado capilar en baño minimalista"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdZ9CrN_NYVIru5tlwZcyAfih6Re1hojwNCVRXeDRsXeXR0YpL6hC0bPfMk7G4FiYyiBuj7LpMkzgKO58d7xX_m2a5D889CrA_OOPtsSkiVJwA4I0PO251wsOQimj8la8ZPOzfCxKLewgPC9xQTzCcbTNE0juYahjkhfYyENFBSRFvKQffMj1n-f6oNbUpbfGVTKa5F-Uf4CWUdu--hWqMcf6zhDJq5heZg_9BvUjP-X1GiK5thYnN3wOkGccNUA75-tH3yusSzoA"
            />
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-surface-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
              alt="Usuario DUNES — piel saludable al aire libre"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuA2tiVN_Dqb84GfTfRDiCu6pMkcO17K87IwOsvdGblXejJmL7FN6zP2PrvBw4HY9-A5qNtJ5Yc7u4k871T3gAr2kVqEq0-k59xYXbmVbDmmk-YfsyWjn1DPC0hx8oEW9-cccvPjbxJD-WCpcACyQtIgJlGge9BrYgZ8wqa_gRAuA5ZOI3Rbvp5QkvhB_s9YjkACtdcfegmfIkknsuXzeycD4xRVz2azUMFlX4lruWLH8g9-mZGg3LBeWQYTE8LcJOHSaER5ybaxE"
            />
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-surface-container hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
              alt="Usuario DUNES — profesional con imagen impecable"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVmAbZKD2z8O4IM9kLcXiku9AVnfZj4tQJYR8SQdUjOyekYzZda8EE0HKRZxsGL5e5AjvIBxM4unULfw7M8Bt3qRwR0lXldE5JQzCb55WWrRwlfal744OJk80g95wyTr_-WIXlqtKbzHmSy-y0n69gbcM4VJFZIJyUEEvLuTXBbq_0506H9tLO_AfzWOn5G067xoakE9eglZs6ScUGb8UQXppCTFKi0ZcC6o5CxHdzElc-8DJvA11C_y-7_2fGQYlJspI2-0qZB1w"
            />
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-surface-container hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
              alt="Usuario DUNES — confianza en ambiente urbano"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTIs0t-1Uf6qkW6JnUJ-z8G-n0N0CwExmBZggc601sJddLzYHLxQvT1hGPHlKuIOdLOghv5U6tDs37nr6EuvTKy4PL_cnAMr9Skis9-xk9yF-_FwO4c8G6iab6JA3J_uBrZgqq8Zs_t5QFpwhsDp2-w7n7uegdvjtiCfO9eoPXPR72x3qwTAvoTGQ5CdYIOnwWESRJ5A9EeRw7mSz-sEjBwg7xkLrgC76ppEl6F7UZn7D4UdVOQDStXf2A2iXchl19gERsfX3nj3g"
            />
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-surface-container hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
              alt="Usuario DUNES — retrato editorial con luz natural"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwAtDNV7kXORXbOQBC4RLdtmTbNbITdI4S2YiUYmxTxGunfznX4tHt0rdxk3nmxs-bIR6j81CFtpPrwFqAlnbuFn6iePvAH7_wX2VpmyOrxX5kGwMrKZ1-A9T8gne-YprmjgIy0eewA_SyF_OuWJ8KMw7FscUws_OFytwAp0gOrru5xb1W2zJhvAjMf_lBQRv5oN7Zt_C-xosKFj57tn6xc2TQssvU_uz0GbvF9DnUf6SyHeXQTAOfw_a2sa6dF0AmHpAG5lHQkSQ"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 bg-primary text-on-primary text-center px-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-brand text-5xl md:text-7xl mb-8 leading-tight tracking-tighter uppercase">
            ÚNETE A LA DISCIPLINA
          </h2>
          <p className="font-body text-lg text-primary-fixed opacity-90 mb-12 max-w-lg mx-auto leading-relaxed">
            Sé parte de la nueva era del cuidado masculino. No es vanidad, es
            arquitectura.
          </p>
          <Link
            href="/tienda"
            className="bg-surface text-primary font-brand px-12 py-5 text-xl tracking-widest uppercase hover:bg-primary-fixed hover:scale-105 transition-all duration-300 inline-block"
          >
            SABER MÁS
          </Link>
        </div>
      </section>
    </main>
  );
}
