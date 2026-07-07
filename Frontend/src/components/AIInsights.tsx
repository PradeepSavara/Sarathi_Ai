import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

export default function AIInsights({ insights }: { insights: string[] }) {
  return (
    <motion.div id="ai" className="glass-card overflow-hidden p-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-glow">
          <Bot size={23} />
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-300">Gemini Generated Summary</p>
          <h3 className="mt-1 text-2xl font-black">AI Delivery Insights</h3>
        </div>
      </div>
      <div className="mt-6 grid gap-3">
        {insights.map((insight) => (
          <div className="flex gap-3 rounded-2xl bg-white/70 p-4 text-sm leading-6 dark:bg-slate-900/50" key={insight}>
            <Sparkles size={18} className="mt-0.5 shrink-0 text-blue-500" />
            <span>{insight}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
