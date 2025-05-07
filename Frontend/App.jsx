"use client"

import { useState, useEffect } from "react"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import PassengerDashboard from "./components/Passenger/PassengerDashboard"
import DriverDashboard from "./components/Driver/DriverDashboard"
import AdminDashboard from "./components/Admin/AdminDashboard"
import Header from "./components/Layout/Header"
import Sidebar from "./components/Layout/Sidebar"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPage, setCurrentPage] = useState("login")
  const [activeTab, setActiveTab] = useState(null)

  // Simulate checking for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      setIsAuthenticated(true)

      // Set default active tab based on user role
      if (user.role === "passenger") {
        setActiveTab("bookRide")
      } else if (user.role === "driver") {
        setActiveTab("assignedRides")
      } else if (user.role === "admin") {
        setActiveTab("manageUsers")
      }
    }
  }, [])

  const handleLogin = (user) => {
    setCurrentUser(user)
    setIsAuthenticated(true)
    localStorage.setItem("currentUser", JSON.stringify(user))

    // Set default active tab based on user role
    if (user.role === "passenger") {
      setActiveTab("bookRide")
    } else if (user.role === "driver") {
      setActiveTab("assignedRides")
    } else if (user.role === "admin") {
      setActiveTab("manageUsers")
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")
    setCurrentPage("login")
    setActiveTab(null)
  }

  const handleSidebarNavigation = (tab) => {
    setActiveTab(tab)
  }

  const renderAuthPages = () => {
    if (currentPage === "login") {
      return <Login onLogin={handleLogin} setCurrentPage={setCurrentPage} />
    } else if (currentPage === "register") {
      return <Register setCurrentPage={setCurrentPage} />
    }
  }

  const renderDashboard = () => {
    if (!currentUser) return null

    switch (currentUser.role) {
      case "passenger":
        return <PassengerDashboard user={currentUser} activeTab={activeTab} setActiveTab={setActiveTab} />
      case "driver":
        return <DriverDashboard user={currentUser} activeTab={activeTab} setActiveTab={setActiveTab} />
      case "admin":
        return <AdminDashboard user={currentUser} activeTab={activeTab} setActiveTab={setActiveTab} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <>
          <Header user={currentUser} onLogout={handleLogout} />
          <div className="flex flex-1">
            <Sidebar userRole={currentUser.role} onNavigate={handleSidebarNavigation} />
            <main className="flex-1 p-4 overflow-auto">{renderDashboard()}</main>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white">
          {renderAuthPages()}
        </div>
      )}
    </div>
  )
}

export default App
