"use client"
import AssignedRides from "./AssignedRides"
import UpdateAvailability from "./UpdateAvailability"
import Earnings from "./Earnings"
import DriverProfile from "./DriverProfile"
import DriverMapView from "./DriverMapView"

function DriverDashboard({ user, activeTab, setActiveTab }) {
  const renderContent = () => {
    switch (activeTab) {
      case "assignedRides":
        return <AssignedRides user={user} />
      case "availability":
        return <UpdateAvailability user={user} />
      case "earnings":
        return <Earnings user={user} />
      case "profile":
        return <DriverProfile user={user} />
      case "map":
        return <DriverMapView user={user} />
      default:
        return <AssignedRides user={user} />
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
            <option value="assignedRides">Assigned Rides</option>
            <option value="availability">Update Availability</option>
            <option value="earnings">Earnings</option>
            <option value="profile">Profile</option>
            <option value="map">Map View</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("assignedRides")}
                className={`${
                  activeTab === "assignedRides"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150`}
              >
                Assigned Rides
              </button>
              <button
                onClick={() => setActiveTab("availability")}
                className={`${
                  activeTab === "availability"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150`}
              >
                Update Availability
              </button>
              <button
                onClick={() => setActiveTab("earnings")}
                className={`${
                  activeTab === "earnings"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150`}
              >
                Earnings
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`${
                  activeTab === "profile"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("map")}
                className={`${
                  activeTab === "map"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150`}
              >
                Map View
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="h-full">{renderContent()}</div>
    </div>
  )
}

export default DriverDashboard
