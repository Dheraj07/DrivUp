"use client"

import { useState, useEffect, useRef } from "react"

function DriverMapView({ user }) {
  const mapCanvasRef = useRef(null)
  const [driverLocation, setDriverLocation] = useState({ x: 200, y: 150 })
  const [nearbyPassengers, setNearbyPassengers] = useState([
    { id: 1, name: "Alice", location: { x: 100, y: 100 }, distance: "0.5 km" },
    { id: 2, name: "Bob", location: { x: 300, y: 200 }, distance: "1.2 km" },
    { id: 3, name: "Charlie", location: { x: 250, y: 50 }, distance: "0.8 km" },
  ])
  const [selectedPassenger, setSelectedPassenger] = useState(null)
  const animationRef = useRef(null)

  // Initialize the map
  useEffect(() => {
    if (!mapCanvasRef.current) return

    const canvas = mapCanvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    canvas.width = 500
    canvas.height = 400

    // Draw the initial map
    drawMap()

    // Start the animation
    animateMap()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mapCanvasRef, selectedPassenger])

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
    ctx.fillText("YOU", driverLocation.x, driverLocation.y - 15)

    // Draw nearby passengers
    nearbyPassengers.forEach((passenger) => {
      const isSelected = selectedPassenger && selectedPassenger.id === passenger.id

      ctx.fillStyle = isSelected ? "#3b82f6" : "#10b981"
      ctx.beginPath()
      ctx.arc(passenger.location.x, passenger.location.y, isSelected ? 10 : 8, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#fff"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(passenger.name, passenger.location.x, passenger.location.y - 15)

      // Draw line to selected passenger
      if (isSelected) {
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(driverLocation.x, driverLocation.y)
        ctx.lineTo(passenger.location.x, passenger.location.y)
        ctx.stroke()
        ctx.setLineDash([])
      }
    })
  }

  // Animate the map
  const animateMap = () => {
    // Simulate driver movement
    setDriverLocation((prev) => {
      // Random small movement
      const dx = (Math.random() - 0.5) * 2
      const dy = (Math.random() - 0.5) * 2

      // Keep within bounds
      const newX = Math.max(20, Math.min(mapCanvasRef.current.width - 20, prev.x + dx))
      const newY = Math.max(20, Math.min(mapCanvasRef.current.height - 20, prev.y + dy))

      return { x: newX, y: newY }
    })

    // Redraw the map
    drawMap()

    // Continue animation
    animationRef.current = requestAnimationFrame(animateMap)
  }

  const acceptRideRequest = (passenger) => {
    alert(`Ride request from ${passenger.name} accepted! Navigate to pickup location.`)
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Driver Map View</h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">View your location and nearby ride requests.</p>
      </div>

      <div className="px-4 py-5 border-t border-gray-200 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <h4 className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50">Live Map</h4>
              <div className="p-4 bg-gray-100">
                <canvas
                  ref={mapCanvasRef}
                  className="w-full h-auto border border-gray-300 rounded bg-white"
                  style={{ minHeight: "400px" }}
                ></canvas>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-1 bg-red-500 rounded-full"></div>
                    <span>Your Location</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-1 bg-green-500 rounded-full"></div>
                    <span>Nearby Passengers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-1 bg-blue-500 rounded-full"></div>
                    <span>Selected Passenger</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <h4 className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50">Nearby Ride Requests</h4>
              <div className="divide-y divide-gray-200">
                {nearbyPassengers.map((passenger) => (
                  <div
                    key={passenger.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedPassenger && selectedPassenger.id === passenger.id ? "bg-blue-50" : ""}`}
                    onClick={() => setSelectedPassenger(passenger)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{passenger.name}</p>
                          <p className="text-xs text-gray-500">{passenger.distance} away</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          acceptRideRequest(passenger)
                        }}
                        className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 mt-4 border border-gray-200 rounded-lg">
              <h4 className="mb-2 text-sm font-medium text-gray-900">Your Status</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Available for rides</span>
                <div className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600">
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverMapView
