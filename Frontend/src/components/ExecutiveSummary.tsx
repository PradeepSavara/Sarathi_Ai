import { Crown } from "lucide-react";
import type { ExecutiveSummaryData } from "../types";

export default function ExecutiveSummary({ summary }: { summary: ExecutiveSummaryData }) {
  const rows = [
    ["Overall Status", summary.overallStatus],
    ["Delivery Confidence", summary.deliveryConfidence],
    ["Budget Status", summary.budgetStatus],
    ["Risk Status", summary.riskStatus],
    ["Sprint Health", summary.sprintHealth],
  ];

  return (
    <div className="surface p-6">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950"><Crown size={20} /></div>
        <div>
          <h3 className="text-lg font-black">Executive Summary</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Portfolio health for PMO and senior management.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {rows.map(([label, value]) => (
          <div className="flex justify-between gap-4 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/50" key={label}>
            <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
            <strong className="text-right">{value}</strong>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900 dark:bg-blue-500/10 dark:text-blue-100">{summary.recommendation}</p>
    </div>
  );
}
