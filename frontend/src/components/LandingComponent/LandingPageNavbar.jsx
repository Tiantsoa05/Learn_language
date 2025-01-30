import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPageNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <>
      <nav className="fixed w-full top-0 z-50 bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img src="/src/assets/logo.png" alt="Logo" className="h-8 w-auto" />
              <span className="text-xl font-semibold text-blue-600 hidden sm:block">Infinity</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Fonctionnalités
              </a>
              <a href="#temoignages" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Avantages
              </a>
            </div>

            {/* Desktop Authentication Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  Déconnexion
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                  >
                    Connexion
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg">
            <div className="px-4 pt-2 pb-3 space-y-2">
              <a
                href="#features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition duration-200"
              >
                Fonctionnalités
              </a>
              <a
                href="#temoignages"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition duration-200"
              >
                Avantages
              </a>
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full px-4 py-2 text-center font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
                  >
                    Déconnexion
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full px-4 py-2 text-center font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
                  >
                    Connexion
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowLogoutModal(false)} />
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Confirmer la déconnexion
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Êtes-vous sûr de vouloir vous déconnecter ?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-200"
                >
                  Déconnexion
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm transition duration-200"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPageNavbar;