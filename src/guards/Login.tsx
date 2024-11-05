import { useAuth } from "@/store/login";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginGuard = ({ children }: PropsWithChildren) => {
  const login = useAuth((store) => store.setIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login();
    } else {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};

export default LoginGuard;
