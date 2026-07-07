export default function Loader() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="surface h-36 animate-pulse bg-slate-200/70 dark:bg-slate-800" key={index} />
      ))}
    </div>
  );
}
