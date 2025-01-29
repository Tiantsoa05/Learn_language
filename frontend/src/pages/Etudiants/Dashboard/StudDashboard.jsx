import React from "react";
import Profile from "./profile/Profile.jsx";
import StatCourses from "./stat-courses/StatCourses.jsx";
import Progress from "./progress/Progress.jsx";
import Courses from "./courses/Courses.jsx";
import Exercices from "./exercices/Exercices.jsx";
import Practice from "./practice/Practice.jsx";
import './etudiant.css'

const StudDashboard = ()=>{
    return <div className="dashboard">
        
        <div>
            <div className="line-pro-cour">
                <Profile/>
                <StatCourses/>
            </div>
            <div className="line-prog-cour-exer">
                <Progress/>
                <Courses/>
                <Exercices/>
                <Practice/>
            </div>
        </div>
    </div>
}

export default StudDashboard