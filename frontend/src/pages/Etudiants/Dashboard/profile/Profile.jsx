import React from "react";
import profil from '../../../../assets/profil.png'

const Profile = ()=>{
    return <div className="profile card-first">
        <div className="profile-image">
            <img src={profil} className="pdp"/>
        </div>
        <div className="profile-details">
            <div className="align-name-lan">
                <div className="name">ANDRIANAINA Tiantsoa Hortencia</div>
                <div className="language">Anglais</div>
            </div>
            <div className="level">Niveau avancée</div>
        </div>
    </div>
}

export default Profile