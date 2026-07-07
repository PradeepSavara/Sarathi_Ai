import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/theme/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      className="premium-focus grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      onClick={toggleTheme}
      title="Toggle theme"
    >
      <Icon size={18} />
    </button>
  );
}
