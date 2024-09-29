import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import {
  getScheduleList,
  createSchedule,
  editSchedule as updateSchedule,
  deleteSchedule as deleteScheduleAPI,
} from "../../apis";
import MyDatePicker from './MyDatePicker';

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

function LoginAlertModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-yellow-800">需要Kakao登录。</h2>
        <p className="text-yellow-600 mt-2">请用Kakao账号登录。</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded">
          关闭
        </button>
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
  const [token, setToken] = useState(null);
  const [isKakaoLoggedIn, setIsKakaoLoggedIn] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    const kakaoToken = localStorage.getItem("kakaoAccessToken");
      if (kakaoToken) {
        setToken(kakaoToken);
        setIsKakaoLoggedIn(true);
      } else {
        setIsKakaoLoggedIn(false);
      }
  }, []);

  const requireKakaoLogin = (action) => {
    if (!isKakaoLoggedIn) {
      setShowLoginAlert(true);
      return false;
    }
    return true;
  };

  // 시간을 5분 단위로 맞추는 함수
  const roundToNearestFiveMinutes = (date) => {
    const minutes = Math.round(date.getMinutes() / 5) * 5;
    date.setMinutes(minutes);
    date.setSeconds(0);  // 초는 0으로 설정
    return date;
  };

  const addSchedule = async () => {
    if (!requireKakaoLogin()) return;

    if (!newTitle || !newStartTime || !newEndTime || !newDescription) {
      alert("所有字段必须填写！");
      return;
    }

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
      if (response.data.status === "success") {
        const newSchedule2 = {
          id: response.data.data.event_id,
          title: newTitle,
          time: newSchedule.time,
          description: newDescription,
        };
        setSchedules([...schedules, newSchedule2]);
        resetForm();
      } else {
        alert("添加日程失败。");
      }
    } catch (error) {
      console.error("日程创建错误:", error);
      alert("添加日程时发生错误。");
    }
  };

  const deleteSchedule = async (delSchedule) => {
    if (!requireKakaoLogin()) return;

    try {
      const response = await deleteScheduleAPI(delSchedule.id, "THIS", token);
      if (response.data.status === "success") {
        setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== delSchedule.id));
      }
    } catch (error) {
      console.error("删除日程时出错:", error);
    }
  };

  const startEdit = (schedule) => {
    setEditSchedule(schedule);
    setNewTitle(schedule.title);
    setNewDescription(schedule.description);
    setNewStartTime(schedule.time.start_at);
    setNewEndTime(schedule.time.end_at);
  };

  const applyEdit = async () => {
    if (!requireKakaoLogin()) return;

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

    try {
      const response = await updateSchedule(editSchedule.id, updatedSchedule, token);
      if (response.data.status === "success") {
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

  const searchSchedules = async () => {
    if (!searchFrom || !searchTo) {
      alert("请选择日期范围。");
      return;
    }

    try {
      const response = await getScheduleList(
        roundToNearestFiveMinutes(new Date(searchFrom)).toISOString().slice(0, -5) + 'Z',
        roundToNearestFiveMinutes(new Date(searchTo)).toISOString().slice(0, -5) + 'Z',
        token
      );
      if (response.data.status === "success") {
        setSchedules(response.data.data.events || []);
        resetForm();
      }
    } catch (error) {
      console.error("检索日程时出错:", error);
    }
  };

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
          <h1 className="text-4xl font-bold text-[#FF6B35] mb-2">日程管理</h1>
          <p className="text-gray-600 text-lg">高效管理您的日程</p>
        </div>
        <div className="mb-12">
          <div className="bg-[#FF6B35] text-white px-4 py-3 rounded-t-lg">按日期范围搜索</div>
          <div className="bg-white p-4 rounded-b-lg shadow-lg">
          <div className="flex space-x-4">
              <div className="flex-grow">
                <MyDatePicker
                  selected={searchFrom}
                  onChange={(date) => setSearchFrom(date)}
                />
              </div>
              <div className="flex-grow">
                <MyDatePicker
                  selected={searchTo}
                  onChange={(date) => setSearchTo(date)}
                />
              </div>
            </div>
            <button className="bg-[#FF6B35] text-white w-full py-2 rounded-full mt-3">
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
            <div className="flex space-x-4">
              <div className="flex-grow">
                <MyDatePicker
                  selected={newStartTime}
                  onChange={(date) => setNewStartTime(date)}
                />
              </div>
              <div className="flex-grow">
                <MyDatePicker
                  selected={newEndTime}
                  onChange={(date) => setNewEndTime(date)}
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="日程描述"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border w-full p-3 mb-4 rounded focus:outline-none focus:ring focus:ring-[#FF6B35]"
            />
            {editSchedule ? (
              <button onClick={applyEdit} className="bg-[#FF6B35] text-white w-full py-2 rounded-full">
                更新日程
              </button>
            ) : (
              <button onClick={addSchedule} className="bg-[#FF6B35] text-white w-full py-2 rounded-full">
                添加日程
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6 animate-fade-in">
          {schedules.length > 0 &&
            schedules.map((schedule) => (
              <ScheduleComponent
                key={schedule.id}
                schedule={schedule}
                onEdit={startEdit}
                onDelete={deleteSchedule}
              />
            ))}
        </div>
      </div>

      {/* Kakao 로그인 필요 팝업 */}
      {showLoginAlert && <LoginAlertModal onClose={() => setShowLoginAlert(false)} />}
    </div>
  );
}

export default SchedulePage;
