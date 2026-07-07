import { useEffect, useState } from "react";
import { dashboardApi } from "../services/api";
import type { DashboardData } from "../types";

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    dashboardApi
      .getDashboard()
      .then((result) => {
        if (mounted) setData(result);
      })
      .catch(() => {
        if (mounted) setError("Live API is unavailable. Showing the latest cached delivery snapshot.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
