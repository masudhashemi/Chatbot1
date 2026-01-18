    import { useState } from 'react';
    import { Chatbot } from '../Chatbot';
    import './ChatInput.css';

    
    
    export function ChatInput({ chatMessages, setChatMessages }) {
      const [inputText, setInputText] = useState('');


      function saveInput(event) {
        setInputText(event.target.value);
      }

      function sendMessage() {

        const newChatMessage = [
          ...chatMessages,
          {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
          }
        ];

        setChatMessages(newChatMessage);

        const response = Chatbot.getResponse(inputText);
        setChatMessages([
          ...newChatMessage,
          {
            message: response,
            sender: 'bot',
            id: crypto.randomUUID()
          }
        ]);

        setInputText('');
      }
      return (
        <div className="input_container">
          <input
            placeholder="Send a message to Chatbot"
            size="30"
            onChange={saveInput}
            value={inputText}
            className="inputBox"
          />
          <button onClick={sendMessage} className="sendButton"> SEND</button>
        </div>
      );
    }