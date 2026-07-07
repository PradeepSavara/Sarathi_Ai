import { PieChart as PieIcon } from "lucide-react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { QualityMetric } from "../types";

export default function DonutChart({ data }: { data: QualityMetric[] }) {
  return (
    <div className="surface p-6">
      <h3 className="mb-5 flex items-center gap-2 text-lg font-black"><PieIcon size={20} /> Quality Metrics</h3>
      <ResponsiveContainer width="100%" height={285}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={98} paddingAngle={4}>
            {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <span>Pipeline Success: <strong className="text-emerald-600">94%</strong></span>
        <span>Pipeline Failure: <strong className="text-red-500">6%</strong></span>
      </div>
    </div>
  );
}
