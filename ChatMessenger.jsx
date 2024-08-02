// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const ChatMessenger = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hello!", from: "user" },
//     { text: "Hi there! How can I help you?", from: "bot" },
//   ]);
//   const [newMessage, setNewMessage] = useState("");
//   const socket = io("http://localhost:8000");

//   useEffect(() => {
//     // Listen for messages
//     socket.on("receive_message", (message) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: message, from: "bot" },
//       ]);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       socket.emit("send_message", newMessage);
//       setMessages([...messages, { text: newMessage, from: "user" }]);
//       setNewMessage("");
//     }
//   };

//   // Inline styles
//   const containerStyle = {
//     display: "flex",
//     flexDirection: "column",
//     height: "100vh",
//     width: "100%",
//     maxWidth: "600px",
//     margin: "auto",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//   };

//   const headerStyle = {
//     padding: "15px",
//     backgroundColor: "#007bff",
//     color: "white",
//     textAlign: "center",
//     borderBottom: "1px solid #ccc",
//     borderTopLeftRadius: "8px",
//     borderTopRightRadius: "8px",
//   };

//   const bodyStyle = {
//     flex: "1",
//     overflowY: "auto",
//     padding: "15px",
//     backgroundColor: "#f8f9fa",
//   };

//   const messageListStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//   };

//   const messageStyle = (from) => ({
//     padding: "10px",
//     borderRadius: "5px",
//     maxWidth: "80%",
//     wordWrap: "break-word",
//     alignSelf: from === "user" ? "flex-end" : "flex-start",
//     backgroundColor: from === "user" ? "#007bff" : "#e9ecef",
//     color: from === "user" ? "white" : "#495057",
//   });

//   const footerStyle = {
//     padding: "15px",
//     borderTop: "1px solid #ccc",
//     display: "flex",
//     gap: "10px",
//     backgroundColor: "#ffffff",
//   };

//   const inputStyle = {
//     flex: "1",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   };

//   const buttonStyle = {
//     padding: "10px 15px",
//     border: "none",
//     backgroundColor: "#007bff",
//     color: "white",
//     borderRadius: "4px",
//     cursor: "pointer",
//   };

//   const buttonHoverStyle = {
//     backgroundColor: "#0056b3",
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <h2>Chat with Support</h2>
//       </div>
//       <div style={bodyStyle}>
//         <div style={messageListStyle}>
//           {messages.map((msg, index) => (
//             <div key={index} style={messageStyle(msg.from)}>
//               {msg.text}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div style={footerStyle}>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           style={inputStyle}
//         />
//         <button
//           onClick={handleSendMessage}
//           style={buttonStyle}
//           onMouseOver={(e) =>
//             (e.currentTarget.style.backgroundColor =
//               buttonHoverStyle.backgroundColor)
//           }
//           onMouseOut={(e) =>
//             (e.currentTarget.style.backgroundColor =
//               buttonStyle.backgroundColor)
//           }
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatMessenger;

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
const ChatMessenger = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  let email = localStorage.getItem("email");
  let id = localStorage.getItem("id");
  useEffect(() => {
    const socketIo = io("http://localhost:8000");
    setSocket(socketIo);
    socketIo.emit("register_user", { email, id });
    socketIo.on("receive_message", ({ sender, message }) => {
      if (selectedUser && sender === selectedUser.id) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message, from: email },
        ]);
      }
    });

    // return () => {
    //   socketIo.disconnect();
    // };
  }, [selectedUser]);
  // const [userList, setUserList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/user/userlist", {
        email: email,
      });
      console.log(response.data.data, "dd"); // Accessing the data property
      setUsers(response.data.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code outside of the 2xx range
        console.error("Error Response:", error.response.data);
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error Message:", error.message);
      }
      console.error("Error Config:", error.config);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages([]); // Clear messages when a new user is selected
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const body = {
        receiver: selectedUser.email,
        message: newMessage,
        email: email,
      };

      socket.emit("send_message", body);
      setMessages([...messages, { text: newMessage, from: "user" }]);
      setNewMessage("");
    }
  };

  // Inline styles
  const containerStyle = {
    marginTop: "5vh",
    display: "flex",
    height: "95vh",
  };

  const sidebarStyle = {
    width: "250px",
    borderRight: "1px solid #ccc",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    display: "flex",
    flexDirection: "column",
  };

  const userStyle = {
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "center",
  };

  const selectedUserStyle = {
    ...userStyle,
    backgroundColor: "#0056b3",
  };

  const chatAreaStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    padding: "15px",
  };

  const headerStyle = {
    padding: "15px",
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "center",
    borderBottom: "1px solid #ccc",
  };

  const bodyStyle = {
    flex: "1",
    overflowY: "auto",
    padding: "15px",
    backgroundColor: "#f8f9fa",
  };

  const messageListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const messageStyle = (from) => ({
    padding: "10px",
    borderRadius: "5px",
    maxWidth: "80%",
    wordWrap: "break-word",
    alignSelf: from === "user" ? "flex-end" : "flex-start",
    backgroundColor: from === "user" ? "#007bff" : "#e9ecef",
    color: from === "user" ? "white" : "#495057",
  });

  const footerStyle = {
    padding: "15px",
    borderTop: "1px solid #ccc",
    display: "flex",
    gap: "10px",
    backgroundColor: "#ffffff",
  };

  const inputStyle = {
    flex: "1",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <h3>Users</h3>
        {users.map((user) => (
          <div
            key={user.id}
            style={
              selectedUser && selectedUser.id === user.id
                ? selectedUserStyle
                : userStyle
            }
            onClick={() => handleUserClick(user)}
          >
            {user.email}
          </div>
        ))}
      </div>
      <div style={chatAreaStyle}>
        {selectedUser && (
          <>
            <div style={headerStyle}>
              <h2>Chat with {selectedUser.email}</h2>
            </div>
            <div style={bodyStyle}>
              <div style={messageListStyle}>
                {messages.map((msg, index) => (
                  <div key={index} style={messageStyle(msg.from)}>
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>
            <div style={footerStyle}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                style={inputStyle}
              />
              <button onClick={handleSendMessage} style={buttonStyle}>
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessenger;
