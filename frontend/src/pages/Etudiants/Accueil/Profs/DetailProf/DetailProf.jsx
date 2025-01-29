/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import professor from '../../../../../assets/professor.png';

const DetailProf = ({ prof, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg relative flex flex-col max-h-[90vh]">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl h-8 w-8 flex items-center justify-center"
        >
          ×
        </button>

        {/* Zone de défilement */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* En-tête avec image */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <img
                src={professor}
                alt="image"
                className="rounded-full w-32 h-32 object-cover border-4 border-blue-500 shadow-md"
              />
            </div>

            <div className="text-center space-y-2">
              <h5 className="text-xl font-bold text-gray-800">
                {prof.nom_prof} {prof.prenom_prof}
              </h5>
              <p className="text-gray-700 text-lg">
                Professeur de {prof.langue.nom_langue}
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Diplôme : <span className="font-medium">{prof.Diplome}</span></p>
                <p>Niveau de langue : <span className="font-medium">{prof.Niveau_Etude}</span></p>
              </div>
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="mt-8 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h6 className="font-semibold mb-2">Expérience</h6>
              <p className="text-sm text-gray-600">
                {prof.experience || "Information non disponible"}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h6 className="font-semibold mb-2">Spécialités</h6>
              <p className="text-sm text-gray-600">
                {prof.specialites || "Information non disponible"}
              </p>
            </div>
          </div>
        </div>

        {/* Barre de boutons fixe */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
          <div className="flex justify-center gap-4">
            <Link to="/follow">
              <button className="px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 hover:shadow-md transition-all duration-300">
                Suivre le prof
              </button>
            </Link>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 hover:shadow-md transition-all duration-300"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProf;