import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import weekData from "../assets/month_data.json";
import dayData from "../assets/days_data.json";

const TodayPieChart = ({ data }) => {
  const COLORS = ["#10B981", "#EF4444", "#F59E0B"];
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const WeeklyBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="week" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="present" stackId="a" fill="#10B981" name="Present" />
      <Bar dataKey="absent" stackId="a" fill="#EF4444" name="Absent" />
      <Bar dataKey="leave" stackId="a" fill="#F59E0B" name="On Leave" />
    </BarChart>
  </ResponsiveContainer>
);

const DailyBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="present" fill="#10B981" name="Present" />
      <Bar dataKey="absent" fill="#EF4444" name="Absent" />
      <Bar dataKey="leave" fill="#F59E0B" name="On Leave" />
    </BarChart>
  </ResponsiveContainer>
);

const Manage = React.memo(function Manage() {
  const [activeTab, setActiveTab] = useState("today");
  const chartContainerRef = useRef(null);

  const todayData = [
    { name: "Present", value: 30 },
    { name: "Absent", value: 3 },
    { name: "On Leave", value: 2 },
  ];

  useEffect(() => {
    if (chartContainerRef.current) {
      gsap.fromTo(
        chartContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center px-6 py-12">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
          Manage & Analyze
        </h1>
        <p className="text-slate-600 mb-8">
          Visualize attendance data to identify trends and make informed
          decisions.
        </p>

        <div className="flex space-x-2 border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${
              activeTab === "today"
                ? "bg-white border-slate-200 border-l border-t border-r -mb-px text-emerald-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Today's Snapshot
          </button>
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${
              activeTab === "weekly"
                ? "bg-white border-slate-200 border-l border-t border-r -mb-px text-emerald-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Weekly Trends
          </button>
          <button
            onClick={() => setActiveTab("daily")}
            className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${
              activeTab === "daily"
                ? "bg-white border-slate-200 border-l border-t border-r -mb-px text-emerald-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Daily History
          </button>
        </div>

        <div
          ref={chartContainerRef}
          className="bg-white p-6 rounded-lg shadow-md border border-slate-200"
        >
          {activeTab === "today" && <TodayPieChart data={todayData} />}
          {activeTab === "weekly" && <WeeklyBarChart data={weekData} />}
          {activeTab === "daily" && <DailyBarChart data={dayData} />}
        </div>
      </div>
    </div>
  );
});

export default Manage;
