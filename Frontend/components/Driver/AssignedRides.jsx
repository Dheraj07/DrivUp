"use client"

import { useState, useEffect } from "react"
import RideTracking from "../Common/RideTracking"

function AssignedRides({ user }) {
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeRide, setActiveRide] = useState(null)
  const [trackingRide, setTrackingRide] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch assigned rides
    setTimeout(() => {
      const mockRides = [
        {
          id: 2001,
          status: "pending",
          passenger: {
            name: "Ananya Sharma",
            rating: 4.7,
            profilePic: "/placeholder.svg?height=40&width=40",
          },
          pickup: "123 Main St",
          destination: "456 Elm St",
          distance: "3.2 km",
          fare: "$15.50",
          estimatedTime: "10 min",
        },
        {
          id: 2002,
          status: "accepted",
          passenger: {
            name: "Vikram Mehta",
            rating: 4.9,
            profilePic: "/placeholder.svg?height=40&width=40",
          },
          pickup: "789 Oak Ave",
          destination: "101 Pine St",
          distance: "5.7 km",
          fare: "$22.75",
          estimatedTime: "15 min",
        },
      ]

      setRides(mockRides)
      setLoading(false)
    }, 1000)
  }, [])

  const acceptRide = (rideId) => {
    setRides(rides.map((ride) => (ride.id === rideId ? { ...ride, status: "accepted" } : ride)))
  }

  const declineRide = (rideId) => {
    setRides(rides.filter((ride) => ride.id !== rideId))
  }

  const startRide = (ride) => {
    setTrackingRide(ride)
  }

  const completeRide = () => {
    setRides(rides.filter((ride) => ride.id !== trackingRide.id))
    setTrackingRide(null)
  }

  const viewRideDetails = (ride) => {
    setActiveRide(ride)
  }

  const closeRideDetails = () => {
    setActiveRide(null)
    setShowDetailsModal(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (trackingRide) {
    return <RideTracking ride={trackingRide} onComplete={completeRide} isDriver={true} />
  }

  if (activeRide) {
    return (
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Ride Details</h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500">
            Ride #{activeRide.id} • {activeRide.status}
          </p>
        </div>
        <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Passenger</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <img
                    src={activeRide.passenger.profilePic || "/placeholder.svg"}
                    alt={activeRide.passenger.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                    <div className="font-medium">{activeRide.passenger.name}</div>
                    <div className="text-gray-500">{activeRide.passenger.rating} ★</div>
                  </div>
                </div>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Pickup</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{activeRide.pickup}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Destination</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{activeRide.destination}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Distance</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{activeRide.distance}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Fare</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{activeRide.fare.replace("$", "₹")}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Estimated Time</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{activeRide.estimatedTime}</dd>
            </div>
          </dl>
        </div>
        <div className="flex justify-between px-4 py-4 border-t border-gray-200 sm:px-6">
          <button
            onClick={closeRideDetails}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back
          </button>
          {activeRide.status === "pending" ? (
            <div className="space-x-3">
              <button
                onClick={() => {
                  declineRide(activeRide.id)
                  setActiveRide(null)
                }}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50"
              >
                Decline
              </button>
              <button
                onClick={() => {
                  acceptRide(activeRide.id)
                  setActiveRide({ ...activeRide, status: "accepted" })
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Accept
              </button>
            </div>
          ) : (
            <button
              onClick={() => startRide(activeRide)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Ride
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Assigned Rides</h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">Your current and upcoming ride assignments.</p>
      </div>

      {rides.length === 0 ? (
        <div className="px-4 py-12 text-center sm:px-6">
          <p className="text-sm text-gray-500">No rides assigned at the moment.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {rides.map((ride) => (
            <li key={ride.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={ride.passenger.profilePic || "/placeholder.svg"}
                    alt={ride.passenger.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{ride.passenger.name}</div>
                    <div className="text-sm text-gray-500">{ride.passenger.rating} ★</div>
                  </div>
                </div>
                <div>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ride.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {ride.status}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <p>From: {ride.pickup}</p>
                    <p>To: {ride.destination}</p>
                  </div>
                  <div className="text-right">
                    <p>{ride.distance}</p>
                    <p>{ride.fare.replace("$", "₹")}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    viewRideDetails(ride)
                    setShowDetailsModal(true)
                  }}
                  className="px-3 py-1 text-xs font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
                >
                  View Details
                </button>
                {ride.status === "pending" ? (
                  <div className="space-x-2">
                    <button
                      onClick={() => declineRide(ride.id)}
                      className="px-3 py-1 text-xs font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => acceptRide(ride.id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Accept
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startRide(ride)}
                    className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Start Ride
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AssignedRides
