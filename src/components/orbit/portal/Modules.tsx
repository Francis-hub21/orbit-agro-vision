import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Copy, KeyRound, ShieldCheck, ScanLine, Trash2, Plus, Check } from "lucide-react";
import { catalog, fmt, tierPrice, HUBS, type Currency } from "./data";

const inputCls =
  "w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary";

/* ---------------- Bulk Order Engine ---------------- */
export function BulkOrder({ currency }: { currency: Currency }) {
  const [rows, setRows] = useState<{ sku: string; qty: number }[]>([
    { sku: catalog[0].sku, qty: 60 },
    { sku: catalog[3].sku, qty: 12 },
  ]);
  const [paste, setPaste] = useState("");
  const [batch, setBatch] = useState<number | null>(null);

  const lines = rows.map((r) => {
    const item = catalog.find((c) => c.sku.toLowerCase() === r.sku.trim().toLowerCase());
    const unit = item ? tierPrice(item.priceKes, r.qty) : 0;
    return { ...r, item, unit, total: unit * r.qty };
  });
  const grand = lines.reduce((a, l) => a + l.total, 0);

  const importPaste = () => {
    const parsed = paste
      .split(/\n+/)
      .map((l) => l.split(/[,\t;\s]+/).filter(Boolean))
      .filter((p) => p.length >= 2)
      .map(([sku, q]) => ({ sku, qty: Math.max(1, parseInt(q) || 1) }));
    if (parsed.length) setRows((r) => [...r, ...parsed]);
    setPaste("");
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-[1fr_auto] gap-3">
        <textarea
          name="bulk-paste"
          id="bulk-paste"
          rows={2}
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
          placeholder={`Paste SKU + quantity per line, e.g.\n${catalog[1].sku}, 120`}
          className={inputCls}
        />
        <button onClick={importPaste} className="rounded-xl border border-primary/50 px-4 text-sm text-primary hover:bg-primary/10">
          Import list
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs text-muted-foreground">
            <tr>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-right">Qty</th>
              <th className="p-3 text-right">Unit</th>
              <th className="p-3 text-right">Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-2">
                  <input
                    name={`sku-${i}`}
                    list="sku-list"
                    value={l.sku}
                    onChange={(e) => setRows((r) => r.map((x, j) => (j === i ? { ...x, sku: e.target.value } : x)))}
                    className={inputCls + " min-w-40"}
                  />
                </td>
                <td className="p-2">{l.item ? l.item.name : <span className="text-destructive">Unknown SKU</span>}</td>
                <td className="p-2 text-right">
                  <input
                    name={`qty-${i}`}
                    type="number"
                    min={1}
                    value={l.qty}
                    onChange={(e) =>
                      setRows((r) => r.map((x, j) => (j === i ? { ...x, qty: Math.max(1, +e.target.value || 1) } : x)))
                    }
                    className={inputCls + " w-24 text-right"}
                  />
                </td>
                <td className="p-2 text-right">{fmt(l.unit, currency)}</td>
                <td className="p-2 text-right font-medium">{fmt(l.total, currency)}</td>
                <td className="p-2">
                  <button aria-label="Remove line" onClick={() => setRows((r) => r.filter((_, j) => j !== i))}>
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <datalist id="sku-list">
          {catalog.map((c) => (
            <option key={c.sku} value={c.sku}>{c.name}</option>
          ))}
        </datalist>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setRows((r) => [...r, { sku: "", qty: 1 }])}
          className="flex items-center gap-1.5 text-sm text-primary"
        >
          <Plus className="h-4 w-4" /> Add line
        </button>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Batch total</div>
            <div className="font-display text-2xl">{fmt(grand, currency)}</div>
          </div>
          <button
            disabled={!grand}
            onClick={() => setBatch(Math.floor(10000 + Math.random() * 89999))}
            className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground disabled:opacity-40"
          >
            Add to batch order
          </button>
        </div>
      </div>
      {batch && (
        <p className="text-sm text-primary flex items-center gap-2">
          <Check className="h-4 w-4" /> Batch #B-{batch} queued with {lines.filter((l) => l.item).length} lines.
        </p>
      )}
    </div>
  );
}

