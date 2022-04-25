import { Header } from "components";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AdminLayout = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!!token) {
      const decoded = jwtDecode<any>(token);
      const { auth } = decoded;
      if (auth[0].authority !== "ROLE_ADMIN") {
        navigate("/");
      }
    } else {
      navigate("/auth/signin");
    }
  }, [token, navigate]);

  return (
    <div className="container">
      <Header />
      <div className="row justify-center">
        <div className="col-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
