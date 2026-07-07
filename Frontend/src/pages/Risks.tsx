import Loader from "../components/Loader";
import RiskTable from "../components/RiskTable";
import { useDashboardData } from "../hooks/useDashboardData";

export default function Risks() {
  const { data, loading } = useDashboardData();
  if (loading) return <Loader />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <section className="glass-card p-6">
        <p className="text-sm font-bold text-blue-600 dark:text-blue-300">Risks</p>
        <h1 className="mt-2 text-3xl font-black">Risk Governance</h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">Track delivery risks with owner, probability, impact, priority, status, and due date.</p>
      </section>
      <RiskTable risks={data.risks} />
    </div>
  );
}
