import React, {useContext, useEffect, useState} from "react";
import "./Courses.css"
import Chapter from "./Chapter/Chapters.jsx";
import {Header} from "../../Accueil/Header/Header.jsx";
import image from '../../../../assets/img.png'
import { data } from "../../../../data/courses.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFilePdf, FaFileVideo, FaFileImage } from "react-icons/fa";



const Courses = ()=>{

    const [courses, setCourses] = useState(data)
    const [filters,setFilters]=useState([])
    const navigate = useNavigate()
    const [coursesProf,setCoursesProf]=useState([])
    console.log(localStorage)
    const {prof} = localStorage

    const setFilter = (value) =>{
    
        let actual = [...filters] 

        if(actual.includes(value)){
            actual = actual.filter(filter=>filter!==value)
            setFilters([...actual])
        }else{
            actual.push(value)
            setFilters([...filters,value])
        }
        console.log(actual)
        setCourses(data.filter(course=>actual.includes(course.titre.toLocaleLowerCase()))); //)))
        

    }

    const navigation = (path)=>{
        navigate(path)
    }
    
    useEffect(()=>{
        axios.get('http://localhost:3000/courses/all/'+prof).then(response=>{
          setCoursesProf(response.data)
          console.log(response.data)
        })
    },[])

    return <>
        <Header/>
        <div className="flex flex-col w-full justify-between">

          <div className="flex flex-col gap-8 w-full h-[calc(100vh-16vh)] p-12">
            {/* Section des cours principaux */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Cours gratuits</h3>
            <div className="flex flex-wrap gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="relative flex flex-col items-start gap-4 p-6 bg-white shadow-lg rounded-2xl transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                  onClick={() => navigation(`/courses/${course.titre}`)}
                  style={{ width: "18vw", minWidth: "250px", height: "50vh" }}
                >
                  {/* Image du cours */}
                  <img
                    src={image}
                    alt={course.langue}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  {/* Contenu du cours */}
                  <div className="flex flex-col justify-between flex-grow w-full">
                    {/* Titre du cours */}
                    <h3 className="text-xl font-bold text-gray-900">{course.titre}</h3>

                    {/* Description du cours */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Niveau du cours */}
                    <div className="text-sm text-gray-500 mt-2">
                      <span className="font-semibold">Niveau: </span>
                      {course.niveau}
                    </div>

                    {/* Durée du cours */}
                    <div className="text-sm font-semibold text-gray-700 mt-2">
                      {course.chapters.length * 4} heures
                    </div>
                  </div>

                  {/* Badge pour indiquer que c'est gratuit */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Gratuit
                  </div>

                </div>
              ))}

            {/* Section des cours abonnés */}
            </div>
            {coursesProf.length > 0 && (
                <div className="p-6">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">Cours abonnés</h3>
                  {/* Regrouper les cours par type de fichier */}
                  {Object.entries(
                    coursesProf.reduce((acc, cours) => {
                      const fileType = cours.contenu_cours.endsWith(".pdf")
                        ? "PDF"
                        : cours.contenu_cours.endsWith(".mp4")
                        ? "Vidéo"
                        : "Image";
                      if (!acc[fileType]) acc[fileType] = [];
                      acc[fileType].push(cours);
                      return acc;
                    }, {})
                  ).map(([fileType, courses]) => (
                    <div key={fileType} className="mb-8">
                      {/* Sous-titre pour chaque type de fichier */}
                      <h4 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-200 pb-2">
                        {fileType}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {courses.map((cours) => (
                          <div
                            key={cours.id}
                            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
                            onClick={() => navigation(`/course/view/${cours.id}`, { state: { cours } })}
                          >
                            <div className="mb-4">
                              {cours.contenu_cours.endsWith(".pdf") ? (
                                <FaFilePdf size={80} className="text-red-500" />
                              ) : cours.contenu_cours.endsWith(".mp4") ? (
                                <FaFileVideo size={80} className="text-blue-500" />
                              ) : (
                                <FaFileImage size={80} className="text-green-500" />
                              )}
                            </div>
                            <p className="text-lg font-medium text-gray-800">{cours.titre}</p>
                            <span className="text-sm text-gray-500 mt-2">
                              Cliquez pour voir le cours
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>       
        </div>
    </>
}

export default Courses