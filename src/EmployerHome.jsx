// import React, { useState } from "react";
// import { FaPlus, FaClipboardList, FaBriefcase, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

// const EmployerHome = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");

//   // Dummy jobs and applications — replace with real API later
//   const postedJobs = [
//     { id: 1, title: "Frontend Developer", applicants: 5 },
//     { id: 2, title: "Content Writer", applicants: 3 },
//   ];

//   const applications = [
//     { id: 1, name: "Rahul Sharma", job: "Frontend Developer" },
//     { id: 2, name: "Priya Verma", job: "Content Writer" },
//   ];

//   return (
//     <div className="min-h-screen flex bg-gray-900 text-white">
//       {/* Sidebar */}
//       <div className="w-1/5 bg-gray-800 p-4 flex flex-col gap-6">
//         <h2 className="text-xl font-bold mb-6">Employer Panel</h2>
//         <button onClick={() => setActiveTab("dashboard")} className="text-left hover:text-blue-400">
//           <FaBriefcase className="inline mr-2" /> Dashboard
//         </button>
//         <button onClick={() => setActiveTab("postJob")} className="text-left hover:text-blue-400">
//           <FaPlus className="inline mr-2" /> Post Job
//         </button>
//         <button onClick={() => setActiveTab("applications")} className="text-left hover:text-blue-400">
//           <FaClipboardList className="inline mr-2" /> Applications
//         </button>
//         <button onClick={() => setActiveTab("profile")} className="text-left hover:text-blue-400">
//           <FaUserCircle className="inline mr-2" /> Profile
//         </button>
//         <button onClick={() => alert("Logout logic here")} className="text-left hover:text-red-400">
//           <FaSignOutAlt className="inline mr-2" /> Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="w-4/5 p-6 overflow-y-auto">
//         {activeTab === "dashboard" && (
//           <div>
//             <h1 className="text-2xl font-bold mb-4">Welcome to Employer Dashboard</h1>
//             <p className="text-gray-400 mb-6">Manage your jobs and see who has applied!</p>

//             <h2 className="text-xl font-semibold mb-3">Your Posted Jobs</h2>
//             <div className="space-y-4">
//               {postedJobs.map((job) => (
//                 <div key={job.id} className="bg-gray-800 p-4 rounded-xl">
//                   <h3 className="text-lg font-semibold">{job.title}</h3>
//                   <p className="text-gray-400">{job.applicants} applications received</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "postJob" && (
//   <div className="w-full px-10 py-8">
//     <h1 className="text-3xl font-bold mb-8">Create Job</h1>
//     <form className="grid grid-cols-2 gap-10 text-white">
//       {/* LEFT SIDE — Job Details */}
//       <div className="space-y-6">
//         <input type="text" placeholder="Job Title" className="w-full p-4 rounded bg-gray-700" />
//         <input type="text" placeholder="Job Category" className="w-full p-4 rounded bg-gray-700" />

//         <div className="flex gap-6">
//           {["Part-time", "Internship", "Contract"].map((type) => (
//             <label key={type} className="flex items-center gap-2">
//               <input type="radio" name="employmentType" value={type} className="accent-blue-500" />
//               {type}
//             </label>
//           ))}
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           <input type="number" placeholder="No. of Openings" className="p-4 rounded bg-gray-700" />
//           <input type="text" placeholder="Salary (e.g., ₹40k/month)" className="p-4 rounded bg-gray-700" />
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           <input type="date" className="p-4 rounded bg-gray-700" placeholder="Start Date" />
//           <input type="date" className="p-4 rounded bg-gray-700" placeholder="End Date" />
//         </div>

//         <textarea
//           placeholder="Job Description"
//           rows={6}
//           className="w-full p-4 rounded bg-gray-700"
//         />
//       </div>

//       {/* RIGHT SIDE — Employer Details */}
//       <div className="space-y-6">
//         <input type="text" placeholder="Company Name" className="w-full p-4 rounded bg-gray-700" />
//         <input type="text" placeholder="Branch/Office Location" className="w-full p-4 rounded bg-gray-700" />
//         <input type="text" placeholder="Contact Person" className="w-full p-4 rounded bg-gray-700" />
//         <input type="tel" placeholder="Phone Number" className="w-full p-4 rounded bg-gray-700" />

//         <textarea
//           placeholder="Full Address"
//           rows={4}
//           className="w-full p-4 rounded bg-gray-700"
//         />

//         <div className="bg-gray-800 rounded h-48 flex items-center justify-center text-gray-400 text-sm italic">
//           Map Placeholder
//         </div>
//       </div>

//       {/* FULL WIDTH BUTTON */}
//       <div className="col-span-2 flex justify-end mt-8">
//         <button
//           type="submit"
//           onClick={(e) => {
//             e.preventDefault();
//             alert("Job posted (backend integration pending)");
//           }}
//           className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded font-semibold"
//         >
//           Post Job
//         </button>
//       </div>
//     </form>
//   </div>
// )}


//         {activeTab === "applications" && (
//           <div>
//             <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
//             <div className="space-y-4">
//               {applications.map((app) => (
//                 <div key={app.id} className="bg-gray-800 p-4 rounded-xl">
//                   <h3 className="text-lg font-semibold">{app.name}</h3>
//                   <p className="text-gray-400">Applied for: {app.job}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "profile" && (
//           <div>
//             <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
//             <p className="text-gray-400">Company: ABC Pvt Ltd</p>
//             <p className="text-gray-400">Industry: IT</p>
//             <p className="text-gray-400 mt-2 italic">Profile editing coming soon...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployerHome;
import React, { useState } from "react";
import {
  FaPlus,
  FaClipboardList,
  FaBriefcase,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const EmployerHome = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const postedJobs = [
    { id: 1, title: "Frontend Developer", applicants: 5 },
    { id: 2, title: "Content Writer", applicants: 3 },
  ];

  const applications = [
    { id: 1, name: "Rahul Sharma", job: "Frontend Developer" },
    { id: 2, name: "Priya Verma", job: "Content Writer" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 p-4 flex flex-col gap-6">
        <h2 className="text-xl font-bold mb-6">Employer Panel</h2>
        <button onClick={() => setActiveTab("dashboard")} className="text-left hover:text-blue-400">
          <FaBriefcase className="inline mr-2" /> Dashboard
        </button>
        <button onClick={() => setActiveTab("postJob")} className="text-left hover:text-blue-400">
          <FaPlus className="inline mr-2" /> Post Job
        </button>
        <button onClick={() => setActiveTab("applications")} className="text-left hover:text-blue-400">
          <FaClipboardList className="inline mr-2" /> Applications
        </button>
        <button onClick={() => setActiveTab("profile")} className="text-left hover:text-blue-400">
          <FaUserCircle className="inline mr-2" /> Profile
        </button>
        <button onClick={() => alert("Logout logic here")} className="text-left hover:text-red-400">
          <FaSignOutAlt className="inline mr-2" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8 overflow-y-auto">
        {/* Dashboard Section */}
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Welcome to Employer Dashboard</h1>
            <p className="text-gray-400 mb-6">Manage your jobs and see who has applied!</p>

            <h2 className="text-xl font-semibold mb-4">Your Posted Jobs</h2>
            <div className="grid grid-cols-2 gap-6">
              {postedJobs.map((job) => (
                <div key={job.id} className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-400">{job.applicants} applications received</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Post Job Section */}
        {activeTab === "postJob" && (
          <div className="w-full px-4 py-4">
            <h1 className="text-3xl font-bold mb-8">Create Job</h1>
            <form className="grid grid-cols-2 gap-10 text-white">
              {/* Left Side */}
              <div className="space-y-6">
                <input type="text" placeholder="Job Title" className="w-full p-4 rounded bg-gray-700" />
                <input type="text" placeholder="Job Category" className="w-full p-4 rounded bg-gray-700" />

                <div className="flex gap-6">
                  {["Part-time", "Internship", "Contract"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input type="radio" name="employmentType" value={type} className="accent-blue-500" />
                      {type}
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <input type="number" placeholder="No. of Openings" className="p-4 rounded bg-gray-700" />
                  <input type="text" placeholder="Salary (e.g., ₹40k/month)" className="p-4 rounded bg-gray-700" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <input type="date" className="p-4 rounded bg-gray-700" />
                  <input type="date" className="p-4 rounded bg-gray-700" />
                </div>

                <textarea
                  placeholder="Job Description"
                  rows={6}
                  className="w-full p-4 rounded bg-gray-700"
                />
              </div>

              {/* Right Side */}
              <div className="space-y-6">
                <input type="text" placeholder="Company Name" className="w-full p-4 rounded bg-gray-700" />
                <input type="text" placeholder="Branch/Office Location" className="w-full p-4 rounded bg-gray-700" />
                <input type="text" placeholder="Contact Person" className="w-full p-4 rounded bg-gray-700" />
                <input type="tel" placeholder="Phone Number" className="w-full p-4 rounded bg-gray-700" />

                <textarea
                  placeholder="Full Address"
                  rows={4}
                  className="w-full p-4 rounded bg-gray-700"
                />

                <div className="bg-gray-800 rounded h-48 flex items-center justify-center text-gray-400 text-sm italic">
                  Map Placeholder
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-span-2 flex justify-end mt-8">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Job posted (backend integration pending)");
                  }}
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded font-semibold"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Applications Section */}
        {activeTab === "applications" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold">{app.name}</h3>
                  <p className="text-gray-400">Applied for: {app.job}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
            <p className="text-gray-400">Company: ABC Pvt Ltd</p>
            <p className="text-gray-400">Industry: IT</p>
            <p className="text-gray-400 mt-2 italic">Profile editing coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerHome;
