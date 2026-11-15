
import { Plus } from "lucide-react";

function Header({ onCreateNote }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-purple-100 bg-white px-6 py-5 md:px-10">
      <div>
        <h1 className="text-2xl font-bold text-purple-900">
          دفتر یادداشت من
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          ایده‌ها و نوشته‌های خودت رو اینجا ثبت کن
        </p>
      </div>

      <button
        type="button"
        onClick={onCreateNote}
        className="flex shrink-0 items-center gap-2 rounded-xl bg-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-purple-600"
      >
        <Plus size={18} />
        یادداشت جدید
      </button>
    </header>
  );
}

export default Header;
