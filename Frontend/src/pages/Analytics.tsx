import BurndownChart from "../components/BurndownChart";
import DonutChart from "../components/DonutChart";
import GaugeChart from "../components/GaugeChart";
import Loader from "../components/Loader";
import ProgressCard from "../components/ProgressCard";
import { useDashboardData } from "../hooks/useDashboardData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Analytics() {
  const { data, loading } = useDashboardData();
  if (loading) return <Loader />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <section className="glass-card p-6">
        <p className="text-sm font-bold text-blue-600 dark:text-blue-300">Sprint Analytics</p>
        <h1 className="mt-2 text-3xl font-black">Delivery Signals and Quality Trends</h1>
      </section>
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <GaugeChart score={data.health.score} />
        <ProgressCard sprint={data.sprint} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <BurndownChart data={data.burndown} />
        <DonutChart data={data.quality} />
      </div>
      <div className="surface p-6">
        <h3 className="mb-5 text-lg font-black">Productivity Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.productivity} layout="vertical" margin={{ left: 35 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148,163,184,.35)" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="value" fill="#2563EB" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
