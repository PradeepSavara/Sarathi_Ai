import ExecutiveSummary from "../components/ExecutiveSummary";
import InfoCard from "../components/InfoCard";
import Loader from "../components/Loader";
import TeamPerformance from "../components/TeamPerformance";
import { useDashboardData } from "../hooks/useDashboardData";
import { GitPullRequest, Rocket, ShieldCheck } from "lucide-react";

export default function Projects() {
  const { data, loading } = useDashboardData();
  if (loading) return <Loader />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <section className="glass-card p-6">
        <p className="text-sm font-bold text-blue-600 dark:text-blue-300">Project Governance</p>
        <h1 className="mt-2 text-3xl font-black">{data.health.project}</h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">Track project health, ownership, sprint status, quality controls, risks, and follow-up actions from one executive-ready project view.</p>
      </section>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ExecutiveSummary summary={data.executiveSummary} />
        <div className="grid gap-6">
          <InfoCard
            icon={ShieldCheck}
            title="Project Controls"
            items={[
              ["Current Sprint", data.health.currentSprint],
              ["Project Health", data.health.status],
              ["Health Score", `${data.health.score}%`],
              ["Days Remaining", data.health.sprintDaysRemaining],
            ]}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard icon={Rocket} title="Pipeline Snapshot" items={[["Latest Build", data.pipeline.latestBuild], ["Success Rate", data.pipeline.successRate], ["Deployment", data.pipeline.deploymentStatus]]} />
            <InfoCard icon={GitPullRequest} title="Pull Request Snapshot" items={[["Merged PRs", data.pullRequests.merged], ["Open PRs", data.pullRequests.open], ["Review Pending", data.pullRequests.reviewPending]]} />
          </div>
        </div>
      </div>
      <TeamPerformance team={data.team} />
    </div>
  );
}
