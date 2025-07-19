import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import PrivateLayout from "./routes/layouts/private.tsx";
import AuthLayout from "./routes/layouts/auth.tsx";
import LoginRoute from "./routes/auth/login.tsx";
import RegisterRoute from "./routes/auth/register.tsx";
import { UploadTransactionsRoute } from "./routes/import-transactions/upload-transactions.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/auth.tsx";
import { SummaryTransactionsRoute } from "./routes/import-transactions/summary-transactions.tsx";
import { ImportTransactionProvider } from "./contexts/import-transaction.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import TransactionsRoute from "./routes/transactions.tsx";
import DashboardRoute from "./routes/dashboard.tsx";
import "./index.css";
import CategoriesRoute from "./routes/category.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ImportTransactionProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateLayout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="dashboard" element={<DashboardRoute />} />
                <Route path="transactions" element={<TransactionsRoute />} />
                <Route path="categories" element={<CategoriesRoute />} />
                <Route path="import" element={<UploadTransactionsRoute />} />
                <Route
                  path="import/summary"
                  element={<SummaryTransactionsRoute />}
                />
              </Route>

              <Route path="auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginRoute />} />
                <Route path="register" element={<RegisterRoute />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ImportTransactionProvider>
    </AuthProvider>
  </QueryClientProvider>
);
