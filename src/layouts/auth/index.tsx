import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("access_token");

  useEffect(() => {
    if (!!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="container">
      <div className="row justify-center">
        <div className="col-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
