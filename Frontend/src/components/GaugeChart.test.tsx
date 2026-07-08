/**
 * GaugeChart Component Test Suite
 * 
 * Tests the improved GaugeChart component for:
 * - Correct rendering at various score levels
 * - Color zone classification
 * - Animation behavior
 * - Edge case handling
 * - Responsive design
 * 
 * Run with: npm test -- GaugeChart.test.tsx
 */

import { render, screen } from "@testing-library/react";
import GaugeChart from "./GaugeChart";

describe("GaugeChart Component", () => {
  describe("Rendering", () => {
    test("renders without crashing", () => {
      render(<GaugeChart score={86} />);
      expect(screen.getByText(/Sprint Health Score/i)).toBeInTheDocument();
    });

    test("displays correct score value", () => {
      render(<GaugeChart score={86} />);
      expect(screen.getByText("86")).toBeInTheDocument();
    });

    test("displays percentage sign", () => {
      render(<GaugeChart score={86} />);
      expect(screen.getByText("%")).toBeInTheDocument();
    });

    test("renders SVG gauge element", () => {
      const { container } = render(<GaugeChart score={86} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Health Status Classification", () => {
    test("shows 'Healthy' status for score >= 80", () => {
      render(<GaugeChart score={86} />);
      expect(screen.getByText("Healthy")).toBeInTheDocument();
    });

    test("shows 'At Risk' status for score 60-79", () => {
      render(<GaugeChart score={65} />);
      expect(screen.getByText("At Risk")).toBeInTheDocument();
    });

    test("shows 'Critical' status for score < 60", () => {
      render(<GaugeChart score={35} />);
      expect(screen.getByText("Critical")).toBeInTheDocument();
    });

    test("shows 'Healthy' at exactly 80", () => {
      render(<GaugeChart score={80} />);
      expect(screen.getByText("Healthy")).toBeInTheDocument();
    });

    test("shows 'At Risk' at exactly 60", () => {
      render(<GaugeChart score={60} />);
      expect(screen.getByText("At Risk")).toBeInTheDocument();
    });
  });

  describe("Legend Display", () => {
    test("displays all three status ranges in legend", () => {
      const { container } = render(<GaugeChart score={86} />);
      expect(screen.getByText("0-59")).toBeInTheDocument();
      expect(screen.getByText("60-79")).toBeInTheDocument();
      expect(screen.getByText("80-100")).toBeInTheDocument();
    });

    test("displays legend labels", () => {
      render(<GaugeChart score={86} />);
      expect(screen.getByText("Critical")).toBeInTheDocument();
      expect(screen.getAllByText("At Risk")).toHaveLength(2); // In header and legend
      expect(screen.getAllByText("Healthy")).toHaveLength(2);
    });
  });

  describe("Edge Cases", () => {
    test("clamps negative score to 0", () => {
      render(<GaugeChart score={-50} />);
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    test("clamps score above 100 to 100", () => {
      render(<GaugeChart score={150} />);
      expect(screen.getByText("100")).toBeInTheDocument();
    });

    test("handles zero score", () => {
      render(<GaugeChart score={0} />);
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("Critical")).toBeInTheDocument();
    });

    test("handles maximum score", () => {
      render(<GaugeChart score={100} />);
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("Healthy")).toBeInTheDocument();
    });

    test("handles decimal scores", () => {
      render(<GaugeChart score={86.5} />);
      expect(screen.getByText("86.5")).toBeInTheDocument();
    });
  });

  describe("Re-rendering", () => {
    test("updates score when prop changes", () => {
      const { rerender } = render(<GaugeChart score={50} />);
      expect(screen.getByText("50")).toBeInTheDocument();
      
      rerender(<GaugeChart score={90} />);
      expect(screen.getByText("90")).toBeInTheDocument();
    });

    test("updates status when score crosses threshold", () => {
      const { rerender } = render(<GaugeChart score={79} />);
      expect(screen.getByText("At Risk")).toBeInTheDocument();
      
      rerender(<GaugeChart score={80} />);
      expect(screen.getByText("Healthy")).toBeInTheDocument();
    });

    test("updates status badge color on score change", () => {
      const { rerender, container } = render(<GaugeChart score={50} />);
      let badge = container.querySelector("[class*='bg-red']");
      expect(badge).toBeInTheDocument();
      
      rerender(<GaugeChart score={90} />);
      badge = container.querySelector("[class*='bg-emerald']");
      expect(badge).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    test("has descriptive header text", () => {
      render(<GaugeChart score={86} />);
      expect(screen.getByText(/Sprint Health Score/i)).toBeInTheDocument();
      expect(screen.getByText(/Project Health Gauge/i)).toBeInTheDocument();
    });

    test("displays score percentage clearly", () => {
      render(<GaugeChart score={86} />);
      const scoreText = screen.getByText("86");
      expect(scoreText).toBeVisible();
    });

    test("legend provides context for color zones", () => {
      render(<GaugeChart score={86} />);
      expect(screen.getByText("Critical")).toBeInTheDocument();
      expect(screen.getByText("At Risk")).toBeInTheDocument();
      expect(screen.getByText("Healthy")).toBeInTheDocument();
    });
  });

  describe("Common Test Scenarios", () => {
    test("Scenario 1: Initial load with healthy score", () => {
      const { container } = render(<GaugeChart score={86} />);
      expect(screen.getByText("86")).toBeInTheDocument();
      expect(screen.getByText("Healthy")).toBeInTheDocument();
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    test("Scenario 2: Monitor degrading health", () => {
      const { rerender } = render(<GaugeChart score={85} />);
      expect(screen.getByText("Healthy")).toBeInTheDocument();
      
      rerender(<GaugeChart score={65} />);
      expect(screen.getByText("At Risk")).toBeInTheDocument();
      
      rerender(<GaugeChart score={40} />);
      expect(screen.getByText("Critical")).toBeInTheDocument();
    });

    test("Scenario 3: Real-time score update from API", () => {
      const { rerender } = render(<GaugeChart score={60} />);
      expect(screen.getByText("60")).toBeInTheDocument();
      
      // Simulate API update
      rerender(<GaugeChart score={75} />);
      expect(screen.getByText("75")).toBeInTheDocument();
      
      rerender(<GaugeChart score={92} />);
      expect(screen.getByText("92")).toBeInTheDocument();
    });
  });

  describe("Style Classes", () => {
    test("applies glass-card styling", () => {
      const { container } = render(<GaugeChart score={86} />);
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass("glass-card");
      expect(mainDiv).toHaveClass("p-6");
    });

    test("applies dark mode classes", () => {
      const { container } = render(<GaugeChart score={86} />);
      const textElements = container.querySelectorAll("[class*='dark:']");
      expect(textElements.length).toBeGreaterThan(0);
    });

    test("applies responsive classes", () => {
      const { container } = render(<GaugeChart score={86} />);
      const elements = container.querySelectorAll("[class*='max-w']");
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});

/**
 * Manual Testing Checklist
 * 
 * Before deploying, manually verify:
 * 
 * ✅ Visual Tests
 * - [ ] Gauge displays at 86 score in Analytics page
 * - [ ] Needle rotates smoothly from -90° to current angle
 * - [ ] Arc fill animates from left to current position
 * - [ ] Score text fades in with scale effect
 * - [ ] Status badge shows "Healthy" in green
 * - [ ] Legend shows all three zones
 * 
 * ✅ Interaction Tests
 * - [ ] Page refresh resets animation
 * - [ ] Score updates cause smooth re-animation
 * - [ ] Theme toggle (dark/light) works correctly
 * - [ ] Responsive on mobile (375px viewport)
 * - [ ] Responsive on tablet (768px viewport)
 * - [ ] Responsive on desktop (1920px viewport)
 * 
 * ✅ Edge Case Tests
 * - [ ] Modify mockDashboard score to 0 → shows Critical
 * - [ ] Modify mockDashboard score to 100 → shows Healthy
 * - [ ] Modify mockDashboard score to 65 → shows At Risk
 * - [ ] Check browser console for no errors
 * - [ ] Check React DevTools for no warnings
 * 
 * ✅ Performance Tests
 * - [ ] DevTools Performance tab shows smooth 60 FPS
 * - [ ] No memory leaks on component unmount
 * - [ ] Fast render time (< 100ms)
 * 
 * ✅ Browser Tests
 * - [ ] Chrome: All features working
 * - [ ] Firefox: All features working
 * - [ ] Safari: All features working
 * - [ ] Edge: All features working
 */
