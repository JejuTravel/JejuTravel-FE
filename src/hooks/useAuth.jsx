import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: window.location.pathname } });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
