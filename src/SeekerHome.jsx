
import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaUser,
  FaCompass,
  FaBriefcase,
  FaCheck,
} from "react-icons/fa";

const SeekerHome = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [hasDisability, setHasDisability] = useState(null);

  const recommendedJobs = [
    {
      id: 1,
      title: "Service Desk Analyst",
      company: "Wipro",
      rating: 3.7,
      location: "Bengaluru (Sarjapur Road)",
      posted: "1d ago",
    },
    {
      id: 2,
      title: "Data Engineer III",
      company: "Kotak Life Insurance",
      rating: 3.7,
      location: "Bengaluru",
      posted: "1d ago",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "Betamonks",
      rating: 3.1,
      location: "Chennai",
      posted: "1d ago",
    },
  ];

  const appliedJobs = [
    {
      id: 101,
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      appliedDate: "Applied 2 days ago",
      status: "Under Review",
      statusColor: "bg-blue-500 text-white",
    },
    {
      id: 102,
      title: "UX Designer",
      company: "Creative Minds",
      appliedDate: "Applied 1 week ago",
      status: "Shortlisted",
      statusColor: "bg-green-500 text-white",
    },
    {
      id: 103,
      title: "Product Manager",
      company: "Innovate Corp",
      appliedDate: "Applied 3 days ago",
      status: "Application Viewed",
      statusColor: "bg-purple-500 text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header: Logo + Tabs + Search */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        {/* Logo */}
        <div className="text-blue-500 font-bold text-2xl mb-2 sm:mb-0">WorkNest</div>

        {/* Tabs */}
<div className="flex space-x-10 mb-2 sm:mb-0">
  <button
    onClick={() => setActiveTab("home")}
    className={`flex items-center space-x-1 text-sm ${
      activeTab === "home" ? "text-blue-400" : "text-gray-300"
    }`}
  >
    <FaHome />
    <span>Home</span>
  </button>
  <button
    onClick={() => setActiveTab("jobs")}
    className={`flex items-center space-x-1 text-sm ${
      activeTab === "jobs" ? "text-blue-400" : "text-gray-300"
    }`}
  >
    <FaBriefcase />
    <span>Explore</span> {/* <-- Changed back from 'Jobs' to 'Explore' */}
  </button>
  <button
    onClick={() => setActiveTab("companies")}
    className={`flex items-center space-x-1 text-sm ${
      activeTab === "companies" ? "text-blue-400" : "text-gray-300"
    }`}
  >
    <FaCompass />
    <span>Companies</span>
  </button>
  <button
    onClick={() => setActiveTab("profile")}
    className={`flex items-center space-x-1 text-sm ${
      activeTab === "profile" ? "text-blue-400" : "text-gray-300"
    }`}
  >
    <FaUser />
    <span>Profile</span>
  </button>
</div>



        {/* Search bar */}
        <div className="flex items-center bg-gray-700 rounded-full px-3 py-1 w-full sm:w-72">
          <input
            type="text"
            placeholder="Search jobs here"
            className="bg-transparent text-white placeholder-gray-400 text-sm flex-1 focus:outline-none"
          />
          <button className="bg-blue-500 p-2 rounded-full text-white">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {activeTab === "home" && (
          <>
            {/* Applied Jobs */}
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FaCheck className="text-green-400 mr-2" />
                Your Applications
              </h2>
              <div className="space-y-3">
                {appliedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-gray-800 p-4 rounded-lg shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{job.title}</h3>
                        <p className="text-sm text-gray-400">{job.company}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${job.statusColor}`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {job.appliedDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What are you missing */}
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">What are you missing?</h2>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
                  Daily job recommendations
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
                  Job application updates
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
                  Direct jobs from recruiters
                </li>
              </ul>
              <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600">
                Complete profile
              </button>
            </div>

            {/* Disability status */}
            {hasDisability === null && (
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-white mb-3">
                  Help us match better opportunities
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setHasDisability(true)}
                    className="flex-1 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-200 hover:bg-gray-700"
                  >
                    I have a disability
                  </button>
                  <button
                    onClick={() => setHasDisability(false)}
                    className="flex-1 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-200 hover:bg-gray-700"
                  >
                    I don't have a disability
                  </button>
                </div>
              </div>
            )}

            {/* Recommended Jobs */}
            <div>
              <h2 className="text-lg font-semibold mb-3">
                Recommended jobs for you
              </h2>
              <div className="space-y-3">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-gray-800 p-4 rounded-lg shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{job.title}</h3>
                        <p className="text-sm text-gray-400">{job.company}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="text-yellow-400 mr-1">★</span>
                        {job.rating}
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{job.location}</span>
                      <span>{job.posted}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Other Tabs */}
        {activeTab === "jobs" && (
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Jobs</h2>
            <p className="text-gray-400">Browse and search for jobs here.</p>
          </div>
        )}
        {activeTab === "companies" && (
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Companies</h2>
            <p className="text-gray-400">Explore companies and their openings.</p>
          </div>
        )}
        {activeTab === "profile" && (
  <div className="space-y-6">
    {/* Profile Header */}
    <div className="bg-gray-800 p-6 rounded-lg shadow flex items-center space-x-4">
      <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-white">
        AP
      </div>
      <div>
        <h2 className="text-xl font-semibold">Aayush Patel</h2>
        <p className="text-gray-400 text-sm">Frontend Developer</p>
      </div>
    </div>

    {/* Personal Info */}
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
      <ul className="text-sm text-gray-300 space-y-2">
        <li><span className="font-medium text-white">Email:</span> aayush@example.com</li>
        <li><span className="font-medium text-white">Phone:</span> +91 9876543210</li>
        <li><span className="font-medium text-white">Location:</span> Ahmedabad, Gujarat</li>
        <li><span className="font-medium text-white">Experience:</span> 1.5 years</li>
      </ul>
    </div>

    {/* Skills */}
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Skills</h3>
      <div className="flex flex-wrap gap-2 text-sm">
        {["React", "JavaScript", "TailwindCSS", "Git", "REST APIs"].map((skill, index) => (
          <span
            key={index}
            className="bg-blue-500 text-white px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* Applied Jobs */}
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Jobs You Applied For</h3>
      <div className="space-y-3">
        {appliedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-gray-700 p-3 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h4 className="font-medium text-white">{job.title}</h4>
              <p className="text-sm text-gray-400">{job.company}</p>
              <p className="text-xs text-gray-500">{job.appliedDate}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${job.statusColor}`}>
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default SeekerHome;
