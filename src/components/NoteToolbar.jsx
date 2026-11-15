import { Search, ArrowUpDown } from "lucide-react";

function NoteToolbar({
  search,
  onSearchChange,
  newestFirst,
  onToggleSort,
}) {
  return (
    <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full items-center gap-3 rounded-2xl border border-pink-100 bg-white px-4 py-3 sm:max-w-md">
        <Search size={20} className="shrink-0 text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="جستجو در یادداشت‌ها"
          className="w-full bg-transparent text-right outline-none placeholder:text-slate-400"
        />
      </div>

      <button
        type="button"
        onClick={onToggleSort}
        className="flex items-center justify-center gap-2 rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm transition hover:bg-pink-50"
      >
        <ArrowUpDown size={17} />
        {newestFirst
          ? "جدیدترین یادداشت‌ها"
          : "قدیمی‌ترین یادداشت‌ها"}
      </button>
    </section>
  );
}

export default NoteToolbar;
