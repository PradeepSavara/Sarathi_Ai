import type { LucideIcon } from "lucide-react";

export default function InfoCard({ icon: Icon, title, items }: { icon: LucideIcon; title: string; items: Array<[string, string | number]> }) {
  return (
    <div className="surface p-6">
      <h3 className="mb-5 flex items-center gap-2 text-lg font-black"><Icon size={20} /> {title}</h3>
      <div className="grid gap-3">
        {items.map(([label, value]) => (
          <div className="flex justify-between gap-4 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/50" key={label}>
            <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
            <strong className="text-right">{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
