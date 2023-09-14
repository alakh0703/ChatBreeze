import React, {useState} from 'react';
import './ChatHome.css';
import ChatSection from './ChatSection';
import arrowIcon from '../Images/right-arrow.png';
import { socket } from '../Socket';
// <a href="https://iconscout.com/icons/avatar" target="_blank">Free Avatar  Icon</a> on <a href="https://iconscout.com">IconScout</a>
import ham from '../Images/ham.png';
function ChatHome(props) {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [copy, setCopy] = React.useState('Copy');
  const [leave, setLeave] = React.useState(true);
  const [showInvite, setShowInvite] = React.useState(false);
const [inviteLink, setInviteLink] = React.useState('https://www.google.com');
  const [showPeopleList, setShowPeopleList] = React.useState(false);
const [peopleList, setPeopleList] = React.useState([]); // [
const [room, setRoom] = React.useState(''); // [
const [roomID, setRoomID] = React.useState('0'); // [
  const showPeopleHandler = () => {
    setShowPeopleList(!showPeopleList);
  }
  socket.on('connect', onConnect);
  function onConnect() {
   alert('Connected to server');
  }
  const toggleHandler = () => {
    setShowSidebar(!showSidebar);
  }
  const copyHandler = () => {
    const copyText = document.getElementById('invite');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inviteLink);
    setCopy('Copied!');

    setTimeout(() => {
      setCopy('Copy');
    }
    , 3000)
  }

socket.on('roomNotFound', (data) => {
  alert('Room not found');
  props.setShowChatHome(false);
})



  const [Mobile, setMobile] = useState(false)
  React.useEffect(() => {
    if(window.innerWidth < 600){
      setShowSidebar(false)
      setLeave(false)
      setMobile(true)
    }
    else{
      setLeave(true)
      setShowSidebar(true)
      setMobile(false)
    }
  }, [])

  function leave0(){
    props.setRoomName('')
    localStorage.removeItem('myBreezeData')
    localStorage.removeItem('myBreezeChat')
    // reload
    window.location.reload();
  }

  return (
    <div className='chatHome'>
      {/* <div className='ch_left'>
        <p>Room Number: {room}</p>
        
      </div> */}
     {leave &&  <button className='leaveRoom' onClick={leave0}>Leave</button>}
      {Mobile && <div className='toggle' onClick={toggleHandler}>
        <img src={ham} alt='ham' className={showSidebar?'Timg2':'Timg'}/>
      </div>}
      <div className={Mobile ? 'ch_center_m':'ch_center'}>
        <ChatSection setRoomID={setRoomID} setInviteLink={setInviteLink}  setRoomName={props.setRoomName} Name={props.Name} setRoom={setRoom} peopleList={peopleList} setPeopleList={setPeopleList} />
      </div>
       {showSidebar &&<div className={Mobile ? 'ch_right_m' : 'ch_right'}>
        <div className='people'>
          <div className={Mobile ? 'p_top_m':'p_top'} >
            <h1>{props.roomName}'s Members</h1>
          
            <p className='invite' onClick={()=>setShowInvite(true)} >Invite</p>
            {/* <img src={arrowIcon} alt='arrow' className={showPeopleList ? 'arrowIcon2':'arrowIcon'} /> */}
          </div>
        {showInvite && <div className={Mobile ? 'invite_box_m':'invite_box'}>
          <h2>Invite your Friends to your Personal Chat Room</h2>
          <p>Share this link to invite people to your room</p>
          <input type='text' disabled value={inviteLink} id='invite' />
          <p onClick={copyHandler} className='copy'>{copy}</p>
          <button onClick={()=>setShowInvite(false)}>Back to Chat</button>
          <p>Room ID: {roomID}</p>
          </div>
}
                  <div className='p_list'>
          
          
            {peopleList.map((person, index) => {
              return (
                <div className='p_person' key={index}>
                  <div className='p_avatar'>
                    {person[0]}
                  </div>
                  <p>{person}</p>
                </div>
              )
                
            })
            }
          </div>
        </div>
      </div>}
    </div>
  )
}

export default ChatHome