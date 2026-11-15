function Header({ onCreateNote }) {
  return (
    <header className="border-b border-pink-100 bg-white px-5 py-6 md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-violet-600">
            Think Board
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            فضایی برای ثبت ایده‌ها و یادداشت‌های تو
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateNote}
          className="flex items-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-violet-600"
        >
          <span>+</span>
          یادداشت جدید
        </button>
      </div>
    </header>
  );
}

export default Header;
