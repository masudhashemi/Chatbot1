import { useState } from 'react'
import {ChatInput} from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'





    function App() {

      const [chatMessages, setChatMessages] = useState(
        [{
          message: 'Welcome to ChatBot Program!',
          sender: 'bot',
          id: 'id1'
        }]
      );
      //const [chatMessages, setChatMessages] = array;
      // const chatMessages = array[0];
      // const setChatMessages = array[1];


      // const ChatMessageComponents = ChatMessages.map((chatMessage) => {
      //   return (
      //     <ChatMessage
      //       message={chatMessage.message}
      //       sender={chatMessage.sender}
      //     />
      //   );
      // });
      return (
        <div className="app_container">
          <ChatMessages chatMessages={chatMessages} />
          <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}
          ></ChatInput> {/*<element/> and <element></element> line does same thing */}
        </div>
      );
    }


export default App
