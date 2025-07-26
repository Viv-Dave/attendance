import React, { useState } from "react";
import people from "../assets/students.json";
import {
  CheckCircle,
  XCircle,
  Clock,
  CalendarOff,
  UserCircle,
} from "lucide-react";
function SubmitAttendance({ onSubmit }) {
  return (
    <div className="mt-4 border-t border-slate-200 pt-4">
      <button
        onClick={onSubmit}
        className="w-full bg-slate-900 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg transform hover:scale-105"
      >
        Submit Attendance
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [attendance, setAttendance] = useState({});
  // --- NEW: State for pagination ---
  const [currentPage, setCurrentPage] = useState(0);

  const handleAttendance = (id, status) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(attendance).length === 0) {
      alert(
        "Please mark attendance for at least one student before submitting."
      );
      return;
    }
    console.log("Submitting the following attendance data:", attendance);
    alert("Attendance has been submitted successfully!");
  };

  const values = Object.values(attendance);
  const stats = {
    present: values.filter((s) => s === "Present").length,
    absent: values.filter((s) => s === "Absent").length,
    onLeave: values.filter((s) => s === "On Leave").length,
    late: values.filter((s) => s === "Late").length,
  };

  const itemsPerPage = 5;
  const pageCount = Math.ceil(people.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPeople = people.slice(startIndex, endIndex);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="m-2 animate-title text-3xl font-bold text-slate-800 mb-6">
          Today's Attendance
        </h1>

        <div className="m-2 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="kpi-card bg-white rounded-lg p-5 shadow-sm border border-slate-200 flex items-center">
            <div className="rounded-full p-3 mr-4 bg-emerald-100 text-emerald-600">
              <CheckCircle size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Present</p>
              <p className="text-2xl font-bold text-slate-800">
                {stats.present}
              </p>
            </div>
          </div>
          <div className="kpi-card bg-white rounded-lg p-5 shadow-sm border border-slate-200 flex items-center">
            <div className="rounded-full p-3 mr-4 bg-rose-100 text-rose-600">
              <XCircle size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Absent</p>
              <p className="text-2xl font-bold text-slate-800">
                {stats.absent}
              </p>
            </div>
          </div>
          <div className="kpi-card bg-white rounded-lg p-5 shadow-sm border border-slate-200 flex items-center">
            <div className="rounded-full p-3 mr-4 bg-amber-100 text-amber-600">
              <CalendarOff size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">On Leave</p>
              <p className="text-2xl font-bold text-slate-800">
                {stats.onLeave}
              </p>
            </div>
          </div>
          <div className="kpi-card bg-white rounded-lg p-5 shadow-sm border border-slate-200 flex items-center">
            <div className="rounded-full p-3 mr-4 bg-orange-100 text-orange-600">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Late</p>
              <p className="text-2xl font-bold text-slate-800">{stats.late}</p>
            </div>
          </div>
        </div>

        <div className="attendance-table bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto m-1.5">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Employee
                </th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPeople.map((emp) => (
                <tr
                  key={emp.employeeId}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{emp.name}</div>
                    <div className="text-xs text-slate-500">
                      ID: {emp.employeeId}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          handleAttendance(emp.employeeId, "Present")
                        }
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${
                          attendance[emp.employeeId] === "Present"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() =>
                          handleAttendance(emp.employeeId, "Absent")
                        }
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${
                          attendance[emp.employeeId] === "Absent"
                            ? "bg-rose-100 text-rose-700 border-rose-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() =>
                          handleAttendance(emp.employeeId, "On Leave")
                        }
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${
                          attendance[emp.employeeId] === "On Leave"
                            ? "bg-amber-100 text-amber-700 border-amber-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        On Leave
                      </button>
                      <button
                        onClick={() => handleAttendance(emp.employeeId, "Late")}
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${
                          attendance[emp.employeeId] === "Late"
                            ? "bg-orange-100 text-orange-700 border-orange-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        Late
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`px-4 py-2 text-sm font-medium border rounded-md ${
                currentPage === i
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white m-1.5 p-5 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center">
            <UserCircle size={40} className="text-slate-500 mr-4" />
            <div>
              <h3 className="font-bold text-slate-800">
                Professor Deepak S. Shete
              </h3>
              <p className="text-sm text-slate-500">Manager</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500 border-t border-slate-200 pt-3">
            <p>sir@tcetmumbai.in</p>
            <p>
              Logged in as:{" "}
              <span className="font-semibold text-emerald-600">Manager</span>
            </p>
          </div>
          <SubmitAttendance onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
