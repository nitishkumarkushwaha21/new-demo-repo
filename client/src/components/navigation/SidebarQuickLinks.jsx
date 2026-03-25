import React from "react";
import { BarChart2, Youtube } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    icon: BarChart2,
    label: "Profile Analysis",
    path: "/profile-analysis",
    activeClass:
      "border border-purple-500/30 bg-purple-600/20 text-purple-400 shadow-sm",
  },
  {
    icon: Youtube,
    label: "Playlist Sheets",
    path: "/playlist",
    activeClass:
      "border border-blue-500/30 bg-blue-600/20 text-blue-400 shadow-sm",
  },
];

const SidebarQuickLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sticky bottom-20 space-y-3 border-t border-neutral-800 bg-neutral-900 p-3">
      {navItems.map(({ icon: Icon, label, path, activeClass }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`w-full rounded-md px-4 py-2.5 text-left text-sm font-medium transition-all ${
              isActive
                ? activeClass
                : "text-gray-300 hover:bg-neutral-800 hover:text-white"
            }`}
            title={label}
          >
            <span className="flex items-center gap-3">
              <Icon size={16} />
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SidebarQuickLinks;
