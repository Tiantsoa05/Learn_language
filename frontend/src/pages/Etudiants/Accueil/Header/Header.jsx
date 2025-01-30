import { useEffect, useRef, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogoMessenger } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { House } from 'lucide-react';
import Notifications from "./Notifications/Notifications.jsx";
import { notifications } from "../../../../data/Notifications.js";
import Logo from "../../../../assets/logo.png";

export const Header = () => {
  const [showNotification, setNotification] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [haveProf, setHaveProf] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const prof = localStorage.getItem('prof');

  useEffect(() => {
    const { prof } = localStorage;
    setHaveProf(prof !== null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIconClick = () => setNotification(!showNotification);
  
  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setNotification(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <nav className="relative backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link to="/home" className="flex items-center">
            <img 
              src={Logo} 
              alt="Logo" 
              className="h-12 w-auto transform hover:scale-105 transition-transform"
            />
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Home Icon */}
            {location.pathname !== '/home' && (
              <Link 
                to="/home" 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <House 
                  size={24} 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                />
              </Link>
            )}

            {/* Messenger */}
            {!isNaN(parseInt(prof)) && (
              <div className="relative">
                <Link 
                  to="/messenger" 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <BiLogoMessenger 
                    size={24} 
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  />
                </Link>
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                  7
                </span>
              </div>
            )}

            {/* Notifications */}
            {haveProf && (
              <div className="relative">
                <button
                  onClick={handleIconClick}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <IoNotifications 
                    size={24} 
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  />
                </button>
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
                {showNotification && (
                  <div ref={notificationRef} className="absolute top-12 right-0 z-50">
                    <Notifications />
                  </div>
                )}
              </div>
            )}

            {/* Profile */}
            <Link 
              to="/dashboard" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaUser 
                size={20} 
                className="text-gray-700 hover:text-blue-600 transition-colors"
              />
            </Link>

            {/* Logout Button */}
            {isAuthenticated && (
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg
                         hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Déconnexion
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 transform transition-all">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Confirmer la déconnexion
            </h2>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};