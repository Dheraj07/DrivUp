"use client"

import { useState } from "react"

function Login({ onLogin, setCurrentPage }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("passenger")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    // Simulate authentication
    // In a real app, this would be an API call
    setTimeout(() => {
      const user = {
        id: Math.floor(Math.random() * 1000),
        email,
        role,
        name: email.split("@")[0],
        profilePic: "/placeholder.svg?height=40&width=40",
      }
      setIsLoading(false)
      onLogin(user)
    }, 1000)
  }

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
        </div>
        <h1 className="mt-2 text-4xl font-bold text-indigo-600">DrivUp</h1>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Sign in to your account</h2>
      </div>

      {error && <div className="p-3 text-sm text-red-500 bg-red-100 rounded">{error}</div>}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Login as
          </label>
          <select
            id="role"
            name="role"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
          >
            {isLoading ? (
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => setCurrentPage("register")}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
