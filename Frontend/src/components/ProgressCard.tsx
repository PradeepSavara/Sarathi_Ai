import { motion } from "framer-motion";
import type { SprintProgress } from "../types";

export default function ProgressCard({ sprint }: { sprint: SprintProgress }) {
  const totalStories = sprint.completedStories + sprint.remainingStories;
  const remainingPercent = totalStories > 0 ? (sprint.remainingStories / totalStories) * 100 : 0;

  const metrics = [
    {
      label: "Completion",
      value: `${sprint.completion}%`,
      detail: `${sprint.completedStories} done`,
      accent: "from-sky-500 to-blue-600",
      progress: sprint.completion,
    },
    {
      label: "Velocity",
      value: `${sprint.velocity} SP`,
      detail: "team pace",
      accent: "from-emerald-500 to-lime-500",
      progress: Math.min(sprint.velocity, 100),
    },
    {
      label: "Remaining",
      value: `${sprint.remainingStories}`,
      detail: `${Math.round(remainingPercent)}% left`,
      accent: "from-amber-500 to-orange-500",
      progress: Math.min(remainingPercent, 100),
    },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Sprint Progress</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Current Sprint Delivery</h3>
        </div>
        <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
          {sprint.velocity} velocity
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/60">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700 dark:text-slate-200">Delivery momentum</span>
          <span className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
            {sprint.completion}% done
          </span>
        </div>
        <div className="relative h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${sprint.completion}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>{sprint.completedStories} completed</span>
          <span>{sprint.remainingStories} remaining</span>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 * index }}
            className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white/90 to-slate-50/70 p-3 shadow-sm dark:border-slate-700/80 dark:from-slate-900/80 dark:to-slate-800/70"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${metric.accent}`} />
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {metric.label}
                </p>
                <p className="mt-1 text-xl font-black text-slate-950 dark:text-white">{metric.value}</p>
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0.7 }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.2 }}
                className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${metric.accent}`}
              />
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
              <motion.div
                className={`h-1.5 rounded-full bg-gradient-to-r ${metric.accent}`}
                initial={{ width: 0 }}
                animate={{ width: `${metric.progress}%` }}
                transition={{ duration: 0.9 + index * 0.12, ease: "easeOut" }}
              />
            </div>
            <p className="mt-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">{metric.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
