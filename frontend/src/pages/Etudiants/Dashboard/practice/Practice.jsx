import React from "react";
import PractChart from "./PractChart";

const Practice = ()=>{
    return <div className="practice card-first">
        <div className="titre-practice">Practice</div>
        <div className="practice-graph graphsize">
            <PractChart/>
        </div>
    </div>
}

export default Practice