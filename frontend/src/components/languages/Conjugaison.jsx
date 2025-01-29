import React, { useState } from 'react'
import { Header } from '../../pages/Etudiants/Accueil/Header/Header'
import CONJUGAISON from '../../data/Conjugaison'
import TableauConjugaison from '../Conjugaison/TableauConjugaison'
import { Search } from 'lucide-react'

const Conjugaison = () => {
    const [conjugaison,setConjugaison] = useState([...CONJUGAISON])
    const [search,setSearch]= useState('')
    const handleSearch = ()=>{
        if(search.trim()!==''){
            let found = [CONJUGAISON.find(word=>word.verbe === search.toLowerCase())]
            if(found.length!==0) setConjugaison([...found])
        }
    }
    const capitalize = (word)=>{
        return word.charAt(0).toUpperCase()+word.slice(1)
    }
    return (
        <div>
            <Header/>
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
            {
                conjugaison.map(conjugaison=>{
                    return (
                        <div key={conjugaison.id}>
                            <h2 className='text-center text-3xl text-black mt-12'>{capitalize(conjugaison.verbe)}</h2>
                                <div className='text-gray-700 flex justify-center gap-8 mt-8 w-98 p-12'>   
                                    {
                                        conjugaison.conjugaisons.map(conj=><TableauConjugaison valeur={conj}/>)
                                    }
                                </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Conjugaison