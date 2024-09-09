import React, { useState } from "react";
import Header from "../../components/Header";

// 일정 항목을 표시하는 컴포넌트
function ScheduleComponent({ schedule, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{schedule.title}</h3>
          <p>{schedule.date}</p>
          <p>{schedule.description}</p>
        </div>
        <div className="space-x-2">
          <button onClick={() => onEdit(schedule)} className="text-blue-500">
            Edit
          </button>
          <button onClick={() => onDelete(schedule.id)} className="text-red-500">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function SchedulePage() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: "Jeju Trip",
      date: "2024-09-15",
      description: "Day 1: Arrival at the airport and walking along Jeju Olle Trail",
    },
    {
      id: 2,
      title: "Check-in at Hotel",
      date: "2024-09-15",
      description: "Check-in at 6 PM",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editSchedule, setEditSchedule] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState("");

  // 일정 추가
  const addSchedule = () => {
    if (newTitle && newDate) {
      const newSchedule = {
        id: schedules.length + 1,
        title: newTitle,
        date: newDate,
        description: newDescription,
      };
      setSchedules([...schedules, newSchedule]);
      setNewTitle("");
      setNewDescription("");
      setNewDate("");
    }
  };

  // 일정 삭제
  const deleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  // 일정 수정
  const startEdit = (schedule) => {
    setEditSchedule(schedule);
    setNewTitle(schedule.title);
    setNewDescription(schedule.description);
    setNewDate(schedule.date);
  };

  const applyEdit = () => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === editSchedule.id
          ? { ...schedule, title: newTitle, description: newDescription, date: newDate }
          : schedule
      )
    );
    setEditSchedule(null);
    setNewTitle("");
    setNewDescription("");
    setNewDate("");
  };

  // 일정 검색
  const filteredSchedules = schedules.filter((schedule) =>
    schedule.date.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        {/* 상단 제목과 설명 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FF6B35] mb-2">
            Schedule Management
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your schedule efficiently
          </p>
        </div>

        {/* 일정 검색 영역 */}
        <div className="mb-12">
          <div className="bg-[#FF6B35] text-white px-4 py-3 rounded-t-lg">
            Search by Date
          </div>
          <input
            type="text"
            placeholder="Search for schedule by date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border w-full p-3 rounded-b-lg focus:outline-none focus:ring focus:ring-[#FF6B35]"
          />
        </div>

        {/* 일정 추가 영역 */}
        <div className="mb-12">
          <div className="bg-[#FF6B35] text-white px-4 py-3 rounded-t-lg">
            Add New Schedule
          </div>
          <div className="bg-white p-4 rounded-b-lg shadow-lg">
            <input
              type="text"
              placeholder="Schedule Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border w-full p-3 mb-2 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            <input
              type="date"
              placeholder="Schedule Date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border w-full p-3 mb-2 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            <input
              type="text"
              placeholder="Schedule Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border w-full p-3 mb-4 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            <button
              onClick={addSchedule}
              className="bg-[#FF6B35] text-white w-full py-2 rounded-full"
            >
              Add Schedule
            </button>
          </div>
        </div>

        {/* 일정 목록 영역 */}
        <div className="space-y-6 animate-fade-in">
          {filteredSchedules.map((schedule) => (
            <ScheduleComponent
              key={schedule.id}
              schedule={schedule}
              onEdit={startEdit}
              onDelete={deleteSchedule}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;



