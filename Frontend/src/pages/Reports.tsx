import ExecutiveSummary from "../components/ExecutiveSummary";
import Loader from "../components/Loader";
import RecentActivity from "../components/RecentActivity";
import ReportButtons from "../components/ReportButtons";
import { useDashboardData } from "../hooks/useDashboardData";

export default function Reports() {
  const { data, loading } = useDashboardData();
  if (loading) return <Loader />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <section className="glass-card p-6">
        <p className="text-sm font-bold text-blue-600 dark:text-blue-300">Management Reporting</p>
        <h1 className="mt-2 text-3xl font-black">Executive Reports</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Export governance snapshots for weekly, monthly, quarterly, and portfolio review meetings.</p>
      </section>
      <ReportButtons />
      <div className="grid gap-6 xl:grid-cols-2">
        <ExecutiveSummary summary={data.executiveSummary} />
        <RecentActivity items={data.recentActivity} />
      </div>
    </div>
  );
}
