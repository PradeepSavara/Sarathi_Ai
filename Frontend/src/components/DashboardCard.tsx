import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Kpi } from "../types";
import AnimatedCounter from "./AnimatedCounter";

const trendIcons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: ArrowRight,
};

export default function DashboardCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const Icon = kpi.icon;
  const TrendIcon = trendIcons[kpi.trendDirection];

  return (
    <motion.article
      className="glass-card group p-5"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600/10 text-blue-600 dark:bg-blue-400/15 dark:text-blue-300">
          <Icon size={22} />
        </div>
        <span className={`badge ${kpi.trendDirection === "down" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"}`}>
          <TrendIcon size={14} /> {kpi.trend}
        </span>
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{kpi.title}</p>
        <p className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          <AnimatedCounter value={kpi.value} />
        </p>
      </div>
      <div className="mt-5 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
        <motion.div
          className="h-2 rounded-full bg-blue-600 dark:bg-blue-400"
          initial={{ width: 0 }}
          animate={{ width: `${kpi.progress}%` }}
          transition={{ duration: 0.8, delay: index * 0.04 }}
        />
      </div>
    </motion.article>
  );
}
