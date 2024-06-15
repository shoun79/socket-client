
import { useState } from 'react';
import './App.css'
import { io } from "socket.io-client";
import { useEffect } from 'react';

function App() {
  const socket = io.connect("http://localhost:5000");

  const [message, setMessage] = useState();
  const [getMessage, setGetMessage] = useState();
  const [room, setRoom] = useState("");
  const handleSend = () => {

    socket.emit("messageEvent", { message, room })
  }

  useEffect(() => {

    socket.on("showMessage", (data) => {
      setGetMessage(data.message)
    })
  }, [socket])

  const hanldeRoom = () => {
    socket.emit("joinRoom", room);
  };
  return (
    <>
      <div style={{ display: 'flex', margin: '10px', justifyContent: 'space-between' }}>
        <h2>Sender:{message}</h2>
        <h2>Receiver:{getMessage}</h2>
      </div>

      <input
        onBlur={(e) => setRoom(e.target.value)}
        type="text"
        placeholder="ROom...."
      />
      <button onClick={hanldeRoom}>Join room</button>
      <br />
      <input onBlur={(e) => setMessage(e.target.value)} type="text" placeholder='message' />
      <button onClick={handleSend}>send</button>
    </>
  )
}

export default App
