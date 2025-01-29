import React from 'react'
import LineChart from './LineChart.jsx'

const Courses = ()=>{
    return <div className="course card-first">
        <div className="titre-courses">Courses</div>
        <div className="courses-graph graphsize">
            <LineChart/>
        </div>
    </div>
}

export default Courses