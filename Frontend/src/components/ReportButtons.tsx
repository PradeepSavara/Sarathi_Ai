import { Download, FileSpreadsheet, Mail, Presentation } from "lucide-react";

const reports = [
  { label: "Export PDF", icon: Download },
  { label: "Export Excel", icon: FileSpreadsheet },
  { label: "Export PowerPoint", icon: Presentation },
  { label: "Send Email", icon: Mail },
];

export default function ReportButtons() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {reports.map((report) => {
        const Icon = report.icon;
        return (
          <button className="premium-focus surface flex items-center justify-center gap-3 p-5 font-black transition hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-500" key={report.label}>
            <Icon size={20} /> {report.label}
          </button>
        );
      })}
    </div>
  );
}
