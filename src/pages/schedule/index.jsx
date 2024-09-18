import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import {
  getScheduleList,
  createSchedule,
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
  const [token, setToken] = useState("leh9QNGSSkT8Zqls6xMus-gRx3MdAfX4AAAAAQo8JJsAAAGR7u6Po5CBbdpZdq0Z");  // 토큰을 상태로 관리

  const addSchedule = async () => {
    if (!newTitle || !newStartTime || !newEndTime || !newDescription) {
      alert("모든 필드를 입력해야 합니다!");
      return;
    }
  
    // 입력된 시간을 ISO 8601 UTC 형식으로 변환
    const newSchedule = {
      title: newTitle,
      time: { // 정확한 형식으로 time 객체 추가
        start_at: new Date(newStartTime).toISOString(),
        end_at: new Date(newEndTime).toISOString(),
        time_zone: "Asia/Seoul", // 시간대 추가
        all_day: false, // 예시로 추가한 필드
        lunar: false, // 예시로 추가한 필드
      },
      description: newDescription,
      // 필요한 다른 필드들도 여기에 추가
    };
  
    try {
      const response = await createSchedule(newSchedule, token);
      console.log(response); // 전체 응답을 출력
      console.log(response.data); // 응답 데이터 구조를 확인
  
      if (response.data.success) {
        setSchedules([...schedules, response.data.result]);
        resetForm();
      } else {
        alert(response.data.message || "일정 추가에 실패했습니다."); // 서버에서 반환된 메시지를 출력
      }
    } catch (error) {
      console.error("일정 생성 중 오류:", error);
      alert("일정 추가 중 오류가 발생했습니다.");
    }
  };
  

  // 일정 삭제
  const deleteSchedule = async (id) => {
    try {
      const response = await deleteScheduleAPI(id, "THIS", token);
      if (response.data.success) {
        setSchedules(schedules.filter((schedule) => schedule.id !== id));
      }
    } catch (error) {
      console.error("일정 삭제 중 오류:", error);
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

  // 일정 검색 요청
  const searchSchedules = async () => {
    try {
      const response = await getScheduleList(searchFrom, searchTo, token);
      if (response.data.success) {
        setSchedules(response.data.result);
      }
    } catch (error) {
      console.error("일정 조회 중 오류:", error);
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
            <button
              onClick={searchSchedules}
              className="bg-[#FF6B35] text-white w-full py-2 rounded-full mt-3"
            >
              Search
            </button>
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
