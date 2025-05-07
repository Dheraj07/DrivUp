"use client"

import { useState, useEffect } from "react"

function Earnings({ user }) {
  const [earnings, setEarnings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("week")

  useEffect(() => {
    // Simulate API call to fetch earnings data
    setLoading(true)
    setTimeout(() => {
      const mockEarnings = {
        week: {
          total: 325.75,
          rides: 15,
          hours: 22,
          days: [
            { day: "Mon", amount: 65.25, rides: 3 },
            { day: "Tue", amount: 42.5, rides: 2 },
            { day: "Wed", amount: 85.0, rides: 4 },
            { day: "Thu", amount: 55.75, rides: 3 },
            { day: "Fri", amount: 77.25, rides: 3 },
            { day: "Sat", amount: 0, rides: 0 },
            { day: "Sun", amount: 0, rides: 0 },
          ],
        },
        month: {
          total: 1250.5,
          rides: 58,
          hours: 87,
          weeks: [
            { week: "Week 1", amount: 325.75, rides: 15 },
            { week: "Week 2", amount: 298.25, rides: 14 },
            { week: "Week 3", amount: 345.5, rides: 16 },
            { week: "Week 4", amount: 281.0, rides: 13 },
          ],
        },
        year: {
          total: 15420.75,
          rides: 720,
          hours: 1050,
          months: [
            { month: "Jan", amount: 1250.5, rides: 58 },
            { month: "Feb", amount: 1175.25, rides: 55 },
            { month: "Mar", amount: 1320.0, rides: 62 },
            { month: "Apr", amount: 1280.5, rides: 60 },
            { month: "May", amount: 1350.75, rides: 63 },
            { month: "Jun", amount: 1425.25, rides: 67 },
            { month: "Jul", amount: 1520.5, rides: 71 },
            { month: "Aug", amount: 1475.0, rides: 69 },
            { month: "Sep", amount: 1380.25, rides: 64 },
            { month: "Oct", amount: 1290.75, rides: 60 },
            { month: "Nov", amount: 1225.0, rides: 57 },
            { month: "Dec", amount: 1127.0, rides: 53 },
          ],
        },
      }

      setEarnings(mockEarnings)
      setLoading(false)
    }, 1000)
  }, [timeframe])

  const renderTimeframeData = () => {
    if (!earnings) return null

    const data = earnings[timeframe]
    let items = []
    let itemLabel = ""

    switch (timeframe) {
      case "week":
        items = data.days
        itemLabel = "day"
        break
      case "month":
        items = data.weeks
        itemLabel = "week"
        break
      case "year":
        items = data.months
        itemLabel = "month"
        break
      default:
        items = data.days
        itemLabel = "day"
    }

    const maxAmount = Math.max(...items.map((item) => item.amount))

    return (
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">₹{(data.total * 75).toFixed(2)}</dd>
            </div>
          </div>
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Rides</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{data.rides}</dd>
            </div>
          </div>
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Hours Online</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{data.hours}</dd>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-base font-medium text-gray-900 capitalize">Earnings by {itemLabel}</h4>
          <div className="mt-4">
            <div className="flex items-end">
              {items.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-indigo-600 rounded-t"
                    style={{
                      height: `${(item.amount / maxAmount) * 150}px`,
                      minHeight: item.amount > 0 ? "10px" : "0",
                    }}
                  ></div>
                  <span className="mt-2 text-xs font-medium text-gray-500">{item[itemLabel]}</span>
                  <span className="mt-1 text-xs font-medium text-gray-900">₹{(item.amount * 75).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-base font-medium text-gray-900">Recent Payments</h4>
          <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    May 15, 2023
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Weekly payout</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">₹{(325.75 * 75).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    May 8, 2023
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Weekly payout</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">₹{(298.25 * 75).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    May 1, 2023
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Weekly payout</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">₹{(345.5 * 75).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
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
        <h3 className="text-lg font-medium leading-6 text-gray-900">Earnings</h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">View your earnings and payment history.</p>
      </div>

      <div className="px-4 py-5 border-t border-gray-200 sm:p-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setTimeframe("week")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              timeframe === "week" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              timeframe === "month" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeframe("year")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              timeframe === "year" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            This Year
          </button>
        </div>

        {renderTimeframeData()}
      </div>
    </div>
  )
}

export default Earnings
