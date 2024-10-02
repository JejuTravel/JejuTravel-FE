import axiosInstance from "../utils/axiosInstance";

const AuthenticationService = {
  // 로그인
  async signIn(userUsername, userPassword) {
    try {
      const response = await axiosInstance.post("/api/auth/signin", {
        userUsername,
        userPassword,
      });
      if (response.data.status === "success") {
        localStorage.setItem("accessToken", response.data.data.accessToken); // accessToken 저장
        localStorage.setItem("refreshToken", response.data.data.refreshToken); // refreshToken 저장
        localStorage.setItem("userId", response.data.data.userId); // userId 저장
        localStorage.setItem("userName", response.data.data.userName); // userName 저장
        return response.data;
      } else {
        throw new Error(response.data.message || "登录失败"); // 로그인 실패 시 에러 처리
      }
    } catch (error) {
      console.error("登录错误:", error); // 로그인 오류 출력
      throw error;
    }
  },

  // 토큰 갱신
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken"); 
      const response = await axiosInstance.post("/auth/refresh", {
        refreshToken,
      });
      if (response.data.status === "success") {
        localStorage.setItem("accessToken", response.data.data.accessToken); // accessToken 업데이트
        localStorage.setItem("refreshToken", response.data.data.refreshToken); // refreshToken 업데이트
        return true;
      } else {
        console.error("刷新令牌失败:", response.data.message); // 토큰 재발급 실패 시 오류 메시지 출력
        return false;
      }
    } catch (error) {
      console.error("刷新令牌时发生错误:", error); // 토큰 재발급 오류 발생 시 처리
      return false;
    }
  },

  // 개인정보 조회
  async getUserProfile() {
    const accessToken = localStorage.getItem("accessToken"); 
    try {
      const response = await axiosInstance.get("/api/mypage/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // accessToken을 이용한 권한 설정
        },
      });
      if (response.data.status === "success") {
        return response.data.data; 
      } else {
        throw new Error(response.data.message || "获取个人信息失败"); // 개인정보 조회 실패 시 에러 발생
      }
    } catch (error) {
      console.error("获取个人信息时发生错误:", error); // 개인정보 조회 시 오류 처리
      throw error;
    }
  },

  // 개인정보 수정
  async updateUserProfile(profileData) {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.put(
        "/api/mypage/update",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 이용한 권한 설정
          },
        }
      );
      if (response.data.status === "success") {
        return response.data.data; 
      } else {
        throw new Error(response.data.message || "更新个人信息失败"); // 개인정보 수정 실패 시 에러 발생
      }
    } catch (error) {
      console.error("更新个人信息时发生错误:", error); // 개인정보 수정 시 오류 처리
      throw error;
    }
  },

  // 비밀번호 변경
  async updatePassword(updatedProfilePassword) {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.put(
        "/api/mypage/update/password",
          updatedProfilePassword,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 이용한 권한 설정
          },
        }
      );
      if (response.data.status === "success") {
        return true; 
      } else {
        throw new Error(response.data.message || "修改密码失败"); // 비밀번호 변경 실패 시 에러 발생
      }
    } catch (error) {
      console.error("修改密码时发生错误:", error); // 비밀번호 변경 시 오류 처리
      throw error;
    }
  },
  getKakaoAuthUrl() {
    const kakaoAccessToken = localStorage.getItem("kakaoAccessToken");

    if (!kakaoAccessToken) { // kakaoAccessToken이 없는, 초기 로그인
      const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;  // 실제 REST API 키
      const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;  // 리다이렉트 URI
      return `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
    } else { // kakaoAccessToken이 있는, 추가 항목 동의를 받기.
      const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;  // 실제 REST API 키
      const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;  // 리다이렉트 URI
      return `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=talk_calendar`;
    }
  },

  async kakaoLogin(code) {
    try {
      const response = await axiosInstance.get(`/api/auth/kakao/signin?code=${code}`);
      if (response.data.status === 'success') {
        return response.data;
      } else {
        throw new Error(response.data.message || '카카오 로그인 실패');
      }
    } catch (error) {
      console.error('Kakao 登录失败:', error);
      throw error;
    }
  },

  // 로그아웃
  logout() {
    localStorage.removeItem("accessToken"); // accessToken 삭제
    localStorage.removeItem("refreshToken"); // refreshToken 삭제
    localStorage.removeItem("userId"); // userId 삭제
    localStorage.removeItem("userName"); // userName 삭제
    localStorage.removeItem("kakaoAccessToken");
  },
};

export default AuthenticationService;
