import React, { useState } from 'react'
import { Header } from '../Accueil/Header/Header'
import axios from 'axios'


const SpellCheck = () => {

    const [langue,setLangue] = useState('')
    const [mot,setMot] = useState('')
    const [suggestion,setSuggestion]=useState('')

    const capitalize = (word)=>{
        return word.charAt(0).toUpperCase()+word.slice(1)
    }

    const checkWord = async ()=>{

        const resp = await axios.post('http://localhost:3000/spell/check',{
            text: mot,
            lang: langue
        })
        setSuggestion(resp.data.suggestion)
        console.log(resp)

    }
  return (
    <>
        <Header/>
        <label htmlFor="lang">Traduire en</label>
        <select name="lang" id="lang" onChange={(e)=>setLangue(e.target.value)}>
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="es">Italien</option>
        </select>
        <div className="flex items-center justify-center w-full  min-h-96 text-white overflow-hidden">
        {/* Formulaire et Résultat */}
        <div className="flex w-full max-w-screen-lg gap-5">
            {/* Formulaire à gauche */}
            <div className="flex flex-col w-1/2 p-3 rounded-lg shadow-lg">
            <div>
                <input 
                    type="text" 
                    placeholder="Saisissez votre mot" 
                    value={mot}
                    onChange={(e) => setMot(e.target.value)}
                    className="w-full h-32 p-1 text-black rounded-md mb-3 border-2"
                />
                <button 
                    onClick={checkWord} 
                    className="px-5 py-2 bg-blue-500 rounded-md hover:bg-blue-600 float-right"
                >
                Confirmer
                </button>
            </div>
            </div>
    
            {/* Résultat à droite */}
            <div className="flex items-center justify-center w-1/2 bg-white-900 p-5 rounded-lg shadow-lg border-2">
            <div className="text-center w-full text-black">
                <div className='text-black'>{capitalize(suggestion)}</div>
            </div>
            </div>
        </div>
        </div>
        </>
  )
}

export default SpellCheck