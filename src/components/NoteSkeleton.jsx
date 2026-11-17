
function NoteSkeleton() {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="در حال بارگذاری یادداشت‌ها"
      aria-busy="true"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-52 animate-pulse rounded-3xl border border-pink-100 bg-white p-6 shadow-sm"
        >
          {/* عنوان یادداشت */}
          <div className="mb-5 h-5 w-2/3 rounded-lg bg-pink-100" />

          {/* متن یادداشت */}
          <div className="mb-3 h-3 w-full rounded-lg bg-pink-50" />
          <div className="mb-3 h-3 w-5/6 rounded-lg bg-pink-50" />
          <div className="h-3 w-1/2 rounded-lg bg-pink-50" />

          {/* تاریخ */}
          <div className="mt-8 flex justify-between">
            <div className="h-3 w-20 rounded-lg bg-purple-100" />
            <div className="h-3 w-12 rounded-lg bg-pink-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteSkeleton;
