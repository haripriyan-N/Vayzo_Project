function Dashboard() {
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back, Prathap M 👋
          </h1>

          <p className="mt-1 text-sm text-muted">
            Here's what's happening with your business today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          >
            21 May 2024 - 27 May 2024
          </button>

          <button
            type="button"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
