import AIInsights from "../components/AIInsights";
import ExecutiveSummary from "../components/ExecutiveSummary";
import Loader from "../components/Loader";
import RecentActivity from "../components/RecentActivity";
import { useDashboardData } from "../hooks/useDashboardData";

export default function AIInsightsPage() {
  const { data, loading } = useDashboardData();
  if (loading) return <Loader />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <section className="glass-card p-6">
        <p className="text-sm font-bold text-blue-600 dark:text-blue-300">AI Insights</p>
        <h1 className="mt-2 text-3xl font-black">Delivery Recommendations</h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">AI-generated delivery summary, risk signals, and recommended management actions.</p>
      </section>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AIInsights insights={data.aiInsights} />
        <ExecutiveSummary summary={data.executiveSummary} />
      </div>
      <RecentActivity items={data.recentActivity} />
    </div>
  );
}
