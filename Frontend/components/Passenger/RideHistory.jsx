"use client"

import { useState, useEffect } from "react"

function RideHistory({ user }) {
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all") // all, completed, cancelled
  const [selectedRide, setSelectedRide] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    // First check localStorage for any recently booked rides
    const localRides = JSON.parse(localStorage.getItem("rideHistory") || "[]")

    // Simulate API call to fetch ride history
    setTimeout(() => {
      const mockRides = [
        {
          id: 1001,
          date: "2023-05-15",
          time: "14:30",
          pickup: "123 Main St",
          destination: "456 Elm St",
          driver: "Rajesh Kumar",
          fare: "$15.50",
          status: "completed",
        },
        {
          id: 1002,
          date: "2023-05-12",
          time: "09:15",
          pickup: "789 Oak Ave",
          destination: "101 Pine St",
          driver: "Priya Singh",
          fare: "$22.75",
          status: "completed",
        },
        {
          id: 1003,
          date: "2023-05-10",
          time: "18:45",
          pickup: "202 Maple Dr",
          destination: "303 Cedar Ln",
          driver: "Amit Patel",
          fare: "$18.25",
          status: "completed",
        },
        {
          id: 1004,
          date: "2023-05-08",
          time: "11:30",
          pickup: "404 Birch St",
          destination: "505 Walnut Ave",
          driver: "Sunita Sharma",
          fare: "$12.00",
          status: "cancelled",
        },
        {
          id: 1005,
          date: "2023-05-05",
          time: "20:15",
          pickup: "606 Cherry St",
          destination: "707 Spruce Dr",
          driver: "Rahul Verma",
          fare: "$25.50",
          status: "completed",
        },
      ]

      // Combine local rides with mock rides, avoiding duplicates
      const combinedRides = [...localRides]

      // Add mock rides that don't exist in local rides
      mockRides.forEach((mockRide) => {
        if (!combinedRides.some((ride) => ride.id === mockRide.id)) {
          combinedRides.push(mockRide)
        }
      })

      // Sort by date and time (most recent first)
      combinedRides.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time || "00:00"}`)
        const dateB = new Date(`${b.date} ${b.time || "00:00"}`)
        return dateB - dateA
      })

      setRides(combinedRides)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredRides = filter === "all" ? rides : rides.filter((ride) => ride.status === filter)

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
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Ride History</h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500">Your past rides and bookings.</p>
        </div>
        <div>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Rides</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="confirmed">Upcoming</option>
          </select>
        </div>
      </div>

      {filteredRides.length === 0 ? (
        <div className="px-4 py-12 text-center sm:px-6">
          <p className="text-sm text-gray-500">No rides found matching your filter.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Date & Time
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Route
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Driver
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Fare
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRides.map((ride) => (
                      <tr key={ride.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{ride.date}</div>
                          <div className="text-sm text-gray-500">{ride.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{ride.pickup}</div>
                          <div className="text-sm text-gray-500">to {ride.destination}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{ride.driver?.name || ride.driver}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {typeof ride.fare === "string"
                              ? ride.fare.replace("$", "₹")
                              : `₹${(ride.fare * 75).toFixed(2)}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              ride.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : ride.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {ride.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => viewRideDetails(ride)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
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
      )}
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
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
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
                          <dt className="text-sm font-medium text-gray-500">Pickup</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRide.pickup}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Destination</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedRide.destination}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Driver</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {selectedRide.driver?.name || selectedRide.driver}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Fare</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {typeof selectedRide.fare === "string"
                              ? selectedRide.fare.replace("$", "₹")
                              : `₹${(selectedRide.fare * 75).toFixed(2)}`}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Status</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                selectedRide.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : selectedRide.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {selectedRide.status}
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

export default RideHistory
