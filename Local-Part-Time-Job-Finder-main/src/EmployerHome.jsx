import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaClipboardList,
  FaBriefcase,
  FaUserCircle,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaEnvelope,
  FaChevronDown,
  FaMoon,
  FaSun
} from "react-icons/fa";

const EmployerHome = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  // Profile state
  const [employerProfile, setEmployerProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    phone: '',
    company_name: '',
    industry: '',
    branch_location: '',
    full_address: ''
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch employer profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        setProfileError(null);
        
        const response = await fetch('/api/employer/profile', {
          headers: {
            'x-user-id': localStorage.getItem('employerId'),
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        setEmployerProfile(data);
        setEditForm({
          full_name: data.full_name,
          phone: data.phone,
          company_name: data.company_name,
          industry: data.industry,
          branch_location: data.branch_location,
          full_address: data.full_address
        });
      } catch (error) {
        setProfileError(error.message);
      } finally {
        setProfileLoading(false);
      }
    };
    
    if (activeTab === 'profile') {
      fetchProfile();
    }
  }, [activeTab]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      setUpdatingProfile(true);
      
      const response = await fetch('/api/employer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': localStorage.getItem('employerId'),
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editForm)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const updatedProfile = await response.json();
      setEmployerProfile(prev => ({
        ...prev,
        ...editForm
      }));
      setEditingProfile(false);
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Dashboard data
  const stats = [
    { value: "1.2K", label: "APPLICATIONS", change: "+5%" },
    { value: "6.8K", label: "SHORTLISTED", change: "+14%" },
  ];

  const applicationStatus = [
    { label: "Application", value: "10%" },
    { label: "Shortlisted", value: "10%" },
    { label: "On-hold", value: "10%" },
    { label: "Rejected", value: "8%" },
  ];

  const newApplicants = [
    { name: "Douglas Roy", position: "iOS Developer" },
    { name: "Elizabeth Martin", position: "Full Stack Developer" },
    { name: "Emma Wade", position: "Product Designer" },
    { name: "Teresa Reyes", position: "Design Lead" },
    { name: "Crystal Austin", position: "Marketing Manager" },
  ];

  const messages = [
    { sender: "Carol Ferdina", preview: "Have you planned for any deadline..." },
    { sender: "Rob Dial", preview: "The condition has been shortlisted..." },
  ];

  const activities = [
    "There are 3 new applications to iOS Developer.",
    "Teammate Wade Wilson has closed the job post of Design Lead.",
    "There are 7 new applications to Full Stack Developer.",
    "You have drafted a job post for Regional Sales – South, Cannabis now.",
  ];

  // Original data
  const postedJobs = [
    { id: 1, title: "Frontend Developer", applicants: 5 },
    { id: 2, title: "Content Writer", applicants: 3 },
  ];

  const applications = [
    { id: 1, name: "Rahul Sharma", job: "Frontend Developer" },
    { id: 2, name: "Priya Verma", job: "Content Writer" },
  ];

  const [postingJob, setPostingJob] = useState(false);

  const handlePostJob = async (e) => {
    e.preventDefault();
    
    const formData = {
      title: e.target.elements.title.value,
      category: e.target.elements.category.value,
      employment_type: e.target.elements.employmentType.value,
      openings: parseInt(e.target.elements.openings.value),
      salary: e.target.elements.salary.value,
      application_deadline: e.target.elements.application_deadline.value,
      start_date: e.target.elements.startDate.value,
      description: e.target.elements.description.value,
      company_name: e.target.elements.companyName.value,
      location: e.target.elements.location.value,
      contact_person: e.target.elements.contactPerson.value,
      contact_phone: e.target.elements.contactPhone.value,
      contact_address: e.target.elements.contactAddress.value
    };
    
    try {
      setPostingJob(true);
      
      const response = await fetch('/api/employer/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': localStorage.getItem('employerId'),
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to post job');
      }
      
      const data = await response.json();
      alert('Job posted successfully!');
      // Optionally redirect to jobs list or reset form
      setActiveTab('applications');
    } catch (error) {
      console.error(error);
      alert('Failed to post job: ' + error.message);
    } finally {
      setPostingJob(false);
    }
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 dark:bg-gray-900 p-4 flex flex-col gap-6">
        <h2 className="text-xl font-bold mb-6 text-white">Employer Panel</h2>
        <button 
          onClick={() => setActiveTab("dashboard")} 
          className={`text-left p-2 rounded flex items-center ${activeTab === "dashboard" ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
        >
          <FaBriefcase className="inline mr-2" /> Dashboard
        </button>
        <button 
          onClick={() => setActiveTab("postJob")} 
          className={`text-left p-2 rounded flex items-center ${activeTab === "postJob" ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
        >
          <FaPlus className="inline mr-2" /> Post Job
        </button>
        <button 
          onClick={() => setActiveTab("applications")} 
          className={`text-left p-2 rounded flex items-center ${activeTab === "applications" ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
        >
          <FaClipboardList className="inline mr-2" /> Applications
        </button>
        <button 
          onClick={() => setActiveTab("profile")} 
          className={`text-left p-2 rounded flex items-center ${activeTab === "profile" ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'}`}
        >
          <FaUserCircle className="inline mr-2" /> Profile
        </button>
        <button 
          onClick={() => alert("Logout logic here")} 
          className="text-left p-2 rounded flex items-center text-gray-300 hover:text-red-400 mt-auto"
        >
          <FaSignOutAlt className="inline mr-2" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-4/5 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 w-64">
            <FaSearch className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none w-full text-sm dark:text-white dark:placeholder-gray-300"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <FaSun className="text-yellow-300" size={18} />
              ) : (
                <FaMoon className="text-gray-600" size={18} />
              )}
            </button>

            <button className="relative text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white">
              <FaBell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            <button className="relative text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white">
              <FaEnvelope size={18} />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">5</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">JD</div>
              <span className="text-sm font-medium dark:text-white">John Doe</span>
              <FaChevronDown className="text-gray-400" size={12} />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {/* Dashboard Section */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 dark:text-gray-300 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1 dark:text-white">{stat.value}</p>
                      </div>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Application Status */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Application Status</h2>
                <div className="grid grid-cols-4 gap-4">
                  {applicationStatus.map((status, index) => (
                    <div key={index} className="text-center">
                      <div className="h-24 w-24 mx-auto rounded-full flex items-center justify-center border-8" 
                        style={{
                          borderColor: index === 0 ? '#3B82F6' : 
                                       index === 1 ? '#10B981' : 
                                       index === 2 ? '#F59E0B' : '#EF4444',
                          borderLeftColor: index === 0 ? '#93C5FD' : 
                                          index === 1 ? '#A7F3D0' : 
                                          index === 2 ? '#FCD34D' : '#FCA5A5',
                          transform: `rotate(${index * 45}deg)`
                        }}
                      >
                        <span className="text-lg font-bold transform -rotate-45 dark:text-white">{status.value}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{status.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Two Column Layout */}
              <div className="grid grid-cols-3 gap-6">
                {/* New Applicants */}
                <div className="col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 dark:text-white">New Applicants</h2>
                  <div className="space-y-4">
                    {newApplicants.map((applicant, index) => (
                      <div key={index} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-200 font-semibold mr-3">
                          {applicant.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{applicant.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-300">Applied for {applicant.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right Sidebar */}
                <div className="space-y-6">
                  {/* Messages */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 dark:text-white">Messages</h2>
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div key={index} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                          <p className="font-medium dark:text-white">{message.sender}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{message.preview}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Activity */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 dark:text-white">Activity</h2>
                    <div className="space-y-3">
                      <div className="text-sm text-red-500 dark:text-red-400 font-medium">
                        Your plan expires in 3 days. <span className="text-blue-600 dark:text-blue-400 underline">Renew now</span>
                      </div>
                      <div className="space-y-2">
                        {activities.map((activity, index) => (
                          <p key={index} className="text-sm text-gray-600 dark:text-gray-300">{activity}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Post Job Section */}
          {activeTab === "postJob" && (
            <div className="w-full px-4 py-4">
              <h1 className="text-3xl font-bold mb-8 dark:text-white">Create Job</h1>
              <form onSubmit={handlePostJob} className="grid grid-cols-2 gap-10 text-white">
                {/* Left Side */}
                <div className="space-y-6">
                  <input 
                    type="text" 
                    placeholder="Job Title" 
                    className="w-full p-4 rounded bg-gray-700 dark:bg-gray-700" 
                    name="title"
                  />
                  <input
                    type="text"
                    placeholder="Job Category"
                    className="w-full p-4 rounded bg-gray-700 dark:bg-gray-700"
                    name="category"
                    required
                  />

                  <div className="flex gap-6">
                    {["Part-time", "Internship", "Contract"].map((type) => (
                      <label key={type} className="flex items-center gap-2 dark:text-white">
                        <input type="radio" name="employmentType" value={type} className="accent-blue-500" />
                        {type}
                      </label>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <input 
                      type="number" 
                      placeholder="No. of Openings" 
                      className="p-4 rounded bg-gray-700 dark:bg-gray-700" 
                      name="openings"
                    />
                    <input 
                      type="text" 
                      placeholder="Salary (e.g., ₹40k/month)" 
                      className="p-4 rounded bg-gray-700 dark:bg-gray-700" 
                      name="salary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <input 
                      type="date" 
                      className="p-4 rounded bg-gray-700 dark:bg-gray-700" 
                      name="application_deadline"
                      required
                    />
                    <input 
                      type="date" 
                      className="p-4 rounded bg-gray-700 dark:bg-gray-700" 
                      name="startDate"
                    />
                  </div>

                  <textarea
                    placeholder="Job Description"
                    rows={6}
                    className="w-full p-4 rounded bg-gray-700 dark:bg-gray-700"
                    name="description"
                  />
                </div>

                {/* Right Side */}
                <div className="space-y-6">
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    className="w-full p-4 rounded bg-gray-700 dark:bg-gray-700" 
                    name="companyName"
                  />
                  <input 
                    type="text" 
                    placeholder="Branch/Office Location" 
                    className="w-full p-4 rounded bg-gray-700 dark:bg-gray-700" 
                    name="location"
                  />
                  <input 
                    type="text" 
                    placeholder="Contact Person" 
                    className="w-full p-4 rounded bg-gray-700 dark:bg-gray-700" 
                    name="contactPerson"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full p-4 rounded bg-gray-700 dark:bg-gray-700" 
                    name="contactPhone"
                  />

                  <textarea
                    placeholder="Full Address"
                    rows={4}
                    className="w-full p-4 rounded bg-gray-700 dark:bg-gray-700"
                    name="contactAddress"
                  />

                  <div className="bg-gray-800 dark:bg-gray-700 rounded h-48 flex items-center justify-center text-gray-400 text-sm italic">
                    Map Placeholder
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-2 flex justify-end mt-8">
                  <button
                    type="submit"
                    disabled={postingJob}
                    className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded font-semibold disabled:opacity-50"
                  >
                    {postingJob ? 'Posting...' : 'Post Job'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Applications Section */}
          {activeTab === "applications" && (
            <div>
              <h1 className="text-2xl font-bold mb-4 dark:text-white">Job Applications</h1>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-gray-800 dark:bg-gray-700 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold dark:text-white">{app.name}</h3>
                    <p className="text-gray-400">Applied for: {app.job}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Section */}
          {activeTab === "profile" && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold mb-6 dark:text-white">Your Profile</h1>
              {profileLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : profileError ? (
                <div className="text-red-500 dark:text-red-400">
                  Error loading profile: {profileError}
                </div>
              ) : employerProfile ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4 dark:text-white">Personal Information</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                        <p className="dark:text-white">{employerProfile.full_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="dark:text-white">{employerProfile.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="dark:text-white">{employerProfile.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-4 dark:text-white">Company Information</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Company Name</p>
                        <p className="dark:text-white">{employerProfile.company_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Industry</p>
                        <p className="dark:text-white">{employerProfile.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Branch/Location</p>
                        <p className="dark:text-white">{employerProfile.branch_location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Full Address</p>
                        <p className="dark:text-white">{employerProfile.full_address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button 
                      onClick={() => setEditingProfile(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              ) : null}
              {/* Edit Profile Modal */}
              {editingProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Edit Profile</h2>
                    <form onSubmit={handleProfileUpdate}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={editForm.full_name}
                            onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={editForm.company_name}
                            onChange={(e) => setEditForm({...editForm, company_name: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Industry
                          </label>
                          <input
                            type="text"
                            value={editForm.industry}
                            onChange={(e) => setEditForm({...editForm, industry: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Branch/Location
                          </label>
                          <input
                            type="text"
                            value={editForm.branch_location}
                            onChange={(e) => setEditForm({...editForm, branch_location: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Address
                          </label>
                          <textarea
                            value={editForm.full_address}
                            onChange={(e) => setEditForm({...editForm, full_address: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            rows="3"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setEditingProfile(false)}
                          className="px-4 py-2 border rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                          disabled={updatingProfile}
                        >
                          {updatingProfile ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerHome;