import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import PrivateLayout from "./routes/layouts/private.tsx";
import Dashboard from "./routes/dashboard.tsx";
import AuthLayout from "./routes/layouts/auth.tsx";
import Login from "./routes/auth/login.tsx";
import Register from "./routes/auth/register.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
