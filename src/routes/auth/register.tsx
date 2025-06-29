import { Link } from "react-router";

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      {/* will either be <Home/> or <Settings/> */}
      <Link to="/auth/login">Go to Login</Link>
    </div>
  );
}
