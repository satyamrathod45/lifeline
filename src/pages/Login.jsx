import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import bg from "../assets/image.png";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  // forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        phone,
        password,
        role,
      });

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else if (res.data.user.role === "hospital") {
        navigate("/hospital-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Forgot password handler
  const handleForgotPassword = async () => {
    if (!email) return alert("Enter email first 😑");

    setEmailLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      alert(res.data.message || "Reset link sent to your email 📩");
      setShowForgot(false);
      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 via-white to-blue-100">
      <div className="flex bg-white shadow-2xl rounded-2xl overflow-hidden w-[850px]">
        {/* LEFT IMAGE */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-red-50">
          <img src={bg} alt="login visual" className="w-[80%]" />
        </div>

        {/* FORM */}
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:w-1/2 p-8"
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-red-600">
            Welcome Back ❤️
          </h2>

          <p className="text-center text-gray-500 mb-6 text-sm">
            Login to continue saving lives 🩸
          </p>

          {/* ROLE */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-3 mb-4 rounded-lg"
          >
            <option value="user">User</option>
            <option value="hospital">Hospital</option>
          </select>

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            required
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            className="w-full border p-3 mb-2 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 👇 Forgot Password */}
          <p
            onClick={() => setShowForgot(true)}
            className="text-right text-sm text-red-500 cursor-pointer mb-4 hover:underline"
          >
            Forgot Password?
          </p>

          <button
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login 🚀"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            New here?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-red-500 cursor-pointer font-semibold"
            >
              Create account
            </span>
          </p>
        </motion.form>
      </div>

      {/* 🔥 FORGOT PASSWORD MODAL */}
      {showForgot && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[350px] shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-center">
              Reset Password 🔐
            </h3>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              className="w-full border p-3 mb-4 rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleForgotPassword}
              disabled={emailLoading}
              className="w-full bg-red-600 text-white py-2 rounded-lg"
            >
              {emailLoading ? "Sending..." : "Send Reset Link 📩"}
            </button>

            <button
              onClick={() => setShowForgot(false)}
              className="w-full mt-2 text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
