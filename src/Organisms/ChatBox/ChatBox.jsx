import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatBox.module.css";
import { io } from "socket.io-client";

// const socket = io.connect("http://localhost:9000/");

export const ChatBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const dummy = useRef();

  useEffect(() => {
    // Establish socket connection on mount
    const newSocket = io("http://localhost:9000");
    setSocket(newSocket);

    // Listen for messages from the server
    newSocket.on("chat-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.msg]);
    });

    // Cleanup on unmount
    return () => newSocket.close();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.length !== 0 && socket) {
      // setMessages([...messages, inputValue]);
      socket.emit("chat-message", { msg: inputValue });
      setInputValue("");
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles["Chat__box-container"]}>
      ChatBox
      <div>
        <form id="form" onSubmit={handleSubmit}>
          <input
            id="input"
            // autocomplete="off"
            value={inputValue}
            onChange={handleChange}
            maxLength={30}
          />
          <button
            className={
              inputValue.trim() === ""
                ? styles["button-disabled"]
                : styles["button-enabled"]
            }
            type="submit"
          >
            Send
          </button>
        </form>

        <div className={styles["Chat__box-mesages-container"]}>
          {messages && (
            <>
              <ul id="messages">
                {messages.map((msg, indx) => {
                  return <li key={indx}>{msg}</li>;
                })}
              </ul>
            </>
          )}
          <div ref={dummy}></div>
        </div>
      </div>
    </div>
  );
};
