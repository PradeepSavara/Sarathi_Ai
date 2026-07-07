import type { DeveloperPerformance } from "../types";

export default function TeamPerformance({ team }: { team: DeveloperPerformance[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {team.map((member) => (
        <article className="surface p-5" key={member.name}>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-sm font-black text-white">{member.avatar}</div>
            <div>
              <h3 className="font-black">{member.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{member.role}</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <Metric label="Completed" value={member.completedTasks} />
            <Metric label="Velocity" value={member.velocity} />
            <Metric label="Story Points" value={member.storyPoints} />
            <Metric label="Bug Count" value={member.bugCount} />
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs font-bold text-slate-500"><span>Completion</span><span>{member.completion}%</span></div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${member.completion}%` }} /></div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/50">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-black">{value}</p>
    </div>
  );
}
