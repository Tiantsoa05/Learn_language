/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Globe, 
  BookOpen, 
  Settings, 
  LogOut,
  ChevronDown,
  Bell
} from 'lucide-react';

const Navbar = ({ currentLanguage = null, userProfile = null, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Mes Cours",
      icon: BookOpen,
      dropdownItems: [
        { label: "Cours en cours", href: "#" },
        { label: "Cours terminés", href: "#" },
        { label: "Favoris", href: "#" }
      ]
    },
    {
      label: "Langue",
      icon: Globe,
      dropdownItems: [
        { label: "Français", href: "#" },
        { label: "English", href: "#" },
        { label: "Español", href: "#" }
      ]
    },
    {
      label: "Paramètres",
      icon: Settings,
      dropdownItems: [
        { label: "Profile", href: "#" },
        { label: "Notifications", href: "#" },
        { label: "Sécurité", href: "#" }
      ]
    }
  ];

  const DropdownMenu = ({ items, label, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    let timeoutId = null;

    useEffect(() => {
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, []);

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    };

    return (
      <div 
        ref={dropdownRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className={`flex items-center space-x-1 px-4 py-2 text-gray-700 rounded-md transition-all
            ${isOpen ? 'bg-blue-50 text-blue-600' : 'hover:text-blue-600 hover:bg-blue-50'}`}
        >
          <Icon size={20} />
          <span className="mx-2">{label}</span>
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isOpen && (
          <div 
            className="absolute z-50 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  if (!item.href || item.href === '#') {
                    e.preventDefault();
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  const UserMenu = ({ userProfile, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    let timeoutId = null;

    useEffect(() => {
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, []);

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    };

    return (
      <div 
        ref={menuRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
            ${isOpen ? 'bg-blue-50' : 'hover:bg-blue-50'}`}
        >
          <img
            src={userProfile.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="h-8 w-8 rounded-full border-2 border-blue-500"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              {userProfile.name}
            </span>
          </div>
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div 
            className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium text-gray-700">{userProfile.name}</p>
              <p className="text-xs text-gray-500">{userProfile.email}</p>
            </div>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              Mon Profil
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              Mes Préférences
            </a>
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            {currentLanguage && (
              <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-2xl mr-2">{currentLanguage.icon}</span>
                <span className="text-blue-800 font-medium">{currentLanguage.name}</span>
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation Items */}
            <div className="flex items-center space-x-2">
              {menuItems.map((item, index) => (
                <DropdownMenu
                  key={index}
                  items={item.dropdownItems}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Profile */}
            {userProfile && (
              <UserMenu userProfile={userProfile} onLogout={onLogout} />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <div key={index} className="space-y-1">
                <button className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
                  <item.icon size={20} className="mr-2" />
                  {item.label}
                </button>
                <div className="pl-8 space-y-1">
                  {item.dropdownItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-md"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            
            {userProfile && (
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center px-3 py-2">
                  <img
                    src={userProfile.avatar || "/default-avatar.png"}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full border-2 border-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-700">{userProfile.name}</div>
                    <div className="text-xs text-gray-500">{userProfile.email}</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="mt-2 w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut size={20} className="mr-2" />
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;