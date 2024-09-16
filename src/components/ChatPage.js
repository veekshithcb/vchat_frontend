import "./ChatPage.css";
import React, { useEffect, useState, useRef } from 'react';
import Cookie from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";
import { Box, Grid, Paper, Button } from "@mui/material";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from "axios";

import img from "../img/user_icon.png"









function ChatPage() {

    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [selectedUserId, setSelectedUserId] = useState('girish');
    const [selectedUserMessages, setSelectedUserMessages] = useState([{}]);
    const [unsentMessage, setUnsentMessage] = useState('');
    const [users, setUsers] = useState([]);
    const scrollRef = useRef(null);


    // cookie.set("user", "Da Cookie Monster User", {
    //   sameSite: "none",
    //   secure: true
    // });


    let stompClient = null;
    var cookie = new Cookie();

    // const jwtToken = cookie.get("token");

    // if (!jwtToken) {
    //     navigate('/login111')
    // }

    useEffect(() => {

        connect();
        getUsers();
        fetchSelectedUserChat();
    }, []);


    useEffect(() => {
        fetchSelectedUserChat();
    }, [selectedUserId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [selectedUserMessages]);



    function connect() {
        let Sock = new SockJS('http://localhost:8088/ws');
       
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);

    }

    async function getUsers() {
        try {
            const response = await fetch('http://localhost:8088/users'); // Replace with your API endpoint
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function onConnected() {
        stompClient.subscribe(`/user/${username}/queue/messages`, onMessageReceived);
        stompClient.subscribe(`/user/public`, onMessageReceived);

        // stompClient.send("/app/user.addUser",
        //     {},
        //     JSON.stringify({ nickName: nickName, fullName: fullName, status: 'ONLINE' })
        // );

    }

    async function fetchSelectedUserChat() {
        const userChatResponse = await fetch(`http://localhost:8088/messages/${username}/${selectedUserId}`);
        const userChat = await userChatResponse.json();
        setSelectedUserMessages(userChat);
    }

    function onError() {
        return
    }

    function sendMessage() {

        const chatMessage = {
            senderId: username,
            recipientId: selectedUserId,
            content: "messageContent",
            timestamp: new Date()
        };

        stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
        // try {
            
        // } catch (error) {
        //     console.log("error in stomp")
        // }
        
        setUnsentMessage('')
    }


    async function onMessageReceived(payload) {
        const message = JSON.parse(payload.body);
        console.log(message)
        setSelectedUserMessages(prevArray => [...prevArray, message]);
    }

    function displaySentMessage(message) {
        const obj = {
            "senderId": username,
            "recipientId": selectedUserId,
            "content": message,
            "type": null,
            "timestamp": new Date()
        };
        console.log(message)
        setSelectedUserMessages(prevArray => [...prevArray, obj]);
    }

    async function onLogout() {
        try {
            stompClient.send("http://localhost:8088/app/user.disconnectUser",
                {},
                JSON.stringify({ username: username,  status: 'OFFLINE' })
            );
        } catch (error) {
        }
        localStorage.clear();
        navigate('/login');
    }

    if (!username) {
        return navigate('/login');
    }

    return (


        <Box class="chat-container " id="chat-page">

            <Grid class="users-list">
                <Grid class="users-list-container">
                    <h2>Online Users</h2>
                    <ul id="connectedUsers">
                        {
                            users && users.map && users.map(user =>
                                <div class="user-item">
                                    <img src={img} alt={user.username} ></img>
                                    <li id={"user.username"} onClick={(event) => {

                                        setSelectedUserId(user.username);


                                    }}   >{user.username}</li>

                                </div>
                            )
                        }
                    </ul>
                </Grid>
                <Grid>

                    <p id="connected-user-fullname">{localStorage.getItem('username')}</p>
                    <a class="logout" onClick={() => {
                        onLogout()
                    }} id="logout">Logout</a>
                </Grid>
            </Grid>

            <Grid class="chat-area">
                <div ref={scrollRef} class="chat-area" id="chat-messages">

                    {selectedUserMessages.map((user) =>
                        user.senderId == username ? (
                            <div class="sender message" >
                                <p>{user.content}</p>
                            </div>
                        ) : (
                            <div class="receiver message" >
                                <p>{user.content}</p>
                            </div>
                        )
                    )}

                </div>

                <form id="messageForm" className="messageForm" >
                    <div className="message-input">


                        <input
                            type="text" value={unsentMessage} id="message" placeholder="Type your message... " onChange={(e) => {
                                setUnsentMessage(e.target.value);
                                console.log(unsentMessage)
                            }}
                        />
                        <Button onClick={(e) => {
                            sendMessage()
                            // displaySentMessage(unsentMessage)
                            // console.log(unsentMessage)
                            // setUnsentMessage('')
                        }}>

                            Send
                        </Button>
                    
                    </div>
                </form>
            </Grid>
        </Box>

    )
}

export default ChatPage