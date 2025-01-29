import React from "react";
import "./Notifications.css";
import { notifications } from "../../../../../data/Notifications.js";

const Notifications = () => {
    return (
        <div className="notif-card">
            {
                notifications.map(notif => (
                    <div className="notif-item" key={notif.id}>
                        <p>{notif.message}</p>
                        <div className="time">
                            <p>{notif.time}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Notifications;