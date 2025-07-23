import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Users, ShieldCheck, Home } from "lucide-react";

const navLinks = [
  {
    to: "/",
    label: "Home",
    icon: <Home size={20} />,
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <BarChart3 size={20} />,
  },
  {
    to: "/manage",
    label: "Manage",
    icon: <ShieldCheck size={20} />,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-screen bg-slate-900 text-white flex flex-col w-64 shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-slate-800">
        <span className="text-2xl font-extrabold text-emerald-400 tracking-tight">
          Attendance
        </span>
      </div>
      <nav className="flex-1 py-8 px-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${
              location.pathname.toLowerCase() === link.to
                ? "bg-emerald-500 text-slate-900"
                : "hover:bg-emerald-700 hover:text-white"
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
        <span>
          <b>Team:</b> Vivek, Ansh, Mihir, Krishna
        </span>
      </div>
    </aside>
  );
}
