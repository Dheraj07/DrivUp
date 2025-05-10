"use client"

import { useState } from "react"

function Sidebar({ userRole, onNavigate }) {
  const [activeItem, setActiveItem] = useState(0)

  const getMenuItems = () => {
    switch (userRole) {
      case "passenger":
        return [
          { name: "Dashboard", icon: "home", tab: "bookRide" },
          { name: "Book Ride", icon: "car", tab: "bookRide" },
          { name: "Ride History", icon: "clock", tab: "rideHistory" },
          { name: "Profile", icon: "user", tab: "profile" },
          { name: "Payment Methods", icon: "credit-card", tab: "payment" },
        ]
      case "driver":
        return [
          { name: "Dashboard", icon: "home", tab: "assignedRides" },
          { name: "Assigned Rides", icon: "list", tab: "assignedRides" },
          { name: "Availability", icon: "toggle-left", tab: "availability" },
          { name: "Earnings", icon: "dollar-sign", tab: "earnings" },
          { name: "Map View", icon: "map", tab: "map" },
          { name: "Profile", icon: "user", tab: "profile" },
        ]
      case "admin":
        return [
          { name: "Dashboard", icon: "home", tab: "manageUsers" },
          { name: "Manage Users", icon: "users", tab: "manageUsers" },
          { name: "All Rides", icon: "map", tab: "allRides" },
          { name: "Approve Drivers", icon: "check-circle", tab: "approveDrivers" },
          { name: "Reports", icon: "bar-chart", tab: "reports" },
          { name: "Settings", icon: "settings", tab: "settings" },
        ]
      default:
        return []
    }
  }

  const handleItemClick = (index, tab) => {
    setActiveItem(index)
    if (onNavigate) {
      onNavigate(tab)
    }
  }

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "home":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        )
      case "car":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7h8m-8 5h8m-4 5h4M9.5 4h5a2 2 0 012 2l1 7a2 2 0 01-2 2h-7m-1-3v3m0 0H6a2 2 0 01-2-2v-3m2-2h1.5"
            />
          </svg>
        )
      case "clock":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "user":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )
      case "credit-card":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        )
      case "list":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        )
      case "toggle-left":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 10H7m10 0v4m0-4v-4M7 10v4m0-4V6a4 4 0 014-4h2a4 4 0 014 4v4"
            />
          </svg>
        )
      case "dollar-sign":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "users":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )
      case "map":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        )
      case "check-circle":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "bar-chart":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        )
      case "settings":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        )
    }
  }

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-20 px-4 border-b border-gray-200 bg-gradient-to-r from-indigo-700 to-indigo-500">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <svg
                className="w-7 h-7 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </div>
            <span className="ml-3 text-xl font-bold text-white">DrivUp</span>
          </div>
        </div>

        <div className="px-4 py-4 border-b border-gray-200 bg-indigo-50">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full">
              <span className="text-lg font-medium text-indigo-600">
                {userRole === "passenger" ? "P" : userRole === "driver" ? "D" : "A"}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 capitalize">{userRole} Portal</p>
              <p className="text-xs text-gray-500">Welcome back!</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {getMenuItems().map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(index, item.tab)}
              className={`flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                activeItem === index
                  ? "text-white bg-indigo-600"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <span className={`mr-3 ${activeItem === index ? "text-white" : "text-indigo-400"}`}>
                {renderIcon(item.icon)}
              </span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Need help?</p>
              <button
                onClick={() => {
                  alert("Support team has been notified. We'll contact you shortly.")
                }}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
