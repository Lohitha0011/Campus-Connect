import React from "react";
import "../Styles/Events.css"; // Import your CSS file
import { Link } from "react-router-dom";
import EventLists from "./EventLists";


function Events() {
    return ( 
        <div className="divs">
            <Link to = "/form" type="button" className="login-b">
                + Add Event
            </Link>
            <EventLists/>
            
           
            
        </div>
    );
}

export default Events;
