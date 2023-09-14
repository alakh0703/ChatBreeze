import React from 'react';
import './LandingPage.css'; // Assuming you have a separate CSS file
import chatRoomImg from '../Images/chatroom.jpg';
import { useNavigate} from 'react-router';

function LandingPage() {
  const Navigate = useNavigate();

  const startChat = () => {
    Navigate('/chatHome');
  }

  return (
    <div className="landing">
      <header>
        <h1 className='heading'>ChatBreeze</h1>
       
      </header>
      <main>
        <section className="hero">
          <img src={chatRoomImg} alt="Chat Rooms"  className='chatRI'/>
          <div className="hero-content">
            <h2>Connect, Chat, Leave</h2>
            <p>Instant Chat Rooms for Quick Conversations</p>
            <button className="start-button" onClick={startChat}>Start Chatting</button>
          </div>
        </section>
        <section className="features">
          <div className="feature">
            <h3>Create Your Own Room</h3>
            <p>Easily create a new chat room for your topic.</p>
          </div>
          <div className="feature">
            <h3>Join Existing Rooms</h3>
            <p>Explore and join existing chat rooms on various topics.</p>
          </div>
          <div className="feature">
            <h3>Real-time Chatting</h3>
            <p>Chat with people in real-time, no history saved.</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 ChatBreeze</p>
        <div className="social-links">
          <a href="https://github.com/alakh0703">Github</a>
          <a href="https://www.linkedin.com/in/alakh-patel-9256a91aa/">LinkedIN</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
