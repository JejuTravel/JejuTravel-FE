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
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("userId", response.data.data.userId);
        return response.data;
      } else {
        throw new Error(response.data.message || "로그인 실패");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
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
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        return true;
      } else {
        console.error("토큰 재발급 실패:", response.data.message);
        return false;
      }
    } catch (error) {
      console.error("토큰 재발급 중 오류 발생:", error);
      return false;
    }
  },

  // 개인정보 조회
  async getUserProfile() {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get("/api/mypage/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "개인정보 조회 실패");
      }
    } catch (error) {
      console.error("개인정보 조회 오류:", error);
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
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "개인정보 수정 실패");
      }
    } catch (error) {
      console.error("개인정보 수정 오류:", error);
      throw error;
    }
  },

  // 비밀번호 변경
  async updatePassword(passwordData) {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.put(
        "/api/mypage/update/password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.status === "success") {
        return true;
      } else {
        throw new Error(response.data.message || "비밀번호 변경 실패");
      }
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      throw error;
    }
  },

  // 로그아웃
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
  },
};

export default AuthenticationService;
