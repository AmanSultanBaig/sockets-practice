import React, { useState, useEffect } from 'react'

function Chat({ socket, username, roomId }) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            let message = {
                room: roomId,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", message)
            setMessageList((list) => [...list, message])
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Chat Now</p>
            </div>
            <div className="chat-body">
                {messageList.map(item => {
                    return (
                        <div className="message" id={username === item.author ? "you" : "other"}>
                            <div>
                                <div className="message-content">
                                    {item.message}
                                </div>
                                <div className="message-meta">
                                    <p id="time">{item.time}</p>
                                    <p id="author">{item.author}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="chat-footer">
                <input placeholder="Type a message..." value={currentMessage} onKeyPress={(e) => { e.key === "ENTER" && sendMessage() }} onChange={(e) => setCurrentMessage(e.target.value)} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat