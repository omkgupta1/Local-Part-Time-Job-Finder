import React, { useState } from "react";
import { FaHome, FaSearch, FaUser, FaCompass } from "react-icons/fa";

const SeekerHome = () => {
  const [activeTab, setActiveTab] = useState("home");

  // Dummy job data – replace with real data later
  const topJobs = [
    { id: 1, title: "Part-Time Web Developer", company: "TechNest" },
    { id: 2, title: "Retail Associate", company: "SuperMart" },
    { id: 3, title: "Social Media Intern", company: "InstaGrowth" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Search Bar */}
      <div className="p-4 bg-gray-800 shadow-md">
        <input
          type="text"
          placeholder="Search for jobs, skills, companies..."
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-around bg-gray-800 p-3 text-sm font-medium">
        <button onClick={() => setActiveTab("home")} className={activeTab === "home" ? "text-blue-400" : ""}>
          <FaHome className="inline mr-1" /> Home
        </button>
        <button onClick={() => setActiveTab("explore")} className={activeTab === "explore" ? "text-blue-400" : ""}>
          <FaCompass className="inline mr-1" /> Explore
        </button>
        <button onClick={() => setActiveTab("search")} className={activeTab === "search" ? "text-blue-400" : ""}>
          <FaSearch className="inline mr-1" /> Search
        </button>
        <button onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "text-blue-400" : ""}>
          <FaUser className="inline mr-1" /> Profile
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === "home" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Top Job Suggestions</h2>
            <div className="space-y-4">
              {topJobs.map((job) => (
                <div key={job.id} className="bg-gray-800 p-4 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-400">{job.company}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "explore" && (
          <div>
            <h2 className="text-xl font-bold">Explore Opportunities</h2>
            <p className="text-gray-400 mt-2">Feature coming soon...</p>
          </div>
        )}

        {activeTab === "search" && (
          <div>
            <h2 className="text-xl font-bold">Advanced Job Search</h2>
            <p className="text-gray-400 mt-2">Feature coming soon...</p>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-bold">Your Profile</h2>
            <p className="text-gray-400 mt-2">Feature coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeekerHome;
