import React,{useState} from 'react'
import ChatHome from './ChatHome';
import Login from './Login';


function Home() {
  const [Name, setName] = React.useState('');
  const [showChatHome, setShowChatHome] = React.useState(false);
  const [LoginData, setLoginData] = React.useState({name: '', room: ''});
  const [roomName, setRoomName] = useState('')

  return (
    <div>
      { showChatHome ?<ChatHome roomName={roomName} setShowChatHome={setShowChatHome} setRoomName={setRoomName} Name={Name}/>:<Login setName={setName} setRoomName={setRoomName} setShowChatHome={setShowChatHome}/>}
    </div>
  )
}

export default Home