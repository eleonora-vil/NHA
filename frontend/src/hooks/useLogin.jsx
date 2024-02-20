// frontend/src/hooks/useLogin.js
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userName, password) => {
    try {
      if (!userName || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      setLoading(true);
      const res = await fetch(
        "https://chat-app-gqtq.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password }),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setAuthUser(data.user);
      toast.success("Login Success");
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
