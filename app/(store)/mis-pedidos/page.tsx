import type { Metadata } from "next";
import OrderLookup from "./_components/OrderLookup";

export const metadata: Metadata = { title: "Mis pedidos" };

export default function MisPedidosPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="display text-4xl text-primary mb-4">MIS PEDIDOS</h1>
      <p className="text-on-surface-variant mb-10 text-sm">
        Ingresa el correo electronico con el que realizaste tu compra para ver el estado de tus pedidos.
      </p>
      <OrderLookup />
    </section>
  );
}
