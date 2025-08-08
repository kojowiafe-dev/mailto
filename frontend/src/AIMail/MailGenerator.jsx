import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import {
  FiMenu,
  FiLogOut,
  FiUser,
  FiClock,
  FiGrid,
  FiSettings,
  FiMail,
  FiFileText,
} from "react-icons/fi";

// Sidebar Items
const sidebarItems = [
  { label: "Dashboard", icon: <FiGrid />, to: "/dashboard" },
  { label: "Mail Generator", icon: <FiMail />, to: "/mail" },
  { label: "Templates", icon: <FiFileText />, to: "/templates" },
  { label: "Profile", icon: <FiUser />, to: "/profile" },
  { label: "History", icon: <FiClock />, to: "/history" },
  { label: "Settings", icon: <FiSettings />, to: "/settings" },
  { label: "Logout", icon: <FiLogOut />, to: "/logout" },
];

// Sidebar Component
const ProfileSidebar = ({ isOpen, onClose, onSelect }) => (
  <aside
    className={`fixed top-0 left-0 h-full w-64 bg-black text-white shadow-xl z-30 transition-transform duration-300 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0 md:static md:block`}
  >
    {/* Mobile Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 md:hidden">
      <span className="text-xl font-bold text-cyan-500">Menu</span>
      <button onClick={onClose} className="text-white">
        <FiMenu size={24} />
      </button>
    </div>
    {/* Sidebar Navigation */}
    <nav className="mt-8 space-y-2 px-4">
      {sidebarItems.map((item) =>
        item.to ? (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-cyan-500 hover:text-black transition-all duration-200"
            onClick={() => onSelect(item.label)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ) : (
          <span
            key={item.label}
            className="flex items-center w-full px-4 py-2 rounded-lg text-gray-400"
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </span>
        )
      )}
    </nav>
  </aside>
);

// Header Component
const ProfileHeader = ({ userName, onMenuClick }) => (
  <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 sticky top-0 z-20">
    <div className="flex items-center gap-4">
      <button className="md:hidden text-gray-700" onClick={onMenuClick}>
        <FiMenu size={28} />
      </button>
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome, <span className="text-cyan-500">{userName}</span>
      </h1>
    </div>
  </header>
);

// Profile Content
const ProfileContent = ({ user }) => (
  <main className="flex-1 px-6 py-8 bg-gray-950 text-white min-h-[calc(100vh-64px)]">
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Details */}
      <div className="bg-black rounded-xl shadow p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-cyan-500 mb-4">
          Profile Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileField label="Name" value={user.name} />
          <ProfileField label="Email" value={user.email} />
          <ProfileField label="Role" value={user.role} />
          <ProfileField label="Joined" value={user.joined} />
          <ProfileField label="Phone" value={user.phone} />
          <ProfileField label="Location" value={user.location} />
        </div>
      </div>

      {/* Prompt Generator Section */}
      <div className="bg-black rounded-xl shadow p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-cyan-500 mb-4">
          AI Prompt Generator
        </h2>
        <textarea
          className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-cyan-500"
          placeholder="Type your prompt here..."
          rows={4}
        />
        <button className="mt-4 bg-cyan-500 text-black px-6 py-2 rounded-lg hover:bg-cyan-400 transition-colors">
          Generate
        </button>
      </div>
    </div>
  </main>
);

const ProfileField = ({ label, value }) => (
  <div>
    <span className="font-medium text-gray-400">{label}:</span>
    <div className="text-white">{value}</div>
  </div>
);

// Footer Component
const ProfileFooter = () => (
  <footer className="w-full bg-black text-white text-center py-4 mt-auto border-t border-gray-800">
    &copy; {new Date().getFullYear()} Eventus. All rights reserved.
  </footer>
);

// Main Page
const MailGenerator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Profile");

  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    role: "Administrator",
    joined: "March 15, 2023",
    phone: "+233 55 123 4567",
    location: "Accra, Ghana",
  };

  // Content for each sidebar route
  const renderContent = () => {
    switch (selectedPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Mail Generator":
        return (
          <main className="flex-1 px-6 py-8 bg-gray-950 text-white min-h-[calc(100vh-64px)]">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Mail Generator</h2>
              <p className="mb-6 text-gray-300">
                Generate AI-powered emails quickly and easily.
              </p>
              {/* Add your mail generator form or logic here */}
            </div>
          </main>
        );
      case "Templates":
        return (
          <main className="flex-1 px-6 py-8 bg-gray-950 text-white min-h-[calc(100vh-64px)]">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Templates</h2>
              <p className="mb-6 text-gray-300">
                Manage and create reusable email templates.
              </p>
            </div>
          </main>
        );
      case "Profile":
        return <ProfileContent user={user} />;
      case "History":
        return (
          <main className="flex-1 px-6 py-8 bg-gray-950 text-white min-h-[calc(100vh-64px)]">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">History</h2>
              <p className="mb-6 text-gray-300">
                View your previously generated emails and activity.
              </p>
            </div>
          </main>
        );
      case "Settings":
        return (
          <main className="flex-1 px-6 py-8 bg-gray-950 text-white min-h-[calc(100vh-64px)]">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="mb-6 text-gray-300">
                Adjust your preferences and account settings.
              </p>
            </div>
          </main>
        );
      case "Logout":
        return (
          <main className="flex-1 px-6 py-8 bg-gray-950 text-white min-h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Logout</h2>
              <p className="mb-6 text-gray-300">
                You have been logged out. See you next time!
              </p>
              {/* Add logout logic or redirect here */}
            </div>
          </main>
        );
      default:
        return <ProfileContent user={user} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ProfileHeader
        userName={user.name}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <div className="flex flex-1">
        {/* Sidebar */}
        <ProfileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSelect={setSelectedPage}
        />
        {/* Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        {/* Main Content */}
        {renderContent()}
      </div>
      <ProfileFooter />
    </div>
  );
};

export default MailGenerator;
