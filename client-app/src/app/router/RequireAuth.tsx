import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireAuth() {
  const {
    userStore: { isLoggedIn },
  } = useStore();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
