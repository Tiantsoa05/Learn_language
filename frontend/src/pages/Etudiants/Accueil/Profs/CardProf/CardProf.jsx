import React from "react";
import professor from '../../../../../assets/icon_prof.png'


export const CardProf = ({ prof, setProf }) => {
  return (
    <div 
        className="card-prof-profile cursor-pointer p-4 hover:shadow-lg transition-shadow" 
        onClick={()=>setProf(prof)}
    >
        <div className="card-group flex items-center gap-4">
            <div 
                className="image-prof w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-gray-100"
            >
                <img 
                    src={professor} 
                    alt="image" 
                    className="w-full h-full object-cover" 
                />
            </div>
            <div className="names">
                <h5 className="text-lg font-semibold">{prof.nom_prof} {prof.prenom_prof}</h5>
            </div>
        </div>
        <div className="description mt-4 text-gray-700">
            <div>{prof.diplome}</div>
            <div>{prof.Niveau_Etude}</div>
        </div>
    </div>
  );
};