import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";
import Button from "../components/Button";
import Input from "../components/Input";
import "../assets/styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState(""); // 사용자명 상태 저장
  const [password, setPassword] = useState(""); // 비밀번호 상태 저장
  const [error, setError] = useState(""); // 오류 메시지 상태 저장
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    try {
      const response = await AuthenticationService.signIn(username, password); // 로그인 요청

      if (response.status === "success" && response.data) {
        const { accessToken, refreshToken, userId, userName } = response.data;

        if (!accessToken || !refreshToken || !userId || !userName) {
          setError("로그인 실패: 필요한 정보가 누락되었습니다."); // 로그인 실패 시 오류 처리
          return;
        }

        localStorage.setItem("accessToken", accessToken); // 액세스 토큰 저장
        localStorage.setItem("refreshToken", refreshToken); // 리프레시 토큰 저장
        localStorage.setItem("userId", userId); // 사용자 ID 저장
        localStorage.setItem("userName", userName); // 사용자명 저장
        navigate("/"); // 로그인 성공 후 홈으로 이동
      } else {
        setError(response.message || "로그인 실패"); // 실패 메시지 처리
      }
    } catch (error) {
      console.error("로그인 오류:", error); // 오류 로그 출력
      setError(
        error.response?.data?.message || "로그인 실패. 서버 오류를 확인하세요."
      ); // 서버 오류 메시지 처리
    }
  };

  return (
    <div className="login-container">
      <h2>登录</h2> {/* 로그인 */}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <Input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <Button className="login-btn" type="submit">
          登录
        </Button>
        <Button className="kakao-btn" type="button">
          使用Kakao登录
        </Button>
      </form>
      <div className="signup-link">
        <a href="/signup">注册</a> {/* 회원가입 */}
      </div>
    </div>
  );
};

export default Login;
