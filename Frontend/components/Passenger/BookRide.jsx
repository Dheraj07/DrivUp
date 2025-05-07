"use client"

import { useState, useEffect } from "react"
import RideTracking from "../Common/RideTracking"

function BookRide({ user }) {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [rideType, setRideType] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [bookingState, setBookingState] = useState("initial") // initial, searching, confirmed, tracking
  const [currentRide, setCurrentRide] = useState(null)
  const [savedLocations, setSavedLocations] = useState([
    { name: "Home", address: "123 Home Street" },
    { name: "Work", address: "456 Office Building" },
    { name: "Gym", address: "789 Fitness Center" },
  ])

  // Fare estimation
  const [distance, setDistance] = useState(0)
  const [estimatedFare, setEstimatedFare] = useState(null)
  const [estimating, setEstimating] = useState(false)

  // Popular destinations
  const [popularDestinations, setPopularDestinations] = useState([
    { name: "Airport", address: "International Airport Terminal 1", icon: "✈️" },
    { name: "Mall", address: "City Center Mall", icon: "🛍️" },
    { name: "Station", address: "Central Railway Station", icon: "🚉" },
  ])

  // Calculate fare based on ride type and distance
  const calculateFare = (distance, type) => {
    const baseRates = {
      standard: 187.5, // 2.5 USD * 75 INR
      premium: 262.5, // 3.5 USD * 75 INR
      shared: 135, // 1.8 USD * 75 INR
    }

    const baseRate = baseRates[type] || baseRates.standard
    const distanceRate = distance * 112.5 // 1.5 USD * 75 INR
    const fare = baseRate + distanceRate

    // Add surge pricing during peak hours (8-10 AM, 5-7 PM)
    const now = new Date()
    const hour = now.getHours()
    const isPeakHour = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19)
    const surgeFactor = isPeakHour ? 1.25 : 1

    return (fare * surgeFactor).toFixed(2)
  }

  // Estimate fare when pickup, destination, or ride type changes
  useEffect(() => {
    if (pickup && destination) {
      setEstimating(true)

      // Simulate API call to get distance between locations
      setTimeout(() => {
        // Generate a realistic distance based on the length of the addresses
        const simulatedDistance = (((pickup.length + destination.length) % 10) + Math.random() * 5).toFixed(1)

        setDistance(Number.parseFloat(simulatedDistance))
        setEstimatedFare(calculateFare(Number.parseFloat(simulatedDistance), rideType))
        setEstimating(false)
      }, 800)
    } else {
      setEstimatedFare(null)
    }
  }, [pickup, destination, rideType])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!pickup || !destination) {
      return
    }

    setBookingState("searching")

    // Simulate finding a driver
    setTimeout(() => {
      const indianDrivers = [
        {
          id: 123,
          name: "Rajesh Kumar",
          rating: 4.8,
          vehicle: "Maruti Swift",
          licensePlate: "DL 01 AB 1234",
          profilePic: "/placeholder.svg?height=50&width=50",
        },
        {
          id: 124,
          name: "Priya Singh",
          rating: 4.9,
          vehicle: "Hyundai i20",
          licensePlate: "MH 02 CD 5678",
          profilePic: "/placeholder.svg?height=50&width=50",
        },
        {
          id: 125,
          name: "Amit Patel",
          rating: 4.7,
          vehicle: "Tata Nexon",
          licensePlate: "KA 03 EF 9012",
          profilePic: "/placeholder.svg?height=50&width=50",
        },
        {
          id: 126,
          name: "Sunita Sharma",
          rating: 4.6,
          vehicle: "Honda City",
          licensePlate: "TN 04 GH 3456",
          profilePic: "/placeholder.svg?height=50&width=50",
        },
      ]

      const randomDriver = indianDrivers[Math.floor(Math.random() * indianDrivers.length)]

      const ride = {
        id: Math.floor(Math.random() * 10000),
        pickup,
        destination,
        rideType,
        paymentMethod,
        driver: randomDriver,
        fare: estimatedFare || Math.floor(Math.random() * 20) + 10,
        currency: "₹",
        estimatedTime: Math.floor(Math.random() * 10) + 5,
        distance: distance || (Math.random() * 10).toFixed(1),
        bookingTime: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        status: "confirmed",
      }

      setCurrentRide(ride)
      setBookingState("confirmed")

      // Save ride to local storage for history
      const savedRides = JSON.parse(localStorage.getItem("rideHistory") || "[]")
      localStorage.setItem("rideHistory", JSON.stringify([ride, ...savedRides]))
    }, 2000)
  }

  const startRide = () => {
    setBookingState("tracking")
  }

  const cancelRide = () => {
    setBookingState("initial")
    setCurrentRide(null)
  }

  const handleSavedLocationSelect = (location, type) => {
    if (type === "pickup") {
      setPickup(location.address)
    } else {
      setDestination(location.address)
    }
  }

  const renderBookingForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Book Your Ride</h3>
          <p className="text-sm text-gray-600">Enter your pickup and destination to get started</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4">
                <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="pickup"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    required
                  />
                </div>
                {savedLocations.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {savedLocations.map((location, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSavedLocationSelect(location, "pickup")}
                        className="inline-flex items-center px-2.5 py-1.5 border border-indigo-200 shadow-sm text-xs font-medium rounded text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                      >
                        {location.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="destination"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
                {savedLocations.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {savedLocations.map((location, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSavedLocationSelect(location, "destination")}
                        className="inline-flex items-center px-2.5 py-1.5 border border-indigo-200 shadow-sm text-xs font-medium rounded text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                      >
                        {location.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="rideType" className="block text-sm font-medium text-gray-700 mb-1">
                    Ride Type
                  </label>
                  <select
                    id="rideType"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={rideType}
                    onChange={(e) => setRideType(e.target.value)}
                  >
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="shared">Shared</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Credit Card</option>
                    <option value="wallet">Wallet</option>
                    <option value="upi">UPI</option>
                  </select>
                </div>
              </div>

              {estimatedFare && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <h4 className="text-sm font-medium text-indigo-800">Fare Estimate</h4>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-indigo-600">Distance</p>
                      <p className="text-sm font-medium">{distance} km</p>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-600">Estimated Fare</p>
                      <p className="text-sm font-medium">₹{estimatedFare}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Prices may vary due to traffic, weather, and other factors
                  </p>
                </div>
              )}

              {estimating && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center">
                  <div className="w-4 h-4 border-2 border-t-2 border-indigo-500 rounded-full animate-spin mr-2"></div>
                  <p className="text-sm text-gray-500">Calculating fare estimate...</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                >
                  Book Ride
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            {/* Popular destinations */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Destinations</h4>
              <div className="grid grid-cols-1 gap-3">
                {popularDestinations.map((dest, index) => (
                  <button
                    key={index}
                    onClick={() => setDestination(dest.address)}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span className="text-xl mr-2">{dest.icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800">{dest.name}</p>
                      <p className="text-xs text-gray-500 truncate">{dest.address}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add a map preview placeholder */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Route Preview</h4>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-sm">Map preview will appear here</p>
              </div>
              <p className="mt-2 text-xs text-gray-500">A detailed map will be shown after booking</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSearching = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center py-12 border border-gray-100">
        <div className="w-16 h-16 border-4 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">Finding you a driver...</h3>
        <p className="mt-1 text-sm text-gray-500">This usually takes 1-2 minutes</p>
        <div className="mt-6 w-full max-w-md bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Searching nearby drivers</p>
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse delay-100"></span>
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse delay-200"></span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full w-3/4 animate-pulse"></div>
          </div>
        </div>
        <button
          onClick={cancelRide}
          className="mt-6 px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors duration-150"
        >
          Cancel
        </button>
      </div>
    )
  }

  const renderConfirmed = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-600 to-indigo-700">
          <h3 className="text-lg font-medium leading-6 text-white">Ride Confirmed!</h3>
          <p className="max-w-2xl mt-1 text-sm text-indigo-100">Your driver is on the way.</p>
        </div>
        <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Driver</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <img
                    src={currentRide.driver.profilePic || "/placeholder.svg"}
                    alt={currentRide.driver.name}
                    className="w-10 h-10 rounded-full border-2 border-indigo-100"
                  />
                  <div className="ml-4">
                    <div className="font-medium">{currentRide.driver.name}</div>
                    <div className="text-gray-500">
                      {currentRide.driver.rating} ★ • {currentRide.driver.vehicle} • {currentRide.driver.licensePlate}
                    </div>
                  </div>
                </div>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Pickup</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentRide.pickup}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Destination</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentRide.destination}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Fare</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{currentRide.fare}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Estimated Time</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentRide.estimatedTime} minutes</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Distance</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentRide.distance} km</dd>
            </div>
          </dl>
        </div>
        <div className="flex justify-between px-4 py-4 border-t border-gray-200 sm:px-6 bg-gray-50">
          <button
            onClick={cancelRide}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 transition-colors duration-150"
          >
            Cancel Ride
          </button>
          <button
            onClick={startRide}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
          >
            Track Ride
          </button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (bookingState) {
      case "initial":
        return renderBookingForm()
      case "searching":
        return renderSearching()
      case "confirmed":
        return renderConfirmed()
      case "tracking":
        return <RideTracking ride={currentRide} onComplete={cancelRide} />
      default:
        return renderBookingForm()
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white shadow sm:rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Book a Ride</h3>
          <p className="mt-1 text-sm text-gray-500">Enter your pickup location and destination to get started.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">{renderContent()}</div>
      </div>
    </div>
  )
}

export default BookRide
