// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [role, setRole] = useState("seeker");
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     education: "",  // seeker
//     skills: "",     // seeker
//     companyName: "", // employer
//     industry: "",    // employer
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const { full_name, email, password, confirmPassword } = formData;

//     if (!full_name || !email || !password || !confirmPassword) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       const res = await fetch("/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, role }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Registration failed");
//       } else {
//         navigate("/login");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//       <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

//         {error && (
//           <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleRegister} className="space-y-5">
//           {/* Role */}
//           <div>
//             <label className="block mb-1 font-semibold">Register as</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//             >
//               <option value="seeker">Seeker</option>
//               <option value="employer">Employer</option>
//             </select>
//           </div>

//           {/* Name */}
//           <div>
//             <label className="block mb-1 font-semibold">Full Name</label>
//             <input
//               name="full_name"
//               type="text"
//               value={formData.full_name}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//               placeholder="Enter your name"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-1 font-semibold">Email</label>
//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-1 font-semibold">Password</label>
//             <input
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//               placeholder="Enter password"
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block mb-1 font-semibold">Confirm Password</label>
//             <input
//               name="confirmPassword"
//               type="password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//               placeholder="Re-enter password"
//             />
//           </div>

//           {/* Conditional Fields */}
//           {role === "seeker" && (
//             <>
//               <div>
//                 <label className="block mb-1 font-semibold">Education</label>
//                 <input
//                   name="education"
//                   type="text"
//                   value={formData.education}
//                   onChange={handleChange}
//                   className="w-full p-2 rounded bg-gray-700 text-white"
//                   placeholder="e.g., B.Sc. IT, final year"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 font-semibold">Skills</label>
//                 <input
//                   name="skills"
//                   type="text"
//                   value={formData.skills}
//                   onChange={handleChange}
//                   className="w-full p-2 rounded bg-gray-700 text-white"
//                   placeholder="e.g., HTML, CSS, MS Excel"
//                 />
//               </div>
//             </>
//           )}

//           {role === "employer" && (
//             <>
//               <div>
//                 <label className="block mb-1 font-semibold">Company Name</label>
//                 <input
//                   name="companyName"
//                   type="text"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                   className="w-full p-2 rounded bg-gray-700 text-white"
//                   placeholder="Enter company name"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 font-semibold">Industry</label>
//                 <input
//                   name="industry"
//                   type="text"
//                   value={formData.industry}
//                   onChange={handleChange}
//                   className="w-full p-2 rounded bg-gray-700 text-white"
//                   placeholder="e.g., IT, Retail, Design"
//                 />
//               </div>
//             </>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 transition p-2 rounded font-semibold"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-sm mt-4 text-center text-gray-400">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-400 hover:underline">
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("seeker");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",

    education: "",
    skills: "",
    companyName: "",
    industry: "",
    branchLocation: "",
    fullAddress: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { full_name, email, password, confirmPassword, phone } = formData;

    if (!full_name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const finalData = {
      ...formData,
      role,
      contactPerson: full_name,   // auto-fill
      contactPhone: phone         // auto-fill
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData)
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
              <option value="seeker">Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {/* Common Fields */}
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter your name"
            />
          </div>

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

          <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter phone number"
            />
          </div>

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

          {/* Seeker Fields */}
          {role === "seeker" && (
            <>
              <div>
                <label className="block mb-1 font-semibold">Education</label>
                <input
                  name="education"
                  type="text"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="e.g., B.Tech CSE"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Skills</label>
                <input
                  name="skills"
                  type="text"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="e.g., HTML, JS, React"
                />
              </div>
            </>
          )}

          {/* Employer Fields */}
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
                  placeholder="Company Name"
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
                  placeholder="e.g., IT, Retail"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Branch/Location</label>
                <input
                  name="branchLocation"
                  type="text"
                  value={formData.branchLocation}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="e.g., Delhi, Mumbai, Remote"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Full Address</label>
                <textarea
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="Full office address"
                ></textarea>
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

