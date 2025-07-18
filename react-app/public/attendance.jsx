import { useState, useEffect } from "react";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // ✅ Fake previous attendance data
  const [attendanceHistory, setAttendanceHistory] = useState([
    {
      date: "2025-07-15",
      present: 33,
      absent: 17,
    },
    {
      date: "2025-07-16",
      present: 44,
      absent: 6,
    },
  ]);

  useEffect(() => {
    fetch("/students.json")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        let initialAttendance = {};
        for (let i = 0; i < data.length; i++) {
          let student = data[i];
          initialAttendance[student.rollNumber] = false;
        }
        setAttendance(initialAttendance);
      })
      .catch((error) => {
        console.log("Something went wrong!", error);
      });
  }, []);

  const handleCheckboxChange = (rollNumber) => {
    setAttendance((prev) => ({
      ...prev,
      [rollNumber]: !prev[rollNumber],
    }));
    setSubmitted(false);
  };

  const handleSubmit = () => {
    let presentCount = 0;
    Object.values(attendance).forEach((isPresent) => {
      if (isPresent) presentCount++;
    });

    const absentCount = students.length - presentCount;

    setTotalPresent(presentCount);
    setTotalAbsent(absentCount);
    setSubmitted(true);

    // ✅ Append new attendance to fake history
    const today = new Date().toISOString().split("T")[0];
    setAttendanceHistory((prev) => [
      ...prev,
      {
        date: today,
        present: presentCount,
        absent: absentCount,
      },
    ]);
  };

  return (
    <div>
      <header>
        <h1>Attendance Dashboard</h1>
      </header>

      <section>
        <div>
          <h2>Total Students</h2>
          <p>{students.length}</p>
        </div>
        <div>
          <h2>Present Today</h2>
          <p>{submitted ? totalPresent : "N/A"}</p>
        </div>
        <div>
          <h2>Absent Today</h2>
          <p>{submitted ? totalAbsent : "N/A"}</p>
        </div>
      </section>

      <section>
        <h2>Student List</h2>
        <table>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rollNumber}>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={attendance[student.rollNumber] || false}
                    onChange={() => handleCheckboxChange(student.rollNumber)}
                  />
                  {attendance[student.rollNumber] ? "Present" : "Absent"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <button onClick={handleSubmit}>Submit Attendance</button>

      {/* ✅ New table for previous attendance */}
      <section>
        <h2>Previous Attendance Records</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Present</th>
              <th>Absent</th>
            </tr>
          </thead>
          <tbody>
            {attendanceHistory.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.present}</td>
                <td>{record.absent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
