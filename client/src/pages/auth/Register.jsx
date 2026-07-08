import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import Logo from "../../components/ui/Logo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "vendor",
      };

      const data = await registerUser(userData);

      alert(data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
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
            Create Account
          </h1>

          <p className="text-gray-400 mt-2">
            Create your Vendor Client Management account.
          </p>

        </div>

        <div className="space-y-5">

          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={User}
            placeholder="Enter your full name"
          />

          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            icon={Mail}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            icon={Lock}
            rightIcon={showPassword ? EyeOff : Eye}
            onRightIconClick={() =>
              setShowPassword(!showPassword)
            }
            placeholder="Create password"
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            icon={Lock}
            placeholder="Confirm password"
          />

        </div>

        <div className="mt-8">

          <Button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center gap-2"
          >
            {loading ? "Creating..." : "Create Account"}

            {!loading && <ArrowRight size={18} />}
          </Button>

        </div>

        <p className="text-center text-gray-400 mt-8">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-violet-400 hover:text-violet-300 font-semibold"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Register;