import { motion } from "framer-motion";
import type { SprintProgress } from "../types";

export default function ProgressCard({ sprint }: { sprint: SprintProgress }) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Sprint Progress</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Current Sprint Delivery</h3>
        </div>
        <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">{sprint.velocity} velocity</span>
      </div>
      <div className="mt-7">
        <div className="mb-2 flex justify-between text-sm font-semibold">
          <span>{sprint.completedStories} completed stories</span>
          <span>{sprint.remainingStories} remaining</span>
        </div>
        <div className="h-4 rounded-full bg-slate-100 dark:bg-slate-700">
          <motion.div className="h-4 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500" initial={{ width: 0 }} animate={{ width: `${sprint.completion}%` }} transition={{ duration: 1 }} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <MiniMetric label="Completion" value={`${sprint.completion}%`} />
        <MiniMetric label="Velocity" value={`${sprint.velocity} SP`} />
        <MiniMetric label="Remaining" value={`${sprint.remainingStories}`} />
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/60">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}
