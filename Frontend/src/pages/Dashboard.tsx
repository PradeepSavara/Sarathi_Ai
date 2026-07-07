import { motion } from "framer-motion";
import { ArrowRight, BarChart3, CheckSquare, FileText, GitPullRequest, HeartPulse, Rocket, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import type { ElementType } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import InfoCard from "../components/InfoCard";
import Loader from "../components/Loader";
import RecentActivity from "../components/RecentActivity";
import { useDashboardData } from "../hooks/useDashboardData";

export default function Dashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <Loader />;
  if (!data) return <div className="surface p-6">Unable to load dashboard data.</div>;

  return (
    <div className="space-y-6">
      {error && <div className="surface border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">{error}</div>}

      <motion.section className="glass-card relative overflow-hidden p-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-400" />
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <p className="text-sm font-bold text-blue-600 dark:text-blue-300">Hello, Sripriya</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">{data.health.project}</h1>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">A polished governance cockpit to track project health, sprint progress, quality metrics, productivity, risks, action items, and management reporting.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="premium-focus inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5" to="/reports">
                Management Summary <ArrowRight size={17} />
              </Link>
              <Link className="premium-focus inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-white" to="/ai-insights">
                AI Recommendations <Sparkles size={17} />
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <HeroStat label="Current Sprint" value={data.health.currentSprint} />
            <HeroStat label="Project Health" value={data.health.status} />
            <HeroStat label="Sprint Days Remaining" value={data.health.sprintDaysRemaining} />
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((kpi, index) => <DashboardCard index={index} key={kpi.title} kpi={kpi} />)}
      </section>

      <section>
        <div className="mb-4">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Governance Areas</p>
          <h2 className="text-2xl font-black">One platform, clear ownership</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ModuleCard icon={HeartPulse} title="Project Health" body={`${data.health.score}% health score with ${data.health.status.toLowerCase()} delivery posture.`} to="/projects" tone="blue" />
          <ModuleCard icon={BarChart3} title="Sprint Progress" body={`${data.sprint.completion}% complete, ${data.sprint.remainingStories} stories remaining.`} to="/analytics" tone="emerald" />
          <ModuleCard icon={TrendingUp} title="Quality & Productivity" body="Coverage, defects, throughput, and team velocity in one analytics view." to="/analytics" tone="violet" />
          <ModuleCard icon={ShieldAlert} title="Risks" body={`${data.risks.length} tracked risks with accountable owners and due dates.`} to="/risks" tone="rose" />
          <ModuleCard icon={CheckSquare} title="Action Items" body={`${data.actions.filter((action) => !action.completed).length} open management follow-ups.`} to="/action-items" tone="amber" />
          <ModuleCard icon={Sparkles} title="AI Insights" body="AI-generated delivery summary and recommended interventions." to="/ai-insights" tone="cyan" />
          <ModuleCard icon={FileText} title="Reports" body="Export executive-ready governance packs for PMO and leadership." to="/reports" tone="slate" />
          <ModuleCard icon={Rocket} title="Pipelines & PRs" body={`${data.pipeline.successRate} build success and ${data.pullRequests.reviewPending} PRs awaiting review.`} to="/projects" tone="green" />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <InfoCard
          icon={FileText}
          title="Management Readiness"
          items={[
            ["Overall Status", data.executiveSummary.overallStatus],
            ["Delivery Confidence", data.executiveSummary.deliveryConfidence],
            ["Budget Status", data.executiveSummary.budgetStatus],
            ["Next Review", "Weekly PMO"],
          ]}
        />
        <div className="grid gap-6">
          <InfoCard
            icon={Rocket}
            title="Pipelines"
            items={[
              ["Latest Build", data.pipeline.latestBuild],
              ["Build Duration", data.pipeline.buildDuration],
              ["Success Rate", data.pipeline.successRate],
              ["Failed Builds", data.pipeline.failedBuilds],
              ["Deployment Status", data.pipeline.deploymentStatus],
            ]}
          />
          <InfoCard
            icon={GitPullRequest}
            title="Pull Requests"
            items={[
              ["Merged PRs", data.pullRequests.merged],
              ["Open PRs", data.pullRequests.open],
              ["Review Pending", data.pullRequests.reviewPending],
              ["Average Review Time", data.pullRequests.averageReviewTime],
            ]}
          />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <InfoCard
          icon={GitPullRequest}
          title="Governance Snapshot"
          items={[
            ["Open Risks", data.risks.filter((risk) => risk.status !== "Completed").length],
            ["Open Actions", data.actions.filter((action) => !action.completed).length],
            ["Pipeline Success", data.pipeline.successRate],
            ["Review Pending", data.pullRequests.reviewPending],
          ]}
        />
        <RecentActivity items={data.recentActivity} />
      </section>
    </div>
  );
}

function ModuleCard({ icon: Icon, title, body, to, tone }: { icon: ElementType; title: string; body: string; to: string; tone: string }) {
  const toneClass: Record<string, string> = {
    blue: "from-blue-600 to-cyan-500",
    emerald: "from-emerald-500 to-teal-500",
    violet: "from-violet-500 to-fuchsia-500",
    rose: "from-rose-500 to-red-500",
    amber: "from-amber-400 to-orange-500",
    cyan: "from-cyan-500 to-blue-500",
    slate: "from-slate-700 to-slate-500",
    green: "from-green-500 to-emerald-500",
  };

  return (
    <motion.div whileHover={{ y: -6, scale: 1.015 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
      <Link className="surface group block h-full overflow-hidden p-5" to={to}>
        <div className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${toneClass[tone]} text-white shadow-lg`}>
          <Icon size={22} />
        </div>
        <h3 className="text-lg font-black">{title}</h3>
        <p className="mt-2 min-h-16 text-sm leading-6 text-slate-500 dark:text-slate-400">{body}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-600 transition group-hover:gap-3 dark:text-blue-300">
          Open module <ArrowRight size={16} />
        </span>
      </Link>
    </motion.div>
  );
}

function HeroStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-premium border border-white/70 bg-white/70 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/50">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-black">{value}</p>
    </div>
  );
}
