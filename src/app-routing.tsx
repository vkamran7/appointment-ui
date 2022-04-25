import { AuthLayout, MainLayout, AdminLayout } from "layouts";
import { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const Signin = lazy(() =>
  import("pages").then((module) => ({ default: module.Signin }))
);

const Signup = lazy(() =>
  import("pages").then((module) => ({ default: module.Signup }))
);

const Home = lazy(() =>
  import("pages").then((module) => ({ default: module.Home }))
);

const Appointments = lazy(() =>
  import("pages").then((module) => ({ default: module.Appointments }))
);

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="appointments" element={<Appointments />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
