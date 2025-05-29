import React, { useState } from "react";
import { storageRef, dataRef } from './Firebases'; // Import storageRef and dataRef from Firebase config
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../Styles/Ef.css"; // Import CSS file with updated class name

function Ef() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [chiefGuests, setChiefGuests] = useState('');
    const [venue, setVenue] = useState('');
    const [timings, setTimings] = useState('');
    const [eventCoordinators, setEventCoordinators] = useState('');
    const [sponsors, setSponsors] = useState('');
    const [googleFormLink, setGoogleFormLink] = useState(''); // State for Google Form link
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // State for storing uploaded image file
    const [loading, setLoading] = useState(false); // State for showing loading spinner

    const navigate = useNavigate(); // Initialize navigate function

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted

        if (image) {
            const uploadTask = storageRef.child(`images/${image.name}`).put(image);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Error uploading image: ', error);
                    setLoading(false); // Set loading to false on error
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        const eventData = {
                            eventName,
                            eventDate,
                            chiefGuests,
                            venue,
                            timings,
                            eventCoordinators,
                            sponsors,
                            googleFormLink,
                            description,
                            image: downloadURL
                        };

                        dataRef.ref('events').push(eventData).then(() => {
                            console.log("Event data stored successfully.");
                            setEventName('');
                            setEventDate('');
                            setChiefGuests('');
                            setVenue('');
                            setTimings('');
                            setEventCoordinators('');
                            setSponsors('');
                            setGoogleFormLink('');
                            setDescription('');
                            setImage(null);
                            setLoading(false); // Set loading to false on successful submission
                            navigate('/events'); // Redirect to the Events component
                        }).catch((error) => {
                            console.error("Error storing event data: ", error);
                            setLoading(false); // Set loading to false on error
                        });
                    });
                }
            );
        } else {
            console.error('No image uploaded');
            setLoading(false); // Set loading to false if no image is uploaded
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className="event-form-container">
            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
            <h2>Event Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={eventName}
                    placeholder="Name of the event"
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />
                <br />
                <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                />
                <br />
                <input
                    type="text"
                    value={chiefGuests}
                    placeholder="Chief guests"
                    onChange={(e) => setChiefGuests(e.target.value)}
                    required
                />
                <br />
                <input
                    type="text"
                    value={venue}
                    placeholder="Venue"
                    onChange={(e) => setVenue(e.target.value)}
                    required
                />
                <br />
                <input
                    type="text"
                    value={timings}
                    placeholder="Timings"
                    onChange={(e) => setTimings(e.target.value)}
                    required
                />
                <br />
                <input
                    type="text"
                    value={eventCoordinators}
                    placeholder="Event Coordinators"
                    onChange={(e) => setEventCoordinators(e.target.value)}
                    required
                />
                <br />
                <input
                    type="text"
                    value={sponsors}
                    placeholder="Event sponsors"
                    onChange={(e) => setSponsors(e.target.value)}
                    required
                />
                <br />
                <input
                    type="url"
                    value={googleFormLink}
                    placeholder="Google Form Link"
                    onChange={(e) => setGoogleFormLink(e.target.value)}
                    required
                />
                <br />
                <textarea
                    value={description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br />
                <label>
                    Upload Image:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Ef;
