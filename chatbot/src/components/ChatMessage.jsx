import botprofile from '../assets/bot.png'
import userprofile from '../assets/user.png'

   export  function ChatMessage({ message, sender }) {
      //const message = props.message;
      //const sender = props.sender;
      //const {message, sender} =props; //easy way to write above lines.
      /*
              if(sender === 'bot') {
                return(
                   <div>
                      <img src="/image/bot.png" width="50"/>
                      {message}
                    </div>
                );
      
              }
      */
      return (
        <div className={sender === 'user' ? 'chat_user' : 'chat_bot'}>
          {sender === 'bot' && <img src={botprofile } className="chat_bot_img" />}
          <div className="chat_message_text">
            {message}
          </div>
          {sender === 'user' && <img src={userprofile} className="chat_user_img" />}
        </div>
      );
    }