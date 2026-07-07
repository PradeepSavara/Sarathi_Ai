import type { LucideIcon } from "lucide-react";

export type TrendDirection = "up" | "down" | "flat";
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type Status = "Open" | "In Progress" | "Review" | "Completed" | "Blocked";

export interface Kpi {
  title: string;
  value: string;
  trend: string;
  trendDirection: TrendDirection;
  progress: number;
  icon: LucideIcon;
}

export interface ProjectHealth {
  score: number;
  status: string;
  currentSprint: string;
  sprintDaysRemaining: number;
  project: string;
}

export interface SprintProgress {
  completedStories: number;
  remainingStories: number;
  completion: number;
  velocity: number;
}

export interface ChartPoint {
  name: string;
  [key: string]: string | number;
}

export interface QualityMetric {
  name: string;
  value: number;
  color: string;
}

export interface DeveloperPerformance {
  name: string;
  role: string;
  avatar: string;
  completedTasks: number;
  velocity: number;
  storyPoints: number;
  assignedWork: number;
  bugCount: number;
  completion: number;
}

export interface Risk {
  id: string;
  risk: string;
  owner: string;
  probability: string;
  impact: string;
  priority: Priority;
  status: Status;
  dueDate: string;
}

export interface ActionItem {
  id: string;
  title: string;
  owner: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  meta: string;
  type: "work-item" | "bug" | "pr" | "pipeline" | "sprint";
}

export interface ExecutiveSummaryData {
  overallStatus: string;
  deliveryConfidence: string;
  budgetStatus: string;
  riskStatus: string;
  sprintHealth: string;
  recommendation: string;
}

export interface DashboardData {
  health: ProjectHealth;
  sprint: SprintProgress;
  kpis: Kpi[];
  burndown: ChartPoint[];
  productivity: ChartPoint[];
  quality: QualityMetric[];
  pipeline: {
    latestBuild: string;
    buildDuration: string;
    successRate: string;
    failedBuilds: number;
    deploymentStatus: string;
  };
  pullRequests: {
    merged: number;
    open: number;
    reviewPending: number;
    averageReviewTime: string;
  };
  team: DeveloperPerformance[];
  risks: Risk[];
  actions: ActionItem[];
  aiInsights: string[];
  executiveSummary: ExecutiveSummaryData;
  recentActivity: RecentActivityItem[];
}