/* ---------------- Inventory & Pricing ---------------- */
export function Inventory({ currency, query }: { currency: Currency; query: string }) {
  const list = useMemo(
    () =>
      catalog.filter((c) =>
        `${c.sku} ${c.name} ${c.family}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <div className="overflow-x-auto rounded-2xl border border-border max-h-[480px]">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-card text-muted-foreground">
          <tr>
            <th className="p-3 text-left">Product</th>
            {HUBS.map((h) => <th key={h} className="p-3 text-right">{h}</th>)}
            <th className="p-3 text-right">1–50</th>
            <th className="p-3 text-right">51–500 (−15%)</th>
            <th className="p-3 text-right">501+ contract</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.sku} className="border-t border-border">
              <td className="p-3">
                <div className="font-medium text-sm">{c.name}</div>
                <div className="text-muted-foreground">{c.sku} · {c.family}</div>
              </td>
              {HUBS.map((h) => (
                <td key={h} className={`p-3 text-right ${c.stock[h] ? "" : "text-destructive"}`}>
                  {c.stock[h] || "Out"}
                </td>
              ))}
              <td className="p-3 text-right">{fmt(c.priceKes, currency)}</td>
              <td className="p-3 text-right">{fmt(c.priceKes * 0.85, currency)}</td>
              <td className="p-3 text-right text-primary">{fmt(c.priceKes * 0.75, currency)}</td>
            </tr>
          ))}
          {!list.length && (
            <tr><td colSpan={9} className="p-6 text-center text-muted-foreground">No products match your search.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Authentication ---------------- */
export function Authenticate() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<null | { ok: boolean; item?: (typeof catalog)[number] }>(null);
  const verify = () => {
    const m = code.trim().toUpperCase().match(/^OAC-(\d{4})-([A-Z0-9]{2,})$/);
    if (!m) return setResult({ ok: false });
    const item = catalog[parseInt(m[2], 36) % catalog.length];
    setResult({ ok: true, item });
  };
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-dashed border-primary/50 p-6 flex flex-col items-center justify-center text-center gap-3">
        <ScanLine className="h-12 w-12 text-primary animate-pulse" />
        <p className="text-sm text-muted-foreground">Enter the batch code printed on the label (e.g. OAC-2026-X9).</p>
        <div className="flex w-full gap-2">
          <input
            name="batch-code"
            id="batch-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verify()}
            placeholder="OAC-2026-X9"
            className={inputCls}
          />
          <button onClick={verify} className="rounded-xl bg-primary px-4 text-sm text-primary-foreground">Verify</button>
        </div>
      </div>
      <div className="rounded-2xl border border-border p-6">
        {!result && <p className="text-sm text-muted-foreground">Results will appear here.</p>}
        {result && !result.ok && (
          <p className="text-sm text-destructive">
            This code could not be verified. The product may be counterfeit — please report it to orbitagro@orbitagro.co.ke.
          </p>
        )}
        {result?.ok && result.item && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary"><ShieldCheck className="h-5 w-5" /> Genuine Orbit product</div>
            <div className="font-display text-xl">{result.item.name}</div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Family: {result.item.family}</li>
              <li>Batch: {code.toUpperCase()}</li>
              <li>Compliance: PCPB registered · QA certified</li>
            </ul>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link to="/products" className="text-primary underline">Safety & use instructions</Link>
              <a href="https://www.orbitagro.co.ke/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                Compliance documents
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- API Keys ---------------- */
export function ApiKeys() {
  const [keys, setKeys] = useState<{ token: string; created: string }[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const generate = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(24));
    const token = "sk_live_" + Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    setKeys((k) => [{ token, created: new Date().toLocaleString() }, ...k]);
  };
  const copy = async (t: string) => {
    await navigator.clipboard.writeText(t);
    setCopied(t);
    setTimeout(() => setCopied(null), 1500);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground max-w-lg">
          Sync live inventory into your ERP. Keys are shown once — store them securely.
        </p>
        <button onClick={generate} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">
          <KeyRound className="h-4 w-4" /> Generate new API key
        </button>
      </div>
      {keys.map((k) => (
        <div key={k.token} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 p-3 font-mono text-xs">
          <span>{k.token.slice(0, 12)}••••••••{k.token.slice(-4)}</span>
          <span className="hidden md:inline text-muted-foreground font-sans">{k.created}</span>
          <button onClick={() => copy(k.token)} className="flex items-center gap-1 text-primary font-sans">
            {copied === k.token ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied === k.token ? "Copied" : "Copy"}
          </button>
        </div>
      ))}
      <pre className="overflow-x-auto rounded-xl bg-muted/40 p-4 text-xs">
{`curl https://api.orbitagro.co.ke/v1/inventory \\
  -H "Authorization: Bearer sk_live_••••"`}
      </pre>
    </div>
  );
}
