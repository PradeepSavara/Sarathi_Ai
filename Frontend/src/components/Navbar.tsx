import { Bell, Bot, ChevronDown } from "lucide-react";
import logo from "../assets/sarathi-logo.jpeg";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-canvas/85 px-4 py-3 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/80 lg:px-6">
      <div className="flex items-center gap-4">
        <div className="flex min-w-fit items-center gap-3">
          <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-white/70 bg-white shadow-glow dark:border-slate-700 dark:bg-slate-900">
            <img className="h-full w-full object-cover object-top" src={logo} alt="Sarathi" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-black leading-tight text-slate-950 dark:text-white">Sarathi AI</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Delivery Governance</p>
          </div>
        </div>

        <div className="mx-auto hidden items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200 md:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_16px_rgba(34,197,94,.75)]" />
          Governance cockpit live
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="premium-focus hidden h-11 items-center gap-2 rounded-2xl bg-blue-600 px-4 text-sm font-bold text-white shadow-glow transition hover:scale-[1.02] sm:flex">
            <Bot size={18} /> AI Assistant
          </button>
          <button className="premium-focus grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <Bell size={18} />
          </button>
          <ThemeToggle />
          <button className="premium-focus flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500 text-xs font-black text-white">SP</span>
            <ChevronDown size={16} className="text-slate-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
