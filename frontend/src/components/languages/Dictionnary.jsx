import React, { useState } from 'react';
import { Header } from '../../pages/Etudiants/Accueil/Header/Header';
import DictionnaryWords from '../../data/Dictionnary';
import { Search} from 'lucide-react'
import WordFilter from '../Dictionnary/WordFilter';

const Dictionnary = () => {
    const [words, setWords] = useState([...DictionnaryWords]);
    const [search,setSearch]=useState('')

    const capitalize = (word)=>{
        return word.charAt(0).toUpperCase()+word.slice(1)
    }

    const handleSearch = ()=>{
        if(search.trim()!==''){
            let found = [DictionnaryWords.find(word=>word.mot === search.toLowerCase())]
            if(found.length!==0) setWords([...found])
        }
    }

    const setFilter = (initial)=>{
        console.log(initial)
        let found = DictionnaryWords.filter(word=>word.mot.charAt(0)===initial.toLowerCase())
        setWords(found)
    }

    return (
        <div className="list-words">
            <Header />
            <WordFilter setFilter={setFilter}/>
            <div className="flex justify-center gap-4 mt-28">
                <input 
                    type="text" 
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    placeholder="Chercher un mot"
                    className="shadow-md border border-gray-300 rounded-lg p-3 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    className="w-52 flex justify-center items-center bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors" 
                    onClick={handleSearch}
                ><Search className='mr-3'/>Chercher</button>
            </div>
            <div className="flex flex-col justify-center items-center ml-28 pt-6 w-100">
                {
                    words.map(word => (
                        <div key={word.id} 
                            className="mb-6 cursor-pointer p-4 bg-white shadow-md hover:shadow-lg rounded-lg transition-shadow w-4/5"
                        >
                            <h2 className="font-bold text-lg">{capitalize(word.mot)}</h2>
                            <p className="text-gray-700">{word.definition}</p>
                            {word.synonymes.length > 0 && (
                                <p className="text-sm text-gray-500">
                                    Synonymes : {word.synonymes.join(', ')}
                                </p>
                            )}
                            {word.phrase_exemple && (
                                <p className="text-sm italic text-gray-600">
                                    Exemple : "{word.phrase_exemple}"
                                </p>
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Dictionnary;
