"use client"

import { useState, useEffect } from "react"
import BookRide from "./BookRide"
import RideHistory from "./RideHistory"
import PassengerProfile from "./PassengerProfile"

function PassengerDashboard({ user, activeTab, setActiveTab }) {
  const [showContactSupport, setShowContactSupport] = useState(false)
  const [supportMessage, setSupportMessage] = useState("")
  const [supportMessageSent, setSupportMessageSent] = useState(false)
  const [weatherInfo, setWeatherInfo] = useState({ temp: "28°C", condition: "Sunny" })

  useEffect(() => {
    // Simulate fetching weather data
    const conditions = ["Sunny", "Cloudy", "Rainy", "Clear", "Partly Cloudy"]
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
    const randomTemp = Math.floor(Math.random() * 15) + 20

    setWeatherInfo({
      temp: `${randomTemp}°C`,
      condition: randomCondition,
    })
  }, [])

  const handleContactSupport = (e) => {
    e.preventDefault()
    if (supportMessage.trim()) {
      // Simulate sending message to support
      setSupportMessageSent(true)
      setTimeout(() => {
        setSupportMessageSent(false)
        setSupportMessage("")
        setShowContactSupport(false)
      }, 3000)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "bookRide":
        return <BookRide user={user} />
      case "rideHistory":
        return <RideHistory user={user} />
      case "profile":
        return <PassengerProfile user={user} />
      default:
        return <BookRide user={user} />
    }
  }

  return (
    <div className="h-full">
      {/* Welcome Banner */}
      <div className="mb-6 overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-lg rounded-lg">
        <div className="px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">Welcome back, {user.name}!</h2>
              <p className="mt-1 text-indigo-100">Where would you like to go today?</p>
            </div>
            <div className="mt-4 flex items-center md:mt-0">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <svg className="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6c0 1.887.87 3.568 2.23 4.663l3.77 3.37 3.77-3.37A6 6 0 0010 2zm0 9a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">{weatherInfo.temp}</p>
                  <p className="text-xs text-indigo-100">{weatherInfo.condition}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="bookRide">Book a Ride</option>
            <option value="rideHistory">Ride History</option>
            <option value="profile">Profile</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("bookRide")}
                className={`${
                  activeTab === "bookRide"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 flex items-center`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7h8m-8 5h8m-4 5h4M9.5 4h5a2 2 0 012 2l1 7a2 2 0 01-2 2h-7m-1-3v3m0 0H6a2 2 0 01-2-2v-3m2-2h1.5"
                  />
                </svg>
                Book a Ride
              </button>
              <button
                onClick={() => setActiveTab("rideHistory")}
                className={`${
                  activeTab === "rideHistory"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 flex items-center`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Ride History
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`${
                  activeTab === "profile"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 flex items-center`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="h-full">{renderContent()}</div>

      {/* Quick Actions */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => setShowContactSupport(!showContactSupport)}
          className="flex items-center justify-center w-12 h-12 text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 transform hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      </div>

      {showContactSupport && (
        <div className="fixed bottom-20 right-4 w-80 p-4 bg-white rounded-lg shadow-xl border border-indigo-100 animate-fadeIn z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Contact Support</h3>
            <button onClick={() => setShowContactSupport(false)} className="text-gray-400 hover:text-gray-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {supportMessageSent ? (
            <div className="p-3 text-sm text-green-700 bg-green-100 rounded">
              Your message has been sent. Our support team will get back to you shortly.
            </div>
          ) : (
            <form onSubmit={handleContactSupport}>
              <textarea
                className="w-full p-2 mb-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
                placeholder="How can we help you?"
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default PassengerDashboard
