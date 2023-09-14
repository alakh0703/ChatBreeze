import React, { useRef, useState } from 'react';
import './ChatSection.css';
import { socket } from '../Socket';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function ChatSection(props) {
    const [myChats, setMyChats] = useState([])
    const [log, setLog] = useState('')
    const [isMobile, setIsMobile] = useState(false)
const [showLog, setShowLog] = useState(false)
const [showEmoji, setShowEmoji] = useState(false)

    const chatRef = useRef()

    const getTime = () => {
        const now = new Date();

        const hours = now.getHours();
const minutes = now.getMinutes();
const ampm = hours >= 12 ? 'pm' : 'am';
if(minutes < 10
    ) {
        return `${hours}:0${minutes} ${ampm}`;
    }

const formatted = `${hours}:${minutes} ${ampm}`;
return formatted;

    }

    const submitHandler = (e) => {
        e.preventDefault()
        const ref = {chat: chatRef.current.value, mine: true, name:"Me", time: getTime()};

        socket.emit('chat',{chat: chatRef.current.value, socketID: socket.id, name: props.Name, time: getTime()})
        
        setMyChats([...myChats, ref])

        // localStorage.setItem('myBreezeChat', JSON.stringify(myChats))
        chatRef.current.value = ''

    }
    socket.on('leave', (data) => {
        const memberLeft = data.name;
        const members = props.peopleList;
        const members0 = members.filter((member) => {
            return member !== memberLeft
        })
        props.setPeopleList(members0)
        setLog(`${memberLeft} left the room`)
        setShowLog(true)
        setTimeout(() => {
            setShowLog(false)
        }
        , 3000)
    })
    // emit 
  socket.on('joined', (data) => {
    console.log(data)
    const room = data.room;
    const members = data.members;
    const roomName0 = data.roomName;
    console.log("roomName0", roomName0)
    props.setRoomName(roomName0)
    props.setRoom(room)
    const members0 = members.map((member) => {

        return member.name
    })
    console.log(members0)
    props.setPeopleList(members0)
    const memL= members0.length;
    setLog(`${members0[memL-1]} joined the room`)
    setShowLog(true)
    props.setRoomID(room)
    const currentLink = window.location.href;
    const link = currentLink+ '?join=' + room;

    // const myBreezeData = {
    //     name: props.Name,
    //     room: room,
    //     roomName: roomName0,
    //     members: members0
    // }
    // const myBreezeChat =[]
    // localStorage.setItem('myBreezeData', JSON.stringify(myBreezeData))
    // localStorage.setItem('myBreezeChat', JSON.stringify(myBreezeChat))
    props.setInviteLink(link)
    setTimeout(() => {
        setShowLog(false)
    }
    , 3000)



  })
    socket.on('chat', (data) => {
        console.log("From server", data)
        const data0 = {chat: data.chat, mine: false, name: data.name, time: getTime()}
        console.log("data0", data0)
        setMyChats([...myChats, data0])
        // localStorage.setItem('myBreezeChat', JSON.stringify(myChats))

        console.log("myChats", myChats)
    }
    )
    // const showEmojiHandler = () => {
    //     setShowEmoji(!showEmoji)
    // }

   

// function checkForChats() {
//     const myBreezeChat = JSON.parse(localStorage.getItem('myBreezeChat'));
//     if(myBreezeChat){
//         setMyChats(myBreezeChat)
//     }

//     const myBreezeData = JSON.parse(localStorage.getItem('myBreezeData'));

//     if(myBreezeData){
//         const members = myBreezeData.members;
//         const room = myBreezeData.room;
//         const link = window.location.href+ '?join=' + room;
//         props.setInviteLink(link)
//         props.setPeopleList(members)
//     }
// }


    React.useEffect(() => {
        if(window.innerWidth < 600) {
            setIsMobile(true)
        }
        // checkForChats()
    }, [])
  return (
    <div className='cs_main'>
     {showLog &&   <div className='notifications'>
            <p>{log}</p>
            </div>}
        <div className='cs_top'>

            {myChats.map((chat, index) => {
                return (
                    // <div>
                    // <p className='name'>{chat.name}</p>
                    // <div className={chat.mine ? 'cs_chat2' :'cs_chat'} key={index}>
                        
                    //     <p>{chat.chat}</p>
                    // </div>
                    
                    // </div>
                    <div class={chat.mine ? 'msg-bubble' :'msg-bubble-2'}>
                    <div class="msg-info">
                      <div class="msg-info-name">{chat.name}</div>
                      <div class="msg-info-time">{chat.time}</div>
                    </div>
            
                    <div class="msg-text">
{chat.chat}                    </div>
                  </div>
                )

                })
            }
        </div>
            <div className='cs_bottom'>
                <form onSubmit={submitHandler} className='cs_form'>
                   {/* { showEmoji &&  <Picker 
                   data={data}
                   onEmojiSelect={addEmoji}
                   className='emoji-picker-react'
                  
                  theme="dark"
                  />}
                <div className='emoji' onClick={showEmojiHandler}>
+               </div> */}

               <input type='text' ref={chatRef}  placeholder='Type a message' className='message' />
               </form>
            </div>
    </div>
  )
}

export default ChatSection