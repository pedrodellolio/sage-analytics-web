import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import PrivateLayout from "./routes/layouts/private.tsx";
import Dashboard from "./routes/dashboard/index.tsx";
import AuthLayout from "./routes/layouts/auth.tsx";
import Login from "./routes/auth/login.tsx";
import Register from "./routes/auth/register.tsx";
import "./index.css";
import ImportTransactions from "./routes/dashboard/import-transactions.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard">
          <Route index element={<Dashboard />} />
          <Route path="import" element={<ImportTransactions />} />
        </Route>
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
