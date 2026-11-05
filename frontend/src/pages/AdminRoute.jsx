
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  let loggedInUser = null;

  try {
    loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );
  } catch (error) {
    console.error("Invalid loggedInUser data:", error);
  }

  const role = String(loggedInUser?.role || "")
    .trim()
    .toUpperCase();


  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
