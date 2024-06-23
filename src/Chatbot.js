import React, { useState } from 'react';
import { checkSourceReliability } from './api'; // Adjust the import path as needed
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: 'me' }]);
      setInput('');

      try {
        const response = await checkSourceReliability(input); // Assuming input is the news URL
        console.log('Response from checkSourceReliability:', response);

        const { source_reliability, citations } = response;

        if (source_reliability !== undefined && citations !== undefined) {
          const reliabilityMessage = `This source has a reliability score of ${source_reliability}.`;
          const citationsMessage = citations > 250
            ? `This source has ${citations} citations, making it more reliable.`
            : `This source has ${citations} citations, making it less reliable.`;

          setMessages((prevMessages) => [
            ...prevMessages,
            { text: reliabilityMessage, user: 'bot' },
            { text: citationsMessage, user: 'bot' },
          ]);
        }
        else if (source_reliability !== undefined && citations !== undefined) {
            const reliabilityMessage = `This source has a reliability score of ${source_reliability}.`;
            
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: reliabilityMessage, user: 'bot' },
            ]);            
        }
        else if (citations !== undefined && source_reliability !== undefined) {
            const citationsMessage = citations > 250
            ? `This source has ${citations} citations, making it more reliable.`
            : `This source has ${citations} citations, making it less reliable.`;

            setMessages((prevMessages) => [
              ...prevMessages,
              { text: citationsMessage, user: 'bot' },
            ]);            
        }        
        else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Error: Received unexpected response from the API', user: 'bot' },
          ]);
        }

        if (messages === 'Hello from Lambda!') {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: 'Received a greeting from Lambda!', user: 'bot' },
            ]);
          }

      } catch (error) {
        console.error('Error in handleSend:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Unable to check source reliability', user: 'bot' },
        ]);
      }
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.user}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Paste your URL here!"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
