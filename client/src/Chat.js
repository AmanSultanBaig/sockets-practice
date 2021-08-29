import React, { useState } from 'react'

function Chat({ socket, username, roomId }) {
    const [currentMessage, setCurrentMessage] = useState("")

    const sendMessage = async () => {
        if (currentMessage !== "") {
            let message = {
                room: roomId,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", message)
        }
    }

    return (
        <div>
            <div className="chat-header">
                <p>Chat Now</p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input placeholder="Type a message..." value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
