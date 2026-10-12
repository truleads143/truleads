import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const URL=import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = [];

    if (!email.trim()) {
      newErrors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push("Please enter a valid email address");
    }

    if (!password.trim()) {
      newErrors.push("Password is required");
    } else if (password.length < 6) {
      newErrors.push("Password must be at least 6 characters long");
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${URL}/api/employee/login`,
        { email, password },
        { withCredentials: true }
      );

      navigate("/employee/home");
      // window.open("/employee/home", "_blank");
    } catch (err) {
      const backendErrors = [];

      // Backend sends array of errors
      if (Array.isArray(err?.response?.data?.errors)) {
        backendErrors.push(...err.response.data.errors);
      }
      // Backend sends single message
      else if (err?.response?.data?.message) {
        backendErrors.push(err.response.data.message);
      }
      // Network / unknown error
      else {
        backendErrors.push("Something went wrong. Please try again.");
      }

      setErrors(backendErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0d3768] via-[#124D95] to-[#0d3768] px-4">

      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-center text-[#0d3768] mb-1">
          TruHealthInsurance
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Employee Login
        </p>

        {/* ERROR BLOCK */}
        {errors.length > 0 && (
          <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3">
            <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="employee@truhealthinsurance.com"
              className="
                w-full px-4 py-3 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-[#124D95]
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
                w-full px-4 py-3 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-[#124D95]
              "
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-xl
              bg-[#124D95] text-white
              font-semibold text-lg
              hover:bg-[#0d3768]
              transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}
