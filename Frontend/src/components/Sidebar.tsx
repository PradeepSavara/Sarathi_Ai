import { BarChart3, CheckSquare, FileText, Gauge, Lightbulb, PanelLeftClose, PanelLeftOpen, Settings, ShieldAlert, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: Gauge },
  { label: "Projects", to: "/projects", icon: Target },
  { label: "Sprint Analytics", to: "/analytics", icon: BarChart3 },
  { label: "AI Insights", to: "/ai-insights", icon: Lightbulb },
  { label: "Risks", to: "/risks", icon: ShieldAlert },
  { label: "Action Items", to: "/action-items", icon: CheckSquare },
  { label: "Reports", to: "/reports", icon: FileText },
  { label: "Settings", to: "/settings", icon: Settings },
];

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();

  const isItemActive = (to: string) => location.pathname === to;

  return (
    <motion.aside
      animate={{ width: collapsed ? 88 : 280 }}
      className="hidden border-r border-slate-200/80 bg-white/75 p-4 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/60 lg:block"
    >
      <div className="flex items-center justify-between">
        {!collapsed && <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Workspace</span>}
        <button className="premium-focus grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800" onClick={onToggle}>
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="mt-8 grid gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item.to);
          return (
            <Link
              className={`group flex h-12 items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-800 ${
                active ? "bg-blue-600 text-white shadow-glow hover:bg-blue-600 hover:text-white" : "text-slate-600 dark:text-slate-300"
              }`}
              key={item.label}
              to={item.to}
              title={item.label}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
