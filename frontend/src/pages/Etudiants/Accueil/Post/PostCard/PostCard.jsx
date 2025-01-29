/* eslint-disable react/prop-types */

import professor from '../../../../../assets/professor.png';
import { Mail, Phone, UserPlus, CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const followedProf = localStorage.getItem("prof");
  const isFollowed = !isNaN(followedProf) && parseInt(followedProf) === post.id;

  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Bannière décorative */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500 to-blue-600" />
      
      {/* Contenu principal */}
      <div className="relative px-6 pt-12 pb-6">
        {/* Section profil */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={professor}
              alt={post.nom}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
            />
            <div className="absolute bottom-4 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{post.nom}</h3>
          <p className="text-base text-gray-600 mb-4">
            {post.langue} {post.icon}
          </p>
        </div>

        {/* Informations de contact */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
            <Phone className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700">{post.telephone}</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
            <Mail className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700">{post.mail}</span>
          </div>
        </div>

        {/* Bouton de suivi */}
        <Link 
          to={isFollowed ? null : "/follow"}
          onClick={() => localStorage.setItem('idFollow', post.id)}
        >
          <button 
            className={`
              w-full py-3 px-6 rounded-xl flex items-center justify-center gap-2
              transition-all duration-300
              ${isFollowed 
                ? 'bg-gray-100 text-gray-600 cursor-default'
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg active:scale-98'
              }
            `}
          >
            {isFollowed ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Déjà suivi</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                <span>Suivre ce prof</span>
              </>
            )}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;