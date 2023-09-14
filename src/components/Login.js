import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import { socket } from '../Socket';

function Login(props) {
  // Define state variables for name and roomNumber
  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomName, setRoomName] = useState('');
  const [title, setTitle] = useState('Create Your Own Room');
  const [joinExisting, setJoinExisting] = useState(false);
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your login logic here
    props.setName(name);
    props.setRoomName(roomName);
    // store the name in local storage
    socket.emit('join', {name: name, room: roomNumber, roomName: roomName, socketID: socket.id});
    props.setShowChatHome(true);
  };

  const handleJoinExistingCheck = (e) => {
      if(joinExisting){
        setTitle('Create Your Own Room');
      }
      else{
        setTitle('Join Existing Room');
      }
      setRoomNumber('');
      setJoinExisting(!joinExisting);

  }
  const checkForInvite = () => {
    const url = window.location.href;
    const urlSplit = url.split('/');
    const roomID = urlSplit[urlSplit.length - 1];
    if(roomID.includes('?join=')){
      const roomID0 = roomID.split('?join=')[1];
      setJoinExisting(true);
      setRoomNumber(roomID0);
    }
  
  }
  // const checkForRefresh = () => {
  //   const myBreezeData = JSON.parse(localStorage.getItem('myBreezeData'));


  //   if(myBreezeData){
  //     const name = myBreezeData.name;
  //     const roomName = myBreezeData.roomName;
  //     props.setName(name);
  //     props.setRoomName(roomName);
  //   }

  //   const myBreezeChat = JSON.parse(localStorage.getItem('myBreezeChat'));

  //   if(myBreezeChat){
  //     props.setShowChatHome(true);

  //   }


  // }
React.useEffect(() => {
  checkForInvite();
  // checkForRefresh();
}, [])
  return (
    <div className="login-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Display Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="roomNumber">Room Name:</label>
          <input
            type="text"
            id="roomNumber"
            value={roomName}
            disabled={joinExisting}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div className='join_exist'>
          <label htmlFor="roomNumber">Join Existing Room:</label>
          <input
            type="checkbox"
            id="rcb"
            checked={joinExisting}
            value={joinExisting}
            onChange={handleJoinExistingCheck}
          />
        </div>
{ joinExisting &&
        <div className="form-group">
          <label htmlFor="roomNumber">Room ID:</label>
          <input
            type="text"
            required
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
  />
        </div>}
        <button type="submit">Start Chat</button>
      </form>
    </div>
  );
}

export default Login;
