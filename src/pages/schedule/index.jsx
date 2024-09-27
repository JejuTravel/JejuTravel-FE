import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import {
  getScheduleList,
  createSchedule,
  editSchedule as updateSchedule, // 함수 이름 변경
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
            编辑
          </button>
          <button onClick={() => onDelete(schedule)} className="text-red-500">
            删除
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
  // const [token, setToken] = useState(localStorage.getItem('accessToken'));  // 토큰을 상태로 관리
  const [token, setToken] = useState(`${token}`);

  const addSchedule = async () => {
    if (!newTitle || !newStartTime || !newEndTime || !newDescription) {
      alert("所有字段必须填写！");
      return;
    }

    // 입력된 시간을 ISO 8601 UTC 형식으로 변환
    const newSchedule = {
      title: newTitle,
      time: {
        start_at: roundToNearestFiveMinutes(new Date(newStartTime)).toISOString().slice(0, -5) + 'Z',
        end_at: roundToNearestFiveMinutes(new Date(newEndTime)).toISOString().slice(0, -5) + 'Z',
        time_zone: "Asia/Seoul",
        all_day: false,
        lunar: false,
      },
      description: newDescription,
    };

    try {
      const response = await createSchedule(newSchedule, token);
      console.log(response); // 전체 응답을 출력
      console.log(response.data); // 응답 데이터 구조를 확인

      if (response.data.status  === "success") {
        const newSchedule2 = {
          id: response.data.data.event_id, // event_id를 명시적으로 설정
          title: newTitle,
          time: newSchedule.time,
          description: newDescription,
        };
        setSchedules([...schedules, newSchedule2]);
        resetForm();
      } else {
        alert( " 添加日程失败。");
      }
    } catch (error) {
      console.error("日程创建错误:", error);
      alert("添加日程时发生错误。");
    }
  };
  // 시간을 5분 단위로 맞추는 함수
  const roundToNearestFiveMinutes = (date) => {
    const minutes = Math.round(date.getMinutes() / 5) * 5;
    date.setMinutes(minutes);
    date.setSeconds(0);  // 초는 0으로 설정
    return date;
  };
  // 일정 삭제
  const deleteSchedule = async (delSchedule) => {
    try {
      const response = await deleteScheduleAPI(delSchedule.id, "THIS", token);
      if (response.data.status  === "success") {
        setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== delSchedule.id));
      }
    } catch (error) {
      console.error("删除日程时出错:", error);
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

  const applyEdit = async () => {
    if (!newTitle || !newStartTime || !newEndTime || !newDescription) {
      alert("所有字段必须填写！");
      return;
    }

    const updatedSchedule = {
      title: newTitle,
      time: {
        start_at: roundToNearestFiveMinutes(new Date(newStartTime)).toISOString().slice(0, -5) + 'Z',
        end_at: roundToNearestFiveMinutes(new Date(newEndTime)).toISOString().slice(0, -5) + 'Z',
        time_zone: "Asia/Seoul",
        all_day: false,
        lunar: false,
      },
      description: newDescription,
    };

    try { // 수정하기
      const response = await updateSchedule(editSchedule.id, updatedSchedule, token);  // 서버에 수정된 일정 전송
      console.log(response);

      if (response.data.status  === "success") {
        const updatedSchedules = schedules.map((schedule) =>
           schedule.id === editSchedule.id ? { ...schedule, ...updatedSchedule } : schedule
        );
        setSchedules(updatedSchedules);
        resetForm();
      } else {
        alert(response.data.message || "日程更新失败。");
      }
    } catch (error) {
      console.error("日程更新时出错:", error);
      alert("日程更新时发生错误。");
    }
  };

  // 일정 검색 요청
  const searchSchedules = async () => {
    if (!searchFrom || !searchTo) {
      alert("날짜 범위를 선택해주세요.");
      return;
    }

    try {
      const response = await getScheduleList(
          roundToNearestFiveMinutes(new Date(searchFrom)).toISOString().slice(0, -5) + 'Z',
          roundToNearestFiveMinutes(new Date(searchTo)).toISOString().slice(0, -5) + 'Z',
          token);
      if (response.data.status  === "success") {
        setSchedules(response.data.data.events || []); // events가 없으면 빈 배열로 처리
        resetForm();
      }
    } catch (error) {
      console.error("检索日程时出错:", error);
    }
  };

  // useEffect(() => {
  //   if (searchFrom && searchTo) {
  //     searchSchedules();
  //   }
  // }, [searchFrom, searchTo]);

  const resetForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewStartTime("");
    setNewEndTime("");
    setEditSchedule(null);
    setSearchFrom("");
    setSearchTo("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container mx-auto mt-32 p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FF6B35] mb-2">
            日程管理
          </h1>
          <p className="text-gray-600 text-lg">
            高效管理您的日程
          </p>
        </div>

        <div className="mb-12">
          <div className="bg-[#FF6B35] text-white px-4 py-3 rounded-t-lg">
            按日期范围搜索
          </div>
          <div className="bg-white p-4 rounded-b-lg shadow-lg">
            <input
              type="datetime-local"
              placeholder="开始日期"
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)}
              className="border w-full p-3 mb-2 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            <input
              type="datetime-local"
              placeholder="结束日期"
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)}
              className="border w-full p-3 mb-2 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            <button
              onClick={searchSchedules}
              className="bg-[#FF6B35] text-white w-full py-2 rounded-full mt-3"
            >
              搜索
            </button>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-[#FF6B35] text-white px-4 py-3 rounded-t-lg">
            {editSchedule ? "编辑日程" : "添加新日程"}
          </div>
          <div className="bg-white p-4 rounded-b-lg shadow-lg">
            <input
              type="text"
              placeholder="日程标题"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border w-full p-3 mb-2 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            <input
              type="datetime-local"
              placeholder="开始时间"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
              className="border w-full p-3 mb-2 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            <input
              type="datetime-local"
              placeholder="结束时间"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
              className="border w-full p-3 mb-2 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            <input
              type="text"
              placeholder="日程描述"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border w-full p-3 mb-4 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            {editSchedule ? (
              <button
                onClick={applyEdit}
                className="bg-[#FF6B35] text-white w-full py-2 rounded-full"
              >
                更新日程
              </button>
            ) : (
              <button
                onClick={addSchedule}
                className="bg-[#FF6B35] text-white w-full py-2 rounded-full"
              >
                添加日程
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6 animate-fade-in">
          {schedules.length > 0 && schedules.map((schedule) =>
          {
            // schedule이나 schedule.event_id가 없는 경우 에러를 방지
            if (!schedule || !schedule.id) {
              // console.error('schedule or schedule.id is undefined', schedule);
              return null; // null을 반환하여 렌더링에서 건너뜀
            }

            return (
                <ScheduleComponent
                    key={schedule.id} // id를 key로 사용
                    schedule={schedule}
                    onEdit={startEdit}
                    onDelete={deleteSchedule}
                />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;
