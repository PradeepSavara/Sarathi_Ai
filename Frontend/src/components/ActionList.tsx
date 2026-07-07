import { CheckCircle2, Circle } from "lucide-react";
import type { ActionItem, Priority } from "../types";

const priorityClass: Record<Priority, string> = {
  Critical: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
};

export default function ActionList({ actions }: { actions: ActionItem[] }) {
  return (
    <div className="surface p-6">
      <h3 className="text-lg font-black">Action Items</h3>
      <div className="mt-5 grid gap-3">
        {actions.map((action) => (
          <label className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-900/40" key={action.id}>
            <input className="sr-only" type="checkbox" defaultChecked={action.completed} />
            {action.completed ? <CheckCircle2 className="text-emerald-500" /> : <Circle className="text-slate-400" />}
            <span className="min-w-0 flex-1">
              <span className="block truncate font-bold">{action.title}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{action.owner} / Due {action.dueDate}</span>
            </span>
            <span className={`badge ${priorityClass[action.priority]}`}>{action.priority}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
