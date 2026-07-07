import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f6f8fc_34%,#eef2ff_100%)] text-ink transition-colors duration-300 dark:bg-[linear-gradient(135deg,#020617_0%,#0f172a_48%,#111827_100%)] dark:text-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
