import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom
import Sidebar from "./Sidebar"; // Your existing Sidebar component

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* The Sidebar is a permanent part of the layout */}
      <Sidebar />

      {/* The main content area where your pages will be rendered */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Outlet is a placeholder that renders the matched child route component */}
        <Outlet />
      </main>
    </div>
  );
}
