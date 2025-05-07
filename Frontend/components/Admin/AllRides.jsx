"use client"

import { useState, useEffect } from "react"

function AllRides({ user }) {
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const [selectedRide, setSelectedRide] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch rides
    setTimeout(() => {
      const mockRides = [
        {
          id: 3001,
          date: "2023-05-15",
          time: "14:30",
          passenger: "Ananya Sharma",
          driver: "Rajesh Kumar",
          pickup: "123 Main St",
          destination: "456 Elm St",
          fare: "$15.50",
          status: "completed",
        },
        {
          id: 3002,
          date: "2023-05-15",
          time: "15:45",
          passenger: "Vikram Mehta",
          driver: "Priya Singh",
          pickup: "789 Oak Ave",
          destination: "101 Pine St",
          fare: "$22.75",
          status: "in_progress",
        },
        {
          id: 3003,
          date: "2023-05-15",
          time: "16:20",
          passenger: "Neha Gupta",
          driver: "Amit Patel",
          pickup: "202 Maple Dr",
          destination: "303 Cedar Ln",
          fare: "$18.25",
          status: "scheduled",
        },
        {
          id: 3004,
          date: "2023-05-14",
          time: "09:15",
          passenger: "Arjun Reddy",
          driver: "Rajesh Kumar",
          pickup: "404 Birch St",
          destination: "505 Walnut Ave",
          fare: "$12.00",
          status: "completed",
        },
        {
          id: 3005,
          date: "2023-05-14",
          time: "11:30",
          passenger: "Ananya Sharma",
          driver: "Priya Singh",
          pickup: "606 Cherry St",
          destination: "707 Spruce Dr",
          fare: "$25.50",
          status: "cancelled",
        },
        {
          id: 3006,
          date: "2023-05-14",
          time: "13:45",
          passenger: "Vikram Mehta",
          driver: "Amit Patel",
          pickup: "808 Ash Ln",
          destination: "909 Oak Blvd",
          fare: "$19.75",
          status: "completed",
        },
      ]

      setRides(mockRides)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredRides = rides.filter((ride) => {
    const matchesSearch =
      ride.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || ride.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const viewRideDetails = (ride) => {
    setSelectedRide(ride)
    setShowDetailsModal(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">All Rides</h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">View and manage all rides in the system.</p>
      </div>

      <div className="px-4 py-5 border-t border-gray-200 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search by passenger, driver, or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <select
              id="status"
              name="status"
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Date & Time
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Passenger
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Driver
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Route
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Fare
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRides.map((ride) => (
                      <tr key={ride.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                          <div>{ride.date}</div>
                          <div className="text-gray-500">{ride.time}</div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{ride.passenger}</td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{ride.driver}</td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          <div>From: {ride.pickup}</div>
                          <div>To: {ride.destination}</div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {ride.fare.replace("$", "₹")}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                              ride.status,
                            )}`}
                          >
                            {ride.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                          <button
                            onClick={() => viewRideDetails(ride)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDetailsModal && selectedRide && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Ride Details</h3>
                    <div className="mt-4">
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Date</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRide.date}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Time</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRide.time}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Passenger</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRide.passenger}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Driver</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRide.driver}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Pickup</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRide.pickup}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Destination</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRide.destination}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Fare</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRide.fare.replace("$", "₹")}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Status</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                                selectedRide.status,
                              )}`}
                            >
                              {selectedRide.status.replace("_", " ")}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllRides
