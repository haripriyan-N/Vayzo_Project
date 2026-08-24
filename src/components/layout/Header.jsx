import { Menu } from "lucide-react";
function Header({ onMenuClick }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-muted hover:bg-primary-light hover:text-primary lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={25} strokeWidth={2.8} />
      </button>

      <div className="hidden sm:block">
        <p className="text-sm text-muted">Welcome back</p>
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="rounded-lg p-2 text-muted transition hover:bg-primary-light hover:text-primary"
          aria-label="Notifications"
        >
          🔔
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            H
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-foreground">Admin</p>

            <p className="text-xs text-muted">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
