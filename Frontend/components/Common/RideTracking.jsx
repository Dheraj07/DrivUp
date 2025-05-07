"use client"

import { useState, useEffect, useRef } from "react"

function RideTracking({ ride, onComplete, isDriver = false }) {
  const [currentStatus, setCurrentStatus] = useState("pickup")
  const [progress, setProgress] = useState(0)
  const [remainingTime, setRemainingTime] = useState(ride.estimatedTime || 10)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRideComplete, setIsRideComplete] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactMessage, setContactMessage] = useState("")
  const [messageSent, setMessageSent] = useState(false)
  const [showCompletionScreen, setShowCompletionScreen] = useState(false)
  const [rating, setRating] = useState(0)
  const [showRealTimeUpdates, setShowRealTimeUpdates] = useState(false)
  const [realTimeMessage, setRealTimeMessage] = useState("")

  // Map and location tracking
  const mapCanvasRef = useRef(null)
  const [driverLocation, setDriverLocation] = useState({ x: 50, y: 250 })
  const [userLocation, setUserLocation] = useState({ x: 150, y: 150 })
  const [destinationLocation, setDestinationLocation] = useState({ x: 350, y: 100 })
  const animationRef = useRef(null)

  // Initialize the map
  useEffect(() => {
    if (!mapCanvasRef.current) return

    const canvas = mapCanvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    canvas.width = 400
    canvas.height = 300

    // Draw the initial map
    drawMap()

    // Start the animation
    animateDriverMovement()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mapCanvasRef])

  // Simulate real-time updates
  useEffect(() => {
    const updates = [
      { progress: 5, message: "Driver is heading to your location" },
      { progress: 20, message: "Driver is 2 minutes away" },
      { progress: 30, message: "Driver has arrived at pickup location" },
      { progress: 40, message: "Your ride has started" },
      { progress: 60, message: "You're halfway to your destination" },
      { progress: 80, message: "Almost there! 2 minutes to destination" },
      { progress: 95, message: "You have arrived at your destination" },
    ]

    const checkForUpdates = () => {
      const currentUpdate = updates.find((update) => progress >= update.progress - 2 && progress <= update.progress + 2)

      if (currentUpdate && currentUpdate.message !== realTimeMessage) {
        setRealTimeMessage(currentUpdate.message)
        setShowRealTimeUpdates(true)

        setTimeout(() => {
          setShowRealTimeUpdates(false)
        }, 5000)
      }
    }

    checkForUpdates()
  }, [progress, realTimeMessage])

  // Draw the map and markers
  const drawMap = () => {
    if (!mapCanvasRef.current) return

    const canvas = mapCanvasRef.current
    const ctx = canvas.getContext("2d")

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw roads (simple grid)
    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 3

    // Horizontal roads
    for (let y = 50; y < canvas.height; y += 100) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Vertical roads
    for (let x = 50; x < canvas.width; x += 100) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Draw user location (blue dot)
    ctx.fillStyle = "#3b82f6"
    ctx.beginPath()
    ctx.arc(userLocation.x, userLocation.y, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#fff"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"
    ctx.fillText("YOU", userLocation.x, userLocation.y - 15)

    // Draw destination (green dot)
    ctx.fillStyle = "#10b981"
    ctx.beginPath()
    ctx.arc(destinationLocation.x, destinationLocation.y, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#fff"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"
    ctx.fillText("DEST", destinationLocation.x, destinationLocation.y - 15)

    // Draw driver location (red car)
    ctx.fillStyle = "#ef4444"
    ctx.beginPath()
    ctx.arc(driverLocation.x, driverLocation.y, 8, 0, Math.PI * 2)
    ctx.fill()

    // Draw a simple car icon
    ctx.fillStyle = "#ef4444"
    ctx.fillRect(driverLocation.x - 10, driverLocation.y - 5, 20, 10)
    ctx.fillRect(driverLocation.x - 7, driverLocation.y - 10, 14, 5)

    ctx.fillStyle = "#fff"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"
    ctx.fillText("DRIVER", driverLocation.x, driverLocation.y - 15)

    // Draw route line
    if (currentStatus === "pickup") {
      // Draw line from driver to user
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(driverLocation.x, driverLocation.y)
      ctx.lineTo(userLocation.x, userLocation.y)
      ctx.stroke()
    } else if (currentStatus === "in_progress") {
      // Draw line from current location to destination
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(driverLocation.x, driverLocation.y)
      ctx.lineTo(destinationLocation.x, destinationLocation.y)
      ctx.stroke()
    }
    ctx.setLineDash([])
  }

  // Animate driver movement
  const animateDriverMovement = () => {
    // Phase 1: Driver moves to user
    if (currentStatus === "pickup") {
      // Move driver towards user
      const dx = userLocation.x - driverLocation.x
      const dy = userLocation.y - driverLocation.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 5) {
        setDriverLocation({
          x: driverLocation.x + (dx / distance) * 2,
          y: driverLocation.y + (dy / distance) * 2,
        })
      } else if (progress < 30) {
        // Driver has reached user, now wait for pickup
        setProgress(30)
        setCurrentStatus("in_progress")
      }
    }
    // Phase 2: Driver and user move to destination
    else if (currentStatus === "in_progress") {
      // Move both driver and user towards destination
      const dx = destinationLocation.x - driverLocation.x
      const dy = destinationLocation.y - driverLocation.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 5) {
        const newDriverLoc = {
          x: driverLocation.x + (dx / distance) * 2,
          y: driverLocation.y + (dy / distance) * 2,
        }
        setDriverLocation(newDriverLoc)
        setUserLocation(newDriverLoc) // User is in the car
      } else if (progress < 90) {
        // Arrived at destination
        setProgress(100)
        setCurrentStatus("arrived")
        setIsRideComplete(true)
      }
    }

    // Redraw the map
    drawMap()

    // Continue animation
    animationRef.current = requestAnimationFrame(animateDriverMovement)
  }

  useEffect(() => {
    // Simulate ride progress
    const totalTime = ride.estimatedTime || 10
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => {
        const newTime = prevTime + 1

        // Calculate progress percentage
        const newProgress = Math.min((newTime / (totalTime * 60)) * 100, 100)
        setProgress(newProgress)

        // Update remaining time
        const newRemainingTime = Math.max(totalTime - Math.floor(newTime / 60), 0)
        setRemainingTime(newRemainingTime)

        // Update ride status based on progress
        if (newProgress < 30) {
          setCurrentStatus("pickup")
        } else if (newProgress < 90) {
          setCurrentStatus("in_progress")
        } else {
          setCurrentStatus("arrived")
          setIsRideComplete(true)
          clearInterval(interval)
        }

        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [ride.estimatedTime])

  const getStatusText = () => {
    switch (currentStatus) {
      case "pickup":
        return isDriver ? "Heading to pickup location" : "Driver is on the way"
      case "in_progress":
        return "Ride in progress"
      case "arrived":
        return "Arrived at destination"
      default:
        return "Tracking ride"
    }
  }

  const completeRide = () => {
    if (isRideComplete && !showCompletionScreen) {
      setShowCompletionScreen(true)

      // Update ride status in local storage
      const savedRides = JSON.parse(localStorage.getItem("rideHistory") || "[]")
      const updatedRides = savedRides.map((savedRide) => {
        if (savedRide.id === ride.id) {
          return { ...savedRide, status: "completed" }
        }
        return savedRide
      })
      localStorage.setItem("rideHistory", JSON.stringify(updatedRides))

      // After 3 seconds, call the onComplete callback
      setTimeout(() => {
        onComplete()
      }, 3000)
    } else {
      onComplete()
    }
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (contactMessage.trim()) {
      setMessageSent(true)
      setTimeout(() => {
        setMessageSent(false)
        setContactMessage("")
        setShowContactModal(false)
      }, 3000)
    }
  }

  const handleRating = (value) => {
    setRating(value)
  }

  if (showCompletionScreen) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Ride Completed!</h3>
            <p className="mt-1 text-sm text-gray-500">Thank you for using our service.</p>

            <div className="mt-6 w-full max-w-md">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Ride Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">From</p>
                    <p className="font-medium">{ride.pickup}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">To</p>
                    <p className="font-medium">{ride.destination}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Distance</p>
                    <p className="font-medium">{ride.distance} km</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fare</p>
                    <p className="font-medium">₹{ride.fare}</p>
                  </div>
                </div>
              </div>
            </div>

            {!isDriver && (
              <div className="mt-6 w-full max-w-md">
                <h4 className="text-sm font-medium text-gray-900 text-center mb-2">Rate your experience</h4>
                <div className="flex items-center justify-center mt-2 space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`text-2xl focus:outline-none ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                      onClick={() => handleRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <div className="mt-4 text-center">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150">
                      Submit Rating
                    </button>
                  </div>
                )}
              </div>
            )}

            <p className="mt-6 text-sm text-gray-500">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6">
        {showRealTimeUpdates && (
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-100 rounded-md flex items-center animate-fadeIn">
            <div className="flex-shrink-0 mr-3">
              <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-indigo-700">{realTimeMessage}</p>
          </div>
        )}

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {isDriver ? "Current Ride" : "Track Your Ride"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isDriver ? "You are driving" : "You are riding with"}{" "}
              {isDriver ? ride.passenger?.name : ride.driver?.name || ride.driver}
            </p>

            <div className="mt-6">
              <div className="overflow-hidden bg-gray-100 rounded-full">
                <div className="h-2 bg-indigo-600 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-900">{getStatusText()}</h4>
                {remainingTime > 0 ? (
                  <p className="text-sm text-gray-500">
                    Estimated time: {remainingTime} {remainingTime === 1 ? "minute" : "minutes"}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">Arrived at destination</p>
                )}
              </div>
            </div>

            <div className="p-4 mt-6 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={
                      isDriver
                        ? ride.passenger?.profilePic || "/placeholder.svg?height=40&width=40"
                        : ride.driver?.profilePic || "/placeholder.svg?height=40&width=40"
                    }
                    alt={isDriver ? ride.passenger?.name || "Passenger" : ride.driver?.name || "Driver"}
                    className="w-12 h-12 rounded-full border-2 border-indigo-100"
                  />
                </div>
                <div className="ml-4">
                  <h5 className="text-sm font-medium text-gray-900">
                    {isDriver ? ride.passenger?.name || "Passenger" : ride.driver?.name || ride.driver}
                  </h5>
                  {!isDriver && ride.driver?.vehicle && (
                    <p className="text-sm text-gray-500">
                      {ride.driver.vehicle} • {ride.driver.licensePlate}
                    </p>
                  )}
                </div>
                <div className="ml-auto">
                  <button
                    className="px-3 py-1 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors duration-150"
                    onClick={() => setShowContactModal(true)}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="mb-6 overflow-hidden border border-gray-200 rounded-lg">
              <h4 className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50">Live Tracking Map</h4>
              <div className="p-4 bg-gray-100">
                <canvas
                  ref={mapCanvasRef}
                  className="w-full h-auto border border-gray-300 rounded bg-white"
                  style={{ maxHeight: "300px" }}
                ></canvas>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-1 bg-blue-500 rounded-full"></div>
                    <span>Your Location</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-1 bg-red-500 rounded-full"></div>
                    <span>Driver</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-1 bg-green-500 rounded-full"></div>
                    <span>Destination</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 text-white bg-indigo-500 rounded-full">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                </div>
                <div className="ml-4">
                  <h5 className="text-sm font-medium text-gray-900">Pickup</h5>
                  <p className="text-sm text-gray-500">{ride.pickup}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 text-white bg-indigo-500 rounded-full">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                </div>
                <div className="ml-4">
                  <h5 className="text-sm font-medium text-gray-900">Destination</h5>
                  <p className="text-sm text-gray-500">{ride.destination}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={completeRide}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 transition-colors duration-150"
              >
                {isDriver ? "Cancel Ride" : "Cancel"}
              </button>

              {isRideComplete && (
                <button
                  onClick={completeRide}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                >
                  {isDriver ? "Complete Ride" : "Rate & Complete"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
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
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-indigo-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Contact {isDriver ? "Passenger" : "Driver"}
                    </h3>
                    <div className="mt-2">
                      {messageSent ? (
                        <div className="p-3 text-sm text-green-700 bg-green-100 rounded">
                          Your message has been sent.
                        </div>
                      ) : (
                        <form onSubmit={handleContactSubmit}>
                          <textarea
                            className="w-full p-2 mb-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            rows="4"
                            placeholder="Type your message here..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
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
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowContactModal(false)}
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

export default RideTracking
