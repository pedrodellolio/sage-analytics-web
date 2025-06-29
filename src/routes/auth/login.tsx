import { Link } from "react-router";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      {/* will either be <Home/> or <Settings/> */}
      <Link to="/auth/register">Go to Register</Link>
    </div>
  );
}
