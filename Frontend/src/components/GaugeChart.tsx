import { motion } from "framer-motion";
import { useMemo } from "react";

interface GaugeChartProps {
  score: number;
}

export default function GaugeChart({ score }: GaugeChartProps) {
  // Ensure score is between 0 and 100
  const validScore = Math.min(Math.max(score, 0), 100);

  // For semicircle: 0-100 maps from -180° (left) to 0° (right)
  const needleAngle = -180 + (validScore / 100) * 180;

  // Determine status and colors based on score
  const { status, statusColor, statusBgColor } = useMemo(() => {
    if (validScore >= 80) {
      return {
        status: "Healthy",
        statusColor: "text-emerald-600 dark:text-emerald-400",
        statusBgColor: "bg-emerald-50 dark:bg-emerald-500/10",
      };
    } else if (validScore >= 60) {
      return {
        status: "At Risk",
        statusColor: "text-amber-600 dark:text-amber-400",
        statusBgColor: "bg-amber-50 dark:bg-amber-500/10",
      };
    } else {
      return {
        status: "Critical",
        statusColor: "text-red-600 dark:text-red-400",
        statusBgColor: "bg-red-50 dark:bg-red-500/10",
      };
    }
  }, [validScore]);

  // SVG dimensions - Semicircle positioned at bottom
  const viewBoxSize = 360;
  const radius = 120;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;

  // Get needle color based on score
  const needleColor = getColorAtScore(validScore);

  // Calculate needle end point
  const needleEndX =
    centerX + radius * 0.8 * Math.cos((needleAngle * Math.PI) / 180);
  const needleEndY =
    centerY + radius * 0.8 * Math.sin((needleAngle * Math.PI) / 180);

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Sprint Health Score
          </p>
          <h2 className="mt-2 text-lg font-bold text-slate-950 dark:text-white">
            Project Health
          </h2>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBgColor} ${statusColor}`}
        >
          {status}
        </div>
      </div>

      {/* Semicircular Gauge SVG */}
      <div className="flex justify-center flex-1">
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="w-full max-w-sm"
          style={{ height: "auto" }}
        >
          <defs>
            {/* Smooth gradient: Red -> Orange -> Yellow -> Green */}
            <linearGradient id="gaugeGradient" x1="0%" y1="100%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="20%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="80%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>

          {/* Background semicircle arc (lower half only) */}
          <path
            d={describeArc(centerX, centerY, radius, 180, 360)}
            fill="none"
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* Gradient background arc */}
          <path
            d={describeArc(centerX, centerY, radius, 180, 360)}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="28"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Active arc - animated based on score */}
          <motion.path
            d={describeArc(
              centerX,
              centerY,
              radius,
              180,
              180 + (validScore / 100) * 180
            )}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="28"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))",
            }}
          />

          {/* Score labels on the arc */}
          <text
            x={centerX - radius - 20}
            y={centerY + 8}
            textAnchor="middle"
            className="text-sm font-bold fill-slate-600 dark:fill-slate-400"
          >
            0
          </text>
          <text
            x={centerX}
            y={centerY - radius - 15}
            textAnchor="middle"
            className="text-sm font-bold fill-slate-600 dark:fill-slate-400"
          >
            50
          </text>
          <text
            x={centerX + radius + 20}
            y={centerY + 8}
            textAnchor="middle"
            className="text-sm font-bold fill-slate-600 dark:fill-slate-400"
          >
            100
          </text>

          {/* Needle base circle (center point) */}
          <circle
            cx={centerX}
            cy={centerY}
            r="12"
            fill="white"
            stroke={needleColor}
            strokeWidth="4"
            style={{
              filter: "drop-shadow(0 3px 10px rgba(0, 0, 0, 0.2))",
            }}
          />

          {/* Animated needle */}
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={needleEndX}
            y2={needleEndY}
            stroke={needleColor}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ rotate: -180 }}
            animate={{ rotate: needleAngle }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              transformOrigin: `${centerX}px ${centerY}px`,
              filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))",
            }}
          />

          {/* Center dot (inner) */}
          <circle cx={centerX} cy={centerY} r="5" fill={needleColor} />

          {/* Percentage and status placed inside the gauge circle with minimal distraction */}
          <g>
            <circle
              cx={centerX}
              cy={centerY + 46}
              r="54"
              fill="rgba(255,255,255,0.0)"
              stroke="rgba(148,163,184,0.0)"
              strokeWidth="1"
            />
            <text
              x={centerX}
              y={centerY + 54}
              textAnchor="middle"
              className="fill-slate-950 dark:fill-white text-[26px] font-black"
            >
              {validScore}%
            </text>
            <text
              x={centerX}
              y={centerY + 78}
              textAnchor="middle"
              className="fill-slate-600 dark:fill-slate-300 text-[12px] font-semibold"
            >
              {status}
            </text>
          </g>

          {/* Optional: Outer ring accent */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 18}
            fill="none"
            stroke="rgba(148, 163, 184, 0.1)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Legend with colored dots */}
      <div className="mt-5 flex gap-4 justify-center flex-wrap text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            Critical
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            At Risk
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            Healthy
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper function to create SVG arc path for semicircle
function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  // Convert angles to radians
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  // Calculate start point
  const x1 = x + radius * Math.cos(startRad);
  const y1 = y + radius * Math.sin(startRad);

  // Calculate end point
  const x2 = x + radius * Math.cos(endRad);
  const y2 = y + radius * Math.sin(endRad);

  // Determine if we need large-arc-flag
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
}

// Helper function to get color based on score with smooth gradient
function getColorAtScore(value: number): string {
  if (value < 25) {
    // Red to Orange (0-25%)
    const ratio = value / 25;
    return interpolateColor("#EF4444", "#F97316", ratio);
  } else if (value < 50) {
    // Orange to Yellow (25-50%)
    const ratio = (value - 25) / 25;
    return interpolateColor("#F97316", "#FBBF24", ratio);
  } else if (value < 75) {
    // Yellow to Lime (50-75%)
    const ratio = (value - 50) / 25;
    return interpolateColor("#FBBF24", "#84CC16", ratio);
  } else {
    // Lime to Green (75-100%)
    const ratio = (value - 75) / 25;
    return interpolateColor("#84CC16", "#22C55E", ratio);
  }
}

// Helper function to interpolate between two hex colors
function interpolateColor(
  color1: string,
  color2: string,
  ratio: number
): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  if (!c1 || !c2) return color1;

  const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
  const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
  const b = Math.round(c1.b + (c2.b - c1.b) * ratio);

  return `rgb(${r}, ${g}, ${b})`;
}

// Helper function to convert hex color to RGB
function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
