import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";
import Button from "../components/Button";
import Input from "../components/Input";
import "../assets/styles/Login.css";
import wechatIcon from '../assets/wechat_icon.png';

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

        localStorage.setItem("accessToken", accessToken); // accessToken 저장
        localStorage.setItem("refreshToken", refreshToken); // refreshToken 저장
        localStorage.setItem("userId", userId); // userId 저장
        localStorage.setItem("userName", userName); // userName 저장
        navigate("/"); // 로그인 성공 후 메인 페이지로 이동
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

  const handleKakaoLogin = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        // 토큰이 만료되었는지 확인하는 로직 추가
        const isTokenValid = await checkTokenValidity(accessToken);

        if (!isTokenValid) {
            // 토큰이 만료되었을 경우 로그아웃 처리
            AuthenticationService.logout();
        }
    }

    // 카카오 로그인 URL로 리다이렉트
    window.location.href = AuthenticationService.getKakaoAuthUrl();
  };

  const handleWeChatLogin = () => {
    alert("사업자 등록 후, 위챗 로그인 구현 예정. \n 注册营业执照后，将实现微信登录。");
    window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
  };


  // 토큰 유효성 체크 함수 (예시)
  const checkTokenValidity = async (token) => {
    try {
        const response = await axiosInstance.post('/api/auth/check-token', { token });
        return response.data.status === 'valid';
    } catch (error) {
        console.error("토큰 유효성 체크 실패:", error);
        return false;
    }
  };

  return (
    <div className="login-container">
      <h2>登录</h2> {/* 로그인 페이지 제목 */}
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
        <Button className="kakao-btn" type="button" onClick={handleKakaoLogin}>
          使用Kakao登录
        </Button>
        {/* WeChat 로그인 버튼 */}
        <Button className="wechat-btn" type="button" onClick={handleWeChatLogin}>
          <img src={wechatIcon} alt="WeChat Logo" style={{ width: "400px", height: "50px", marginRight: "8px" }}
          />
        </Button>
      </form>
      <div className="signup-link">
        <a href="/signup">注册</a> {/* 회원가입 */}
      </div>
    </div>
  );
};

export default Login;
