import type { Priority, Risk } from "../types";

const priorityClass: Record<Priority, string> = {
  Critical: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
};

export default function RiskTable({ risks }: { risks: Risk[] }) {
  return (
    <div className="surface overflow-hidden">
      <div className="border-b border-slate-200 p-6 dark:border-slate-700">
        <h3 className="text-lg font-black">Risk Register</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Probability, impact, ownership, priority, status, and due date.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-900/60 dark:text-slate-400">
            <tr>
              {["Risk", "Owner", "Probability", "Impact", "Priority", "Status", "Due Date"].map((header) => <th className="px-5 py-4" key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {risks.map((risk) => (
              <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40" key={risk.id}>
                <td className="px-5 py-4 font-semibold">{risk.risk}</td>
                <td className="px-5 py-4">{risk.owner}</td>
                <td className="px-5 py-4">{risk.probability}</td>
                <td className="px-5 py-4">{risk.impact}</td>
                <td className="px-5 py-4"><span className={`badge ${priorityClass[risk.priority]}`}>{risk.priority}</span></td>
                <td className="px-5 py-4"><span className="badge bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100">{risk.status}</span></td>
                <td className="px-5 py-4">{risk.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
