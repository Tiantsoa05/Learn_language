/* eslint-disable react/prop-types */

import { CardProf } from "./CardProf/CardProf.jsx";

export const Profs = ({ profs, setProf }) => {
    if (profs.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                <p>Aucun professeur disponible</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-100">
            {profs.map((prof) => (
                <div 
                    key={prof.id_prof}
                    className="transition-colors duration-200 hover:bg-gray-50"
                >
                    <CardProf 
                        prof={prof} 
                        setProf={setProf}
                    />
                </div>
            ))}
        </div>
    );
};