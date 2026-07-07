import { Bug, CheckCircle2, GitPullRequest, ListPlus, Rocket } from "lucide-react";
import type { RecentActivityItem } from "../types";

const icons = {
  "work-item": ListPlus,
  bug: Bug,
  pr: GitPullRequest,
  pipeline: Rocket,
  sprint: CheckCircle2,
};

export default function RecentActivity({ items }: { items: RecentActivityItem[] }) {
  return (
    <div className="surface p-6">
      <h3 className="text-lg font-black">Recent Activity</h3>
      <div className="mt-5 grid gap-4">
        {items.map((item) => {
          const Icon = icons[item.type];
          return (
            <div className="flex gap-3" key={item.id}>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300"><Icon size={18} /></div>
              <div className="min-w-0">
                <p className="font-bold">{item.title}</p>
                <p className="truncate text-sm text-slate-500 dark:text-slate-400">{item.meta}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
