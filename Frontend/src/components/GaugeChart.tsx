import { motion } from "framer-motion";

export default function GaugeChart({ score }: { score: number }) {
  const rotation = -90 + (score / 100) * 180;

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Project Health</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Circular Gauge</h2>
        </div>
        <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">Healthy</span>
      </div>
      <div className="relative mx-auto mt-8 h-44 w-72 max-w-full overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-36 rounded-t-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500 p-4">
          <div className="h-full rounded-t-full bg-white dark:bg-slate-800" />
        </div>
        <motion.div
          className="absolute bottom-0 left-1/2 h-1.5 w-32 origin-left rounded-full bg-slate-950 dark:bg-white"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <div className="absolute bottom-0 left-1/2 h-5 w-5 -translate-x-1/2 translate-y-1/2 rounded-full bg-slate-950 ring-4 ring-white dark:bg-white dark:ring-slate-800" />
      </div>
      <div className="text-center">
        <p className="text-5xl font-black text-slate-950 dark:text-white">{score}%</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Health Score</p>
      </div>
    </div>
  );
}
