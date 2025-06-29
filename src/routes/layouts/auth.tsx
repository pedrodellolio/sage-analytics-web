import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <h1>Auth</h1>
      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  );
}
