import { LineChart as LineIcon } from "lucide-react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ChartPoint } from "../types";

export default function BurndownChart({ data }: { data: ChartPoint[] }) {
  return (
    <div className="surface p-6">
      <h3 className="mb-5 flex items-center gap-2 text-lg font-black"><LineIcon size={20} /> Burndown Chart</h3>
      <ResponsiveContainer width="100%" height={310}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,.35)" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ideal" stroke="#94A3B8" strokeWidth={2} strokeDasharray="7 5" />
          <Line type="monotone" dataKey="actual" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
