import React from "react";
import ExerChart from "./ExerChart";

const Exercices = ()=>{
    return <div className="exercice card-first">
        <div className="titre-exerice">Exerices</div>
        <div className="execice-graph graphsize">
            <ExerChart/>
        </div>
    </div>
}

export default Exercices