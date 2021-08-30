import './App.css';
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Chat'

const socket = io.connect("http://localhost:8000")

function App() {
  const [name, setName] = useState("")
  const [roomId, setRoomId] = useState("")

  const joinRoom = () => {
    if(name !== "" && roomId !== "") {
      socket.emit("join_room", roomId)
    }
  }

  return (
    <div className="App">
      <div className="joinChatContainer">
      <h3>Join A Room</h3>
      <input placeholder="name..." value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="RoomId..." value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <button type="button" onClick={joinRoom}>Join A Room</button>
      </div>

      <Chat socket={socket} username={name} roomId={roomId}/>
    </div>
  );
}

export default App;