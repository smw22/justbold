import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("access_token");
    if (!localStorage.getItem("access_token")) {
      console.log("Logged out successfully");
    } else {
      console.error("Error logging out");
    }
    navigate("/login");
  }, [navigate]);

  return null;
}
