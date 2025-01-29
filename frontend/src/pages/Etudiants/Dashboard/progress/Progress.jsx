import React from "react";
import PieChart from "./PieChart.jsx";

const Progress = ()=>{
    return <div className="progress card-first">
        <div className="prog-titre">Your progress</div>
        <div className="align-graph-dates">
            <div className="graph">
                <PieChart/>
            </div>
            <div className="dates">
                <div className="dates-title">TERM DATES</div>
                <div className="mesure"></div>
                <div className="value-date">Oct-Dec</div>
            </div>
        </div>
    </div>
}

export default Progress