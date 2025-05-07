"use client"

import { useState } from "react"

function UpdateAvailability({ user }) {
  const [isAvailable, setIsAvailable] = useState(true)
  const [workingHours, setWorkingHours] = useState({
    monday: { start: "09:00", end: "17:00", active: true },
    tuesday: { start: "09:00", end: "17:00", active: true },
    wednesday: { start: "09:00", end: "17:00", active: true },
    thursday: { start: "09:00", end: "17:00", active: true },
    friday: { start: "09:00", end: "17:00", active: true },
    saturday: { start: "10:00", end: "15:00", active: false },
    sunday: { start: "10:00", end: "15:00", active: false },
  })
  const [successMessage, setSuccessMessage] = useState("")

  const handleAvailabilityToggle = () => {
    setIsAvailable(!isAvailable)

    // Simulate API call to update availability
    setSuccessMessage(`You are now ${!isAvailable ? "available" : "unavailable"} for new rides.`)

    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const handleHoursChange = (day, field, value) => {
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [field]: value,
      },
    })
  }

  const handleDayToggle = (day) => {
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        active: !workingHours[day].active,
      },
    })
  }

  const saveSchedule = () => {
    // Simulate API call to save schedule
    setSuccessMessage("Your schedule has been updated successfully.")

    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Availability Settings</h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">Manage your availability and working hours.</p>
      </div>

      {successMessage && (
        <div className="px-4 py-3 text-sm font-medium text-green-800 bg-green-100 sm:px-6">{successMessage}</div>
      )}

      <div className="px-4 py-5 border-t border-gray-200 sm:p-6">
        <div className="mb-6">
          <h4 className="text-base font-medium text-gray-900">Current Status</h4>
          <div className="flex items-center mt-4">
            <button
              onClick={handleAvailabilityToggle}
              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isAvailable ? "bg-indigo-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`${
                  isAvailable ? "translate-x-5" : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
              ></span>
            </button>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {isAvailable ? "Available for rides" : "Not available for rides"}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-base font-medium text-gray-900">Weekly Schedule</h4>
          <p className="mt-1 text-sm text-gray-500">Set your regular working hours for each day of the week.</p>

          <div className="mt-4 space-y-4">
            {Object.entries(workingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center">
                <div className="w-24 text-sm font-medium text-gray-900 capitalize">{day}</div>
                <div className="flex items-center ml-4">
                  <button
                    onClick={() => handleDayToggle(day)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      hours.active ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`${
                        hours.active ? "translate-x-5" : "translate-x-0"
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    ></span>
                  </button>
                </div>

                {hours.active && (
                  <div className="flex items-center ml-6 space-x-2">
                    <input
                      type="time"
                      value={hours.start}
                      onChange={(e) => handleHoursChange(day, "start", e.target.value)}
                      className="block w-24 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <span className="text-sm text-gray-500">to</span>
                    <input
                      type="time"
                      value={hours.end}
                      onChange={(e) => handleHoursChange(day, "end", e.target.value)}
                      className="block w-24 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={saveSchedule}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateAvailability
