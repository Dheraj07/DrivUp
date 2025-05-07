"use client"

import { useState, useEffect } from "react"

function ManageUsers({ user }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  useEffect(() => {
    // Simulate API call to fetch users
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          name: "Ananya Sharma",
          email: "ananya@example.com",
          role: "passenger",
          status: "active",
          joined: "2023-01-15",
          rides: 24,
        },
        {
          id: 2,
          name: "Vikram Mehta",
          email: "vikram@example.com",
          role: "passenger",
          status: "active",
          joined: "2023-02-20",
          rides: 15,
        },
        {
          id: 3,
          name: "Rajesh Kumar",
          email: "rajesh@example.com",
          role: "driver",
          status: "active",
          joined: "2023-01-10",
          rides: 87,
        },
        {
          id: 4,
          name: "Priya Singh",
          email: "priya@example.com",
          role: "driver",
          status: "inactive",
          joined: "2023-03-05",
          rides: 32,
        },
        {
          id: 5,
          name: "Arjun Reddy",
          email: "arjun@example.com",
          role: "passenger",
          status: "active",
          joined: "2023-04-12",
          rides: 8,
        },
        {
          id: 6,
          name: "Sunita Sharma",
          email: "sunita@example.com",
          role: "driver",
          status: "active",
          joined: "2023-02-28",
          rides: 65,
        },
        {
          id: 7,
          name: "Karan Malhotra",
          email: "karan@example.com",
          role: "passenger",
          status: "inactive",
          joined: "2023-03-15",
          rides: 3,
        },
      ]

      setUsers(mockUsers)
      setLoading(false)
    }, 1000)
  }, [])

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole

    return matchesSearch && matchesRole
  })

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
        <h3 className="text-lg font-medium leading-6 text-gray-900">Manage Users</h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">View and manage all users in the system.</p>
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
                placeholder="Search by name or email"
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
              id="role"
              name="role"
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="passenger">Passengers</option>
              <option value="driver">Drivers</option>
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
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Role
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Joined
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Rides
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                          {user.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{user.email}</td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">{user.role}</td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{user.joined}</td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{user.rides}</td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                          {user.status === "active" ? (
                            <button
                              onClick={() => handleStatusChange(user.id, "inactive")}
                              className="text-red-600 hover:text-red-900"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(user.id, "active")}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Activate
                            </button>
                          )}
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
    </div>
  )
}

export default ManageUsers
