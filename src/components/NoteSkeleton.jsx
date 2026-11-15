function NoteSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-52 animate-pulse rounded-3xl bg-pink-100"
        />
      ))}
    </div>
  );
}

export default NoteSkeleton;
