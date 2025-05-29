import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { messagesRef } from './Firebases'; // Adjust the path accordingly
import '../Styles/LiveChat.css';

function LiveChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { userId } = useParams(); // Assuming you pass userId as a URL parameter
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser && userId) {
      const chatRef = messagesRef.child(`${currentUser.email}_${userId}`);
      chatRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const messageList = data ? Object.values(data) : [];
        setMessages(messageList);
      });
    }
  }, [currentUser, userId]);
  const sendMessage = async () => {
    if (message.trim() && currentUser && userId) {
      const chatRef = messagesRef.child(`${currentUser.email}_${userId}`);
      const newMessageRef = chatRef.push();
      await newMessageRef.set({
        sender: currentUser.email,
        recipient: userId,
        message,
        timestamp: Date.now()
      });
      setMessage('');
    }
  };
  return (
    <div className="livechat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === currentUser.email ? 'sent' : 'received'}`}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default LiveChat;