import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

// 일정 항목을 표시하는 컴포넌트
function ScheduleComponent({ schedule, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{schedule.title}</h3>
          <p>{schedule.start_time} - {schedule.end_time}</p>
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
  const [schedules, setSchedules] = useState([]);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [editSchedule, setEditSchedule] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  // 일정 추가
  const addSchedule = () => {
    if (newTitle && newStartTime && newEndTime) {
      const newSchedule = {
        id: schedules.length + 1,
        title: newTitle,
        start_time: newStartTime,
        end_time: newEndTime,
        description: newDescription,
      };
      setSchedules([...schedules, newSchedule]);
      setNewTitle("");
      setNewDescription("");
      setNewStartTime("");
      setNewEndTime("");
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
    setNewStartTime(schedule.start_time);
    setNewEndTime(schedule.end_time);
  };

  const applyEdit = () => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === editSchedule.id
          ? { ...schedule, title: newTitle, description: newDescription, start_time: newStartTime, end_time: newEndTime }
          : schedule
      )
    );
    setEditSchedule(null);
    setNewTitle("");
    setNewDescription("");
    setNewStartTime("");
    setNewEndTime("");
  };

  // 일정 검색 요청 보내기 (백엔드에서 검색 처리)
  const searchSchedules = async () => {
    try {
      const response = await fetch(
        `/api/v1/events?from=${searchFrom}&to=${searchTo}`
      );
      const data = await response.json();
      if (data.success) {
        setSchedules(data.result);  // Assuming `data.result` contains the list of schedules
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  // 일정 검색 버튼
  useEffect(() => {
    if (searchFrom && searchTo) {
      searchSchedules();
    }
  }, [searchFrom, searchTo]);

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
            Search by Date Range
          </div>
          <div className="bg-white p-4 rounded-b-lg shadow-lg">
            <input
              type="date"
              placeholder="From Date"
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)}
              className="border w-full p-3 mb-2 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            <input
              type="date"
              placeholder="To Date"
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)}
              className="border w-full p-3 mb-2 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
          </div>
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
              type="datetime-local"
              placeholder="Start Time"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
              className="border w-full p-3 mb-2 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            <input
              type="datetime-local"
              placeholder="End Time"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
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
          {schedules.map((schedule) => (
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



