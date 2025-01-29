import React, { useEffect, useState } from "react";
import { Header } from "../../../Accueil/Header/Header.jsx";
import "./Chapters.css"
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../../../../../data/courses.js";

const Chapters = ()=>{

    const {titre} = useParams()
    const [chapters,setChapters] = useState(data.find(course=>course.titre===titre).chapters)
    const  [currentChapter,setCurrentChapter] = useState(chapters[0])
    const navigate = useNavigate()
    const nextChapter = ()=>{
        if(chapters.indexOf(currentChapter)<chapters.length-1){
            setCurrentChapter(chapters[chapters.indexOf(currentChapter)+1])
        }
    }
    const PrevChapter = ()=>{
        if(chapters.indexOf(currentChapter)>0){
            setCurrentChapter(chapters[chapters.indexOf(currentChapter)-1])
        }
    }

    const showChapter = (title)=>{
        setCurrentChapter(chapters.find(chapter=>chapter.title===title))
    }

    const finishChapter = ()=>{
        navigate(`/courses`)
    }
    return <div className="chapters">
        <Header/>
        <div className="screen-chapters">
            <div className="chapter-titles">
                {chapters.map(chapter=>{
                    return <h5 onClick={()=>showChapter(chapter.title)} className="chapter-title">{chapter.title}</h5>
                })}
            </div>
            <div className="chapter-content">
                <div className="chapter-paraph">
                    <h4 className="chapter-title">{currentChapter.title}</h4>
                    <p className="chapter-text">{currentChapter.content.text}</p>
                    {
                        currentChapter.content.images.map(image=>(
                            <img src={image} alt={image} className="chapter-image"/>
                        ))
                    }
                </div>
                <div className="chapter-buttons">
                    {
                        (chapters.indexOf(currentChapter)>0 && chapters.indexOf(currentChapter)<chapters.length) && 
                            <div className="btn btn-primary" onClick={PrevChapter}>
                                {chapters[chapters.indexOf(currentChapter)-1].title}
                            </div>
                    }
                    {
                        (chapters.indexOf(currentChapter)<chapters.length-1) && 
                            <div className="btn btn-primary" onClick={nextChapter}>
                                {chapters[chapters.indexOf(currentChapter)+1].title}
                            </div>
                    }
                    {
                        (chapters.indexOf(currentChapter)===chapters.length-1) && 
                            <div className="btn btn-primary" onClick={finishChapter}>
                                Terminer
                            </div>
                    }
                   
                </div>
            </div>
        </div>
    </div>
}

export default Chapters