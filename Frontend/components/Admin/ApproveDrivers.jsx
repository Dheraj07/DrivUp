"use client"

import { useState, useEffect } from "react"

function ApproveDrivers({ user }) {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch pending driver applications
    setTimeout(() => {
      const mockDrivers = [
        {
          id: 4001,
          name: "Rahul Verma",
          email: "rahul@example.com",
          phone: "555-123-4567",
          appliedDate: "2023-05-10",
          vehicle: {
            make: "Maruti",
            model: "Swift",
            year: "2019",
            color: "Silver",
            licensePlate: "DL 01 AB 1234",
          },
          documents: [
            { name: "Driver's License", status: "verified" },
            { name: "Vehicle Registration", status: "pending" },
            { name: "Insurance", status: "verified" },
          ],
          status: "pending",
        },
        {
          id: 4002,
          name: "Meera Kapoor",
          email: "meera@example.com",
          phone: "555-987-6543",
          appliedDate: "2023-05-12",
          vehicle: {
            make: "Hyundai",
            model: "i20",
            year: "2020",
            color: "Blue",
            licensePlate: "MH 02 CD 5678",
          },
          documents: [
            { name: "Driver's License", status: "verified" },
            { name: "Vehicle Registration", status: "verified" },
            { name: "Insurance", status: "verified" },
          ],
          status: "pending",
        },
        {
          id: 4003,
          name: "Suresh Iyer",
          email: "suresh@example.com",
          phone: "555-456-7890",
          appliedDate: "2023-05-14",
          vehicle: {
            make: "Tata",
            model: "Nexon",
            year: "2018",
            color: "Red",
            licensePlate: "KA 03 EF 9012",
          },
          documents: [
            { name: "Driver's License", status: "pending" },
            { name: "Vehicle Registration", status: "pending" },
            { name: "Insurance", status: "verified" },
          ],
          status: "pending",
        },
      ]

      setDrivers(mockDrivers)
      setLoading(false)
    }, 1000)
  }, [])

  const approveDriver = (driverId) => {
    setDrivers(drivers.map((driver) => (driver.id === driverId ? { ...driver, status: "approved" } : driver)))
  }

  const rejectDriver = (driverId) => {
    setDrivers(drivers.map((driver) => (driver.id === driverId ? { ...driver, status: "rejected" } : driver)))
  }

  const getDocumentStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
        <h3 className="text-lg font-medium leading-6 text-gray-900">Driver Applications</h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">Review and approve driver applications.</p>
      </div>

      <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
        {drivers.length === 0 ? (
          <div className="px-4 py-12 text-center sm:px-6">
            <p className="text-sm text-gray-500">No pending driver applications.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {drivers.map((driver) => (
              <li key={driver.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{driver.name}</h4>
                    <p className="text-sm text-gray-500">Applied on {driver.appliedDate}</p>
                  </div>
                  <div>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        driver.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : driver.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {driver.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Contact Information</h5>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Email: {driver.email}</p>
                      <p>Phone: {driver.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Vehicle Information</h5>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>
                        {driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model}, {driver.vehicle.color}
                      </p>
                      <p>License Plate: {driver.vehicle.licensePlate}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-900">Documents</h5>
                  <ul className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                    {driver.documents.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-500">{doc.name}</span>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDocumentStatusBadge(
                            doc.status,
                          )}`}
                        >
                          {doc.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {driver.status === "pending" && (
                  <div className="flex justify-end mt-4 space-x-3">
                    <button
                      onClick={() => rejectDriver(driver.id)}
                      className="px-3 py-1 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => approveDriver(driver.id)}
                      className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ApproveDrivers
