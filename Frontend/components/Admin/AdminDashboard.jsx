"use client"
import ManageUsers from "./ManageUsers"
import AllRides from "./AllRides"
import ApproveDrivers from "./ApproveDrivers"

function AdminDashboard({ user, activeTab, setActiveTab }) {
  const renderContent = () => {
    switch (activeTab) {
      case "manageUsers":
        return <ManageUsers user={user} />
      case "allRides":
        return <AllRides user={user} />
      case "approveDrivers":
        return <ApproveDrivers user={user} />
      default:
        return <ManageUsers user={user} />
    }
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="manageUsers">Manage Users</option>
            <option value="allRides">All Rides</option>
            <option value="approveDrivers">Approve Drivers</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("manageUsers")}
                className={`${
                  activeTab === "manageUsers"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150`}
              >
                Manage Users
              </button>
              <button
                onClick={() => setActiveTab("allRides")}
                className={`${
                  activeTab === "allRides"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150`}
              >
                All Rides
              </button>
              <button
                onClick={() => setActiveTab("approveDrivers")}
                className={`${
                  activeTab === "approveDrivers"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150`}
              >
                Approve Drivers
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="h-full">{renderContent()}</div>
    </div>
  )
}

export default AdminDashboard
