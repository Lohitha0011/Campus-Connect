import React, { useState, useEffect } from 'react';
import { db, auth } from './Firebases';
import firebase from 'firebase/compat/app';
import "../Styles/Ch.css"; // Make sure you create appropriate styles

const Ch = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const unsubscribe = db.collection('messages')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()));
      });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      await db.collection('messages').add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName || 'Anonymous',
      });

      setNewMessage("");
    }
  };

  return (
    <div className="chatbox-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
            <span className="message-sender">{msg.displayName}</span>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="send-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Ch;
