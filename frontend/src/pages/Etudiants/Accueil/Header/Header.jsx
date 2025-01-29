import React, { useEffect, useRef, useState } from "react";
import "../Accueil.css"
import { IoNotifications } from "react-icons/io5";
import Logo from "../../../../assets/logo.png"
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Notifications from "./Notifications/Notifications.jsx";
import { notifications } from "../../../../data/Notifications.js";
import { BiLogoMessenger } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {House} from 'lucide-react'

export const Header = () => {
    const [showNotification,setNotification] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [haveProf, setHaveProf] = useState(false)
    const notificationRef = useRef(null)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const prof = (localStorage.getItem('prof'))

    useEffect(()=>{
      const {prof}=localStorage
      setHaveProf((prof!==null))
    },[])

    const handleIconClick = () => {
      if(showNotification){
        setNotification(false);
      }else{
        setNotification(true);
      }
    }

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotification(false);
      }
    }

    const openLogoutModal = () => {
      setIsLogoutModalOpen(true);
    }

    const closeLogoutModal = () => {
      setIsLogoutModalOpen(false);
    }

    const handleLogout = () => {
      localStorage.clear()
      setIsAuthenticated(false)
      setIsLogoutModalOpen(false)
      navigate("/")
    }

    useEffect(() => {
      
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      
    },[])

  return (
    <div className="header flex items-center w-full h-full shadow-md px-4"> 
      <div className="icone">
        <Link to={"/home"}>
          <img src={Logo} alt="img" width={100} className='mt-4'/>
        </Link>
      </div>
      {/* <div className="barre flex-grow mx-4">
        <input 
            type="text" 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Faites vos recherches"
            className="form-control formulaire w-[30vw] h-10 px-3 border rounded focus:outline-none focus:ring focus:ring-blue-300" 
        />
      </div> */}
      <div className="profil flex items-center space-x-6">
        {
          location.pathname !== '/home' &&(
            <div className="home">
              <Link to={"/home"}>
                <House size={38} />
              </Link>
            </div>
          )
        }
        {
          isNaN(parseInt(prof)) ? "" : <div className="messages notif relative">
            <Link to={'/messenger'}>
              <div 
                className="icon-messages"
              >
                <BiLogoMessenger
                    size={34}  
                    className="icon text-black"
                    color="#000"
                />
              </div>
            </Link>
              <span className="absolute top-1/2 right-0 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              7</span>
          </div>
        }
      
        <div className="notif relative cursor-pointer" onClick={handleIconClick}>
        {
            haveProf &&
            <div className="icon-notif">
              <IoNotifications 
                  size={34}  
                  className="icon text-black"
                  color="#000"
              />
            </div>
        }
         
          {
            showNotification && 
            <div ref={notificationRef} className="absolute top-12 right-0 z-10">
              <Notifications/>
            </div>
          }
          <span className="absolute top-1/2 right-0 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >{notifications.length}</span>
        </div>
        <div className="profile-header">
            <Link to={'/dashboard'}>
                <FaUser 
                    size={30} 
                    className="icon text-black"
                    color="#000"
                />
            </Link>
        </div>
        {/* <Link to={"/"}>
          <div className="btn btn-primary btn-deconnect bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:scale-110 transition-transform"
          >Deconnexion</div>
        </Link> */}
        {isAuthenticated && (
          <button
            onClick={openLogoutModal}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Déconnexion
          </button>
        )}
      </div>
      {/* Modal de confirmation */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-800">Confirmer la déconnexion</h2>
            <p className="text-gray-600 mt-2">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeLogoutModal}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};