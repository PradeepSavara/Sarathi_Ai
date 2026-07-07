import { CloudCog, DatabaseZap, KeyRound, SlidersHorizontal } from "lucide-react";
import InfoCard from "../components/InfoCard";

export default function Settings() {
  return (
    <div className="space-y-6">
      <section className="glass-card p-6">
        <p className="text-sm font-bold text-blue-600 dark:text-blue-300">Settings</p>
        <h1 className="mt-2 text-3xl font-black">Platform Configuration</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Configure Azure DevOps, AI settings, data sync, identity, and reporting preferences.</p>
      </section>
      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard icon={CloudCog} title="Azure DevOps" items={[["Status", "Connected"], ["Organization", "RetailX"], ["Last Sync", "06-Jul-2026 10:00 AM"]]} />
        <InfoCard icon={DatabaseZap} title="Data Sync" items={[["Work Items", "Enabled"], ["Pipelines", "Enabled"], ["Pull Requests", "Enabled"]]} />
        <InfoCard icon={KeyRound} title="Identity" items={[["Provider", "Microsoft Entra ID"], ["Role Mapping", "Enabled"], ["Admins", 4]]} />
        <InfoCard icon={SlidersHorizontal} title="AI Settings" items={[["Provider", "Gemini / Azure OpenAI ready"], ["Risk Model", "Active"], ["Insight Cadence", "Daily"]]} />
      </div>
    </div>
  );
}
