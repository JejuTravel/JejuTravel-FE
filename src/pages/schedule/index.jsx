import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import {
  getScheduleList,
  createSchedule,
  updateSchedule,
  deleteSchedule as deleteScheduleAPI,
} from "../../apis"; // API 모듈 import

function ScheduleComponent({ schedule, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{schedule.title}</h3>
          <p>
            {schedule.time.start_at} - {schedule.time.end_at}
          </p>
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
  const [token, setToken] = useState("YOUR_ACCESS_TOKEN"); // 토큰을 상태로 관리

  // 일정 추가 함수
  const addSchedule = async () => {
    if (!newTitle || !newStartTime || !newEndTime || !newDescription) {
      alert("All fields are required!"); // 모든 필드가 입력되지 않은 경우 경고 메시지
      return;
    }

    const newSchedule = {
      title: newTitle,
      time: {
        start_at: newStartTime,
        end_at: newEndTime,
        time_zone: "Asia/Seoul",
      },
      description: newDescription,
    };

    try {
      const response = await createSchedule(newSchedule, token); // API 호출에 토큰 전달
      if (response.data.success) {
        setSchedules([...schedules, response.data.result]);
        resetForm();
      } else {
        alert("Failed to add schedule"); // 서버 응답 실패 시 경고 메시지
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
      alert("An error occurred while adding the schedule."); // 에러 발생 시 경고 메시지
    }
  };

  // 일정 삭제
  const deleteSchedule = async (id) => {
    try {
      const response = await deleteScheduleAPI(id, "THIS", token); // 삭제 API 호출
      if (response.data.success) {
        setSchedules(schedules.filter((schedule) => schedule.id !== id));
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  // 일정 수정 시작
  const startEdit = (schedule) => {
    setEditSchedule(schedule);
    setNewTitle(schedule.title);
    setNewDescription(schedule.description);
    setNewStartTime(schedule.time.start_at);
    setNewEndTime(schedule.time.end_at);
  };

  // 일정 수정 적용
  const applyEdit = async () => {
    const updatedScheduleData = {
      title: newTitle,
      time: {
        start_at: newStartTime,
        end_at: newEndTime,
        time_zone: "Asia/Seoul",
        all_day: false,
        lunar: false,
      },
      description: newDescription,
      rule: editSchedule.rule,
      location: editSchedule.location,
      reminders: editSchedule.reminders,
      color: editSchedule.color,
    };

    try {
      const response = await updateSchedule(editSchedule.id, updatedScheduleData, token); // 수정 API 호출
      if (response.data.success) {
        setSchedules(
          schedules.map((schedule) =>
            schedule.id === editSchedule.id ? response.data.result : schedule
          )
        );
        resetForm();
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  // 일정 검색 요청
  const searchSchedules = async () => {
    try {
      const response = await getScheduleList(searchFrom, searchTo, token); // 목록 조회 API 호출
      if (response.data.success) {
        setSchedules(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  // 일정 검색 버튼 클릭 또는 날짜 변경 시 자동 검색
  useEffect(() => {
    if (searchFrom && searchTo) {
      searchSchedules();
    }
  }, [searchFrom, searchTo]);

  // 폼 초기화
  const resetForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewStartTime("");
    setNewEndTime("");
    setEditSchedule(null);
  };

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

        {/* 일정 추가/수정 영역 */}
        <div className="mb-12">
          <div className="bg-[#FF6B35] text-white px-4 py-3 rounded-t-lg">
            {editSchedule ? "Edit Schedule" : "Add New Schedule"}
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
            {editSchedule ? (
              <button
                onClick={applyEdit}
                className="bg-[#FF6B35] text-white w-full py-2 rounded-full"
              >
                Update Schedule
              </button>
            ) : (
              <button
                onClick={addSchedule}
                className="bg-[#FF6B35] text-white w-full py-2 rounded-full"
              >
                Add Schedule
              </button>
            )}
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
