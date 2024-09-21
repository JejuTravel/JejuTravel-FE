import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";
import Button from "../components/Button";
import Input from "../components/Input";
import "../assets/styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthenticationService.signIn(username, password);

      if (response.status === "success" && response.data) {
        const { accessToken, refreshToken, userId, userName } = response.data;

        if (!accessToken || !refreshToken || !userId || !userName) {
          setError("로그인 실패: 필요한 정보가 누락되었습니다.");
          return;
        }

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName); // 추가
        navigate("/"); // Redirect to home on successful login
      } else {
        setError(response.message || "로그인 실패");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setError(
        error.response?.data?.message || "로그인 실패. 서버 오류를 확인하세요."
      );
    }
  };

  return (
    <div className="login-container">
      <h2>LOGIN</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <Input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <Button className="login-btn" type="submit">
          LOGIN
        </Button>
        <Button className="kakao-btn" type="button">
          KAKAO LOGIN
        </Button>
      </form>
      <div className="signup-link">
        <a href="/signup">SIGNUP</a>
      </div>
    </div>
  );
};

export default Login;
