import { useEffect } from "react";
import { Header } from "components";
import { Outlet, useNavigate } from "react-router";

export const MainLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/auth/signin");
    }
  }, [token, navigate]);

  return (
    <div className="conatiner">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
