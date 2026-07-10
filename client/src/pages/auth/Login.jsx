import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Logo from "../../components/ui/Logo";

import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ===============================
  // Handle Input Change
  // ===============================
  const handleChange = (e) => {
    console.log("========== INPUT CHANGED ==========");
    console.log("Field :", e.target.name);
    console.log("Value :", e.target.value);

    setFormData((prev) => {
      const updated = {
        ...prev,
        [e.target.name]: e.target.value,
      };

      console.log("Updated FormData:", updated);

      return updated;
    });
  };

  // ===============================
  // Handle Login
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("========== LOGIN BUTTON CLICKED ==========");
    console.log("Submitting FormData:", formData);

    try {
      setLoading(true);

      const data = await loginUser(formData);

      console.log("========== API SUCCESS ==========");
      console.log(data);

      login(data.user, data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log("========== API ERROR ==========");
      console.log(err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg px-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-10"
      >
        <Logo />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-gray-400 mt-2">
            Sign in to continue.
          </p>
        </div>

        <div className="space-y-6">
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@gmail.com"
            icon={Mail}
          />

          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            icon={Lock}
            rightIcon={showPassword ? EyeOff : Eye}
            onRightIconClick={() =>
              setShowPassword(!showPassword)
            }
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <label className="flex items-center gap-2 text-gray-300 text-sm">
            <input
              type="checkbox"
              className="accent-violet-600"
            />
            Remember Me
          </label>

          <button
            type="button"
            className="text-violet-400 hover:text-violet-300 text-sm"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center gap-2"
          >
            {loading ? "Logging in..." : "Login"}

            {!loading && <ArrowRight size={18} />}
          </Button>
        </div>

        <div className="my-8 flex items-center">
          <div className="flex-1 h-px bg-white/10"></div>

          <span className="px-4 text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <button
          type="button"
          className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition"
        >
          Continue with Google
        </button>

        <p className="text-center text-gray-400 mt-8">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-violet-400 hover:text-violet-300 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;