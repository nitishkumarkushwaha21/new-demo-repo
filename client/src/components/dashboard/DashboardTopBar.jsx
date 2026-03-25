import React from "react";
import { UserButton } from "@clerk/react";
import { Search, SlidersHorizontal } from "lucide-react";

const DashboardTopBar = ({
  searchValue,
  filterValue,
  onSearchChange,
  onFilterChange,
}) => {
  return (
    <div className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black px-5 py-3">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-sm text-neutral-400">
          Search fast, filter folders, and jump into work.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden w-72 md:block">
          <Search
            size={15}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search folders..."
            className="h-10 w-full rounded-xl border border-white/10 bg-neutral-950 pr-3 pl-9 text-sm text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-500"
          />
        </div>

        <div className="relative">
          <SlidersHorizontal
            size={14}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500"
          />
          <select
            value={filterValue}
            onChange={(event) => onFilterChange(event.target.value)}
            className="h-10 appearance-none rounded-xl border border-white/10 bg-neutral-950 pr-8 pl-9 text-sm text-white outline-none transition-colors focus:border-neutral-500"
          >
            <option value="all">All folders</option>
            <option value="with-items">With items</option>
            <option value="empty">Empty</option>
          </select>
        </div>

        <div className="flex h-10 items-center rounded-xl border border-blue-500/20 bg-blue-500/10 px-2.5">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox:
                  "h-7 w-7 ring-1 ring-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.18)]",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTopBar;
