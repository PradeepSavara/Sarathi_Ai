import ActionList from "../components/ActionList";
import Loader from "../components/Loader";
import { useDashboardData } from "../hooks/useDashboardData";

export default function ActionItems() {
  const { data, loading } = useDashboardData();
  if (loading) return <Loader />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <section className="glass-card p-6">
        <p className="text-sm font-bold text-blue-600 dark:text-blue-300">Action Items</p>
        <h1 className="mt-2 text-3xl font-black">Management Follow-ups</h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">Checklist of accountable actions with priority, owner, due date, and completion status.</p>
      </section>
      <ActionList actions={data.actions} />
    </div>
  );
}
