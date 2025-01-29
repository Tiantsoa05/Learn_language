import { useEffect, useState } from "react";
import { Header } from "./Header/Header.jsx";
import { Profs } from "./Profs/Profs.jsx";
import { Menus } from "./Menus/Menus.jsx";
import DetailProf from "./Profs/DetailProf/DetailProf.jsx";
import { Lessons } from "./Lessons/Lessons.jsx";
import { Exercice } from "./Exercice/Exercice.jsx";
import Post from "./Post/Post.jsx";
import { XCircle } from 'lucide-react';
import axios from "axios";

const Accueil = () => {
    const [data, setData] = useState([]);
    const [profs, setProfs] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const [cliquedProf, setCliquedProf] = useState(null);
    const [lessons, DisplayLessons] = useState(false);
    const [exercice, DisplayExercice] = useState(false);
    const [noProfFound, setNoProfFound] = useState(false);

    const setProf = (prof) => {
        setCliquedProf(prof);
        DisplayExercice(false);
        DisplayLessons(false);
    };

    const setExercice = () => {
        DisplayExercice(true);
        setCliquedProf(null);
        DisplayLessons(false);
    };

    const setLessons = () => {
        DisplayLessons(true);
        setCliquedProf(null);
        DisplayExercice(false);
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setValueSearch(searchValue);

        if (searchValue.trim() !== '') {
            const filteredProfs = data.filter(d => 
                d.nom_prof.toLowerCase().includes(searchValue.toLowerCase())
            );
            setProfs(filteredProfs);
            setNoProfFound(filteredProfs.length === 0);
        } else {
            setNoProfFound(false);
            setProfs(data);
        }
    };

    const resetSearch = () => {
        setValueSearch('');
        setProfs(data);
        setNoProfFound(false);
    };

    useEffect(() => {
        axios.get('http://localhost:3000/all/profs').then(data => {
            setProfs(data.data);
            setData(data.data);
        });
    }, []);

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
            {/* Header fixe */}
            <Header />
            
            {/* Contenu principal avec hauteur dynamique */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="h-full flex flex-col lg:flex-row gap-6">
                        {/* Section Liste des professeurs */}
                        <div className="w-full lg:w-1/4 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm">
                            <div className="p-6 border-b border-gray-100 flex-shrink-0">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Liste des professeurs
                                </h2>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 
                                                 focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                                 transition-all duration-200"
                                        placeholder="Rechercher un professeur..."
                                        value={valueSearch}
                                        onChange={handleSearch}
                                    />
                                    {valueSearch && (
                                        <button 
                                            onClick={resetSearch}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2
                                                     text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                {noProfFound && (
                                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                                        <p className="text-sm">
                                            Aucun professeur trouvé pour cette recherche
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <Profs profs={profs} setProf={setProf} />
                            </div>
                        </div>

                        {/* Section Contenu Principal */}
                        <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm">
                            <div className="flex-1 overflow-y-auto">
                                {cliquedProf && <DetailProf prof={cliquedProf} onClose={() => setCliquedProf(null)} />}
                                {exercice && <Exercice />}
                                {lessons && <Lessons />}
                                <Post />
                            </div>
                        </div>

                        {/* Section Menu */}
                        <div className="w-full lg:w-1/5 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm">
                            <div className="flex-1 overflow-y-auto">
                                <Menus setLessons={setLessons} setExercice={setExercice} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accueil;