import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#fefaf6] min-h-screen text-black font-sans">
      
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-300">
        <div className="text-xl font-bold">Trackify</div>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Apply/Resources</a>
          <a href="#" className="hover:underline">Profile</a>
          <a href="#" className="hover:underline">Settings</a>
          <a href="#" className="hover:underline">Login</a>
        </nav>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 rounded border border-gray-400 text-sm"
          />
          <span className="text-lg">🔍</span>
          <span className="text-lg">🧑‍🦯</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[60vh] bg-black text-white">
        <div className="flex items-center justify-center text-gray-400 text-xl">
          ILLUSTRATION ACTIVE PART
        </div>
        <div className="flex flex-col justify-center px-10">
          <h1 className="text-4xl font-bold mb-4">
            Track Your Job <br /> Applications with Ease
          </h1>
          <p className="mb-6 text-gray-300">
            Simplify your job search with our intuitive tool designed for college
            students.
          </p>
          <button className="bg-white text-black px-5 py-2 font-semibold rounded">
            Get Started
          </button>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className="bg-[#f8f9fa] px-10 py-16">
        <h2 className="text-3xl font-bold mb-4">Dashboard Overview</h2>
        <p className="text-gray-600 max-w-2xl mb-10">
          A summary dashboard displaying the total number of applications
          submitted, applications in progress, scheduled interviews, offers received,
          and rejections.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="font-bold text-lg">Total Applications</h3>
            <p className="text-sm text-gray-600">
              Track the total number of job applications submitted.
            </p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="font-bold text-lg">Applications in Progress</h3>
            <p className="text-sm text-gray-600">
              Monitor the applications that are currently in progress.
            </p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="font-bold text-lg">Scheduled Interviews</h3>
            <p className="text-sm text-gray-600">
              Stay updated on upcoming interview schedules.
            </p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="font-bold text-lg">Offers Received</h3>
            <p className="text-sm text-gray-600">
              Keep track of job offers received.
            </p>
          </div>
          <div className="bg-white shadow p-4 rounded-xl">
            <h3 className="font-bold text-lg">Rejections</h3>
            <p className="text-sm text-gray-600">
              View the number of job rejections for better insights.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
