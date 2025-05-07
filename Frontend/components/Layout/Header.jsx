"use client"

function Header({ user, onLogout }) {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-md">
              <svg
                className="w-5 h-5 text-white"
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
            <h1 className="ml-2 text-2xl font-bold text-indigo-600">RideShare</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative">
              <span className="sr-only">View notifications</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          <div className="flex items-center">
            <div className="flex items-center">
              <div className="relative">
                <img
                  className="w-8 h-8 rounded-full border-2 border-indigo-200"
                  src={user.profilePic || "/placeholder.svg?height=32&width=32"}
                  alt={user.name}
                />
                <span className="absolute bottom-0 right-0 block w-2 h-2 bg-green-400 rounded-full ring-2 ring-white"></span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">{user.name}</span>
              <span className="ml-2 px-2 py-1 text-xs font-medium text-white bg-indigo-500 rounded-full capitalize">
                {user.role}
              </span>
            </div>

            <button
              onClick={onLogout}
              className="ml-4 px-3 py-1 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors duration-150"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
