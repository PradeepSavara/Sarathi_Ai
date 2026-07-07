import { animate } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function AnimatedCounter({ value }: { value: string }) {
  const numeric = useMemo(() => Number.parseFloat(value.replace(/[^\d.]/g, "")), [value]);
  const suffix = value.replace(String(numeric), "").replace(/[0-9.]/g, "");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (Number.isNaN(numeric)) return;
    const controls = animate(0, numeric, {
      duration: 0.9,
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [numeric]);

  if (Number.isNaN(numeric)) return value;
  const formatted = Number.isInteger(numeric) ? Math.round(display).toString() : display.toFixed(1);
  return <>{formatted}{suffix}</>;
}
