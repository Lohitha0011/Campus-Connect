import React, { useState, useEffect } from "react";
import { dataRef } from './Firebases'; // Ensure this is the correct reference
import "../Styles/EventLists.css"; // Import CSS for styling
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import EventPopup from './EventPopup'; // Import EventPopup component
import Error from "./Error"; // Import ErrorPopup component

function EventLists() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to track selected event

    useEffect(() => {
        // Fetch events data from Firebase
        dataRef.ref('events').once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const eventList = [];
                    for (let id in data) {
                        eventList.push({ id, ...data[id] });
                    }
                    // Sort events by date in ascending order
                    eventList.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                    setEvents(eventList);
                } else {
                    console.log("No data available");
                    setEvents([]); // Set empty array if no data
                }
            })
            .catch((error) => {
                setError(error);
                console.error("Error reading data: ", error);
            });
    }, []);

    // Function to handle opening popup and setting selected event
    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    // Function to handle closing popup
    const handleClosePopup = () => {
        setSelectedEvent(null);
    };

    // Function to handle closing error popup
    const handleCloseErrorPopup = () => {
        setError(null);
    };

    return (
        <div className="event-list-container">
            <h2 className="named">Events</h2>
            <div className="events-list">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="event-item" onClick={() => handleEventClick(event)}>
                            {event.image && <img src={event.image} alt={event.eventName} className="event-image" />}
                            <div className="event-content">
                                <div className="event-header">
                                    <div className="event-date">
                                        <span className="event-day">{new Date(event.eventDate).getDate()}</span>
                                        <span className="event-month">{new Date(event.eventDate).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                                    </div>
                                    <div className="event-status">
                                        {event.registered && <span className="registered-badge">Registered</span>}
                                    </div>
                                </div>
                                <h4>{event.eventName}</h4>
                                <div className="event-details">
                                    <p><FaCalendarAlt /> {event.eventDate}</p>
                                    <p><FaClock /> {event.timings}</p>
                                    <p><FaMapMarkerAlt /> {event.venue}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </div>

            {/* Event Popup component */}
            {selectedEvent && (
                <EventPopup
                    event={selectedEvent}
                    onClose={handleClosePopup}
                />
            )}

            {/* Error Popup component */}
            {error && (
                <Error
                    error={error}
                    onClose={handleCloseErrorPopup}
                />
            )}
        </div>
    );
}

export default EventLists;
