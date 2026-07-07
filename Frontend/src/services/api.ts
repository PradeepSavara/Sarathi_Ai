import axios from "axios";
import { mockDashboard } from "../data/mockDashboard";
import type { DashboardData } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:5001/api",
  timeout: 8000,
});

async function getOrMock<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const response = await api.get<T>(endpoint);
    return response.data;
  } catch {
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    return fallback;
  }
}

export const dashboardApi = {
  getDashboard: async (): Promise<DashboardData> => {
    const [health, sprint, quality, productivity, risks, actions, aiInsights] = await Promise.all([
      getOrMock("/project-health", mockDashboard.health),
      getOrMock("/sprint-progress", mockDashboard.sprint),
      getOrMock("/quality-metrics", mockDashboard.quality),
      getOrMock("/productivity", mockDashboard.productivity),
      getOrMock("/risks", mockDashboard.risks),
      getOrMock("/action-items", mockDashboard.actions),
      getOrMock("/ai-insights", mockDashboard.aiInsights),
    ]);

    return {
      ...mockDashboard,
      health,
      sprint,
      quality,
      productivity,
      risks,
      actions,
      aiInsights,
    };
  },
  getReports: () => getOrMock("/reports", mockDashboard.executiveSummary),
  getPipelines: () => getOrMock("/pipelines", mockDashboard.pipeline),
  getPullRequests: () => getOrMock("/pullrequests", mockDashboard.pullRequests),
};
