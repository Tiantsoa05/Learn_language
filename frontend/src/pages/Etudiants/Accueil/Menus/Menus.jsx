import React from "react";
import { Link } from "react-router-dom";
import "./Menus.css"
import { 
    BookOpen,
    Puzzle,
    BookMarked,
    NotebookText
} from 'lucide-react'

export const Menus = ({setLessons,setExercice}) => {
    return (
        <div className="menus flex flex-col gap-4 items-center mt-8">
            <Link to={'/courses'}>
                <div 
                    className="card btn cursor-pointer flex justify-center items-center py-3 px-4 w-64 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                ><BookOpen className="mr-3"/>Leçons</div>
            </Link>
            <Link to={'/practice'}>
                <div 
                    className="card btn cursor-pointer flex justify-center items-center py-3 px-4 w-64 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                ><Puzzle className="mr-3"/>Pratique</div>
            </Link>
            <Link to={'/dictionnary'}>
                <div 
                    className="card btn cursor-pointer flex justify-center items-center py-3 px-4 w-64 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                ><BookMarked className="mr-3"/>Dictionaire</div>
            </Link>
            <Link to={'/conjugaison'}>
                <div 
                    className="card btn cursor-pointer flex justify-center items-center py-3 px-4 w-64 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                ><NotebookText className="mr-3"/>Conjugaisons</div>
            </Link>
        </div>
    )
}