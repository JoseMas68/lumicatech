import { notFound } from "next/navigation";
import { getBudgetByToken } from "@/src/lib/budgets-db";
import { DEFAULT_BUDGET_FOOTER, getTemplateTheme } from "@/src/lib/budget-branding";
import ResponseActions from "./ResponseActions";

export default async function PublicBudgetPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const budget = await getBudgetByToken(token);
  if (!budget) notFound();
  const theme = getTemplateTheme(budget.template);

  const canRespond = budget.status === "enviado";

  return (
    <main className="min-h-screen bg-[#0f1220] text-white px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className={`rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/10 to-blue-600/10 p-6`}>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Presupuesto</p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">{budget.title}</h1>
          <p className="text-sm text-slate-300 mt-2">{budget.clientName} · {budget.clientEmail}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded-full border border-white/20">Estado: {budget.status}</span>
            <span className="px-2 py-1 rounded-full border border-white/20">Creado: {new Date(budget.createdAt).toLocaleDateString("es-ES")}</span>
            {budget.validUntil && <span className="px-2 py-1 rounded-full border border-white/20">Valido hasta: {budget.validUntil}</span>}
          </div>
        </header>

        <section className="rounded-2xl border border-white/10 bg-[#171b30] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 text-sm text-slate-300">Detalle de lineas</div>
          <div className="divide-y divide-white/5">
            {budget.items.map((item) => (
              <div key={item.id} className="px-4 py-3 grid grid-cols-12 gap-2 items-center text-sm">
                <div className="col-span-6 font-medium">{item.concept}</div>
                <div className="col-span-2 text-slate-300">{item.quantity} ud</div>
                <div className="col-span-2 text-slate-300">{item.unitPrice.toFixed(2)} {budget.currency}</div>
                <div className="col-span-2 text-right font-semibold">{item.total.toFixed(2)} {budget.currency}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#171b30] p-4 sm:p-6">
          <div className="space-y-2 text-sm">
            <Line label="Subtotal" value={`${budget.subtotal.toFixed(2)} ${budget.currency}`} />
            <Line label={`Impuestos (${budget.taxPercent}%)`} value={`${budget.taxAmount.toFixed(2)} ${budget.currency}`} />
            <Line label="Descuento" value={`${budget.discount.toFixed(2)} ${budget.currency}`} />
            <div className="pt-2 mt-2 border-t border-white/10">
              <Line label="Total final" value={`${budget.finalTotal.toFixed(2)} ${budget.currency}`} strong />
            </div>
          </div>

          {budget.notes && (
            <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-slate-300">
              {budget.notes}
            </div>
          )}

          {canRespond && (
            <ResponseActions token={token} />
          )}

          {!canRespond && (
            <p className="mt-6 text-sm text-slate-300">Este presupuesto no admite respuesta en este estado.</p>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400 whitespace-pre-line">
            {budget.brandFooter || DEFAULT_BUDGET_FOOTER}
          </div>
        </section>
      </div>
    </main>
  );
}

function Line({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={`text-slate-300 ${strong ? "font-semibold" : ""}`}>{label}</span>
      <span className={strong ? "font-bold text-lg" : "font-medium"}>{value}</span>
    </div>
  );
}
