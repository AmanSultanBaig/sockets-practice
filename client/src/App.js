import './App.css';
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Chat'
import Stripe from './Stripe'

const socket = io.connect("http://localhost:8000")

function App() {
  const [name, setName] = useState("")
  const [roomId, setRoomId] = useState("conversation_room")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (name !== "" && roomId !== "") {
      socket.emit("join_room", roomId)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat ?
        <div className="joinChatContainer">
          <h3>Join A Room</h3>
          <input placeholder="name..." value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="RoomId..." disabled value={roomId} onChange={(e) => setRoomId(e.target.value)} />
          <button type="button" onClick={joinRoom}>Join A Room</button>
        </div>
        :
        (
          <>
            <Chat socket={socket} username={name} roomId={roomId} />
            <Stripe />
          </>
        )
      }
    </div>
  );
}

export default App;