import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: "", // student
    course: "",  // student
    companyName: "", // employer
    industry: "",    // employer
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Role */}
          <div>
            <label className="block mb-1 font-semibold">Register as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="student">Student</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-semibold">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Re-enter password"
            />
          </div>

          {/* Conditional Fields */}
          {role === "student" && (
            <>
              <div>
                <label className="block mb-1 font-semibold">College</label>
                <input
                  name="college"
                  type="text"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="Enter college name"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Course</label>
                <input
                  name="course"
                  type="text"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="Enter your course"
                />
              </div>
            </>
          )}

          {role === "employer" && (
            <>
              <div>
                <label className="block mb-1 font-semibold">Company Name</label>
                <input
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Industry</label>
                <input
                  name="industry"
                  type="text"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="e.g., IT, Retail, Finance"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition p-2 rounded font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
