import React from 'react'

function Chat({socket, username, roomId}) {
    console.log(socket)
    console.log(username)
    console.log(roomId)
    return (
        <div>
            <div className="chat-header">
                <p>Chat Now</p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input placeholder="Type a message..."/>
                <button>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
