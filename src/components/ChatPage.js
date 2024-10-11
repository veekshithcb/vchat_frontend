import "./ChatPage.css";
import React, { useEffect, useState, useRef } from 'react';
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { Button, Grid, CircularProgress, Stack, Box, TextField } from "@mui/material";
import { over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from 'stompjs';
import Search from "./Search";

import img from "../img/user_icon.png"
import Header from "./Header";
import axios from "axios";

import config from "./backendConfig.json";


// import axios from 'axios';

// // Set the Authorization token globally
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

function ChatPage() {

    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('token'); // Get JWT token

    if (token) {
        console.log("Token exists:", token);
        // Proceed with token-based logic
    } else {
        console.warn("Token is missing or null");
        // Handle missing token (e.g., redirect to login or show an alert)
        window.location.href = "/login";  // Example: redirect to login
    }

    const jwtDecoded = jwtDecode(token);

    const navigate = useNavigate();
    const [username, setUsername] = useState(jwtDecoded.sub);
    const [selectedUserId, setSelectedUserId] = useState(username);
    let selectedUserIdRef = useRef(username);
    const [selectedUserMessages, setSelectedUserMessages] = useState([{}]);
    const [unsentMessage, setUnsentMessage] = useState('');

    const [chatUsers, setChatUsers] = useState([username]);

    const [searchUsers, setSearchUsers] = useState([]);

    const [newMessageFromUser, setNewMessageFromUser] = useState([]);

    const scrollRef = useRef(null);

    let stompClient = useRef(null);


    const handleMessageChange = (e) => {
        setUnsentMessage(e.target.value)
    };

    useEffect(() => {
        getUsers();
        connect();

    }, []);

    // useEffect(() => {

    // }, [users]);

    useEffect(() => {
        if (selectedUserId) {
            fetchSelectedUserChat();
        }
    }, [selectedUserId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [selectedUserMessages]);




    // let updateUserMessages = (newMsgfrom) => {
    //     setNewMessage(user => {
    //         if (!user.includes(newMsgfrom)) {
    //             return [...newMessage, newMsgfrom];  // Return a new array with the added user
    //         }
    //         return newMessage;  // If already exists, return the previous state
    //     });
    //     console.log(newMessage  +"new msg from")
    // };

    let updateUserMessages = (sender) => {
        setNewMessageFromUser(prevChatUsers => {
            if (!prevChatUsers.includes(sender) && sender != selectedUserIdRef.current) {
                return [...prevChatUsers, sender];  // Return a new array with the added user
            }
            return prevChatUsers;  // If already exists, return the previous state
        });
    };




    const updateSelectedUserId = (newId) => {
        setSelectedUserId((prevUserId) => {
            // console.log("Previous userId:", prevUserId); // Old value
            return newId; // Return the new value
        });
        selectedUserIdRef.current = newId;
    };



    function connect() {
        var socket = new SockJS(   `${config.domain}${config.port}/ws`)
        // const socket = new SockJS('http://localhost:8080/ws?token=' + token);
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, onConnected, onError);
        // stompClient.current.connect({ Authorization: `Bearer ${token}` }, onConnected, onError);
    }

    function sendMessage() {
        const chatMessage = {
            senderId: username,
            recipientId: selectedUserId,
            content: unsentMessage,
            timestamp: new Date()
        };
        stompClient.current.send("/app/chat", { Authorization: `Bearer ${token}` }, JSON.stringify(chatMessage));
    }



    function handleSendMessage() {
        sendMessage()

        displaySentMessage()

    }

    function displaySentMessage() {

        let message =
        {
            "chatId": username + "_" + selectedUserId,
            "senderId": username,
            "recipientId": selectedUserId,
            "content": unsentMessage,
            "timestamp": new Date()
        }

        if (username != selectedUserId) {
            setSelectedUserMessages(prevArray => [...prevArray, message]);
        }

        setUnsentMessage('')
    }

    async function getUsers() {
        // try {
        //     const response = await fetch('http://localhost:8088/users', {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': `Bearer ${token}` // Add the token to the Authorization header
        //         }
        //     });

        //     const data = await response.json();
        //     setUsers(data);
        //     console.log(response.data); // Handle response data
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }

    }

    function onConnected() {
        stompClient.current.subscribe(`/user/${username}/queue/messages`, onMessageReceived);
        // stompClient.current.subscribe(`/user/public`, newUserJoined);
        // stompClient.current.subscribe(`/user/public/userjoined`, newUserJoined);
        // stompClient.current.subscribe(`/user/public/userjoined/eee`, newUserJoined);
        makeUserOnline()
    }

    function makeUserOnline() {
        stompClient.current.send("/app/user.addUser",
            {},
            JSON.stringify({ "nickName": "veekshith", "fullName": "veekshith", "status": "ONLINE" })
        );

    }

    async function fetchSelectedUserChat() {
        try {
            const userChatResponse = await fetch(`${config.domain}${config.port}/messages/${username}/${selectedUserId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Add the token to the Authorization header
                }
            });
            const userChat = await userChatResponse.json();
            setSelectedUserMessages(userChat);
            // const userChatResponse = await fetch(`http://localhost:8088/messages/${username}/${selectedUserId}`);
            // const userChat = await userChatResponse.json();
            // setSelectedUserMessages(userChat);
        } catch (error) {
        }

    }

    const onError = (error) => {
        console.log(error);
    };

    function onMessageReceived(payload) {
        console.log("on msg recieved called")
        const message = JSON.parse(payload.body);
        console.log(message)

        if (selectedUserIdRef.current == message.senderId) {
            setSelectedUserMessages(prevArray => [...prevArray, message]);
        }

        const sender = message.senderId;


        updateUserMessages(sender);

        updateChatUserOnMsg(sender)

    }



    let updateChatUserOnMsg = (sender) => {
        setChatUsers(prevChatUsers => {
            if (!prevChatUsers.includes(sender) && sender != selectedUserId) {
                return [...prevChatUsers, sender];  // Return a new array with the added user
            }
            return prevChatUsers;  // If already exists, return the previous state
        });
    };

    // let removeStringFromArray = (arr  , str) => {
    //     const indexToRemove = arr.indexOf(str);
    //     if (indexToRemove !== -1) {
    //         arr.splice(indexToRemove, 1); // Remove 1 element at the found index
    //     }
    // }

    const removeStringFromArray = (array, stringToRemove) => {
        setNewMessageFromUser(array.filter(str => str !== stringToRemove));
    };













    async function onLogout() {
        try {
            stompClient.current.send(`${config.domain}${config.port}/app/user.disconnectUser`,
                {},
                JSON.stringify({ username: username, status: 'OFFLINE' })
            );
            localStorage.clear();
            cookies.remove('token', { path: '/' });
            cookies.remove('access_token', { path: '/' });
            cookies.remove('refresh_token', { path: '/' });
            cookies.remove('id_token', { path: '/' });


            cookies.remove('ACCOUNT_CHOOSER', { path: 'accounts.google.com/' });
            cookies.remove('JSESSIONID', { path: '/' });
            cookies.remove('sid', { path: '/' });
            cookies.remove('ssid', { path: '/' });

            cookies.remove('ACCOUNT_CHOOSER', { path: '/' });
            cookies.remove('JSESSIONID', { path: '/' });
            cookies.remove('sid', { path: '/' });
            cookies.remove('ssid', { path: '/' });

            

            // If your OAuth provider uses session cookies, remove them too
            cookies.remove('JSESSIONID', { path: '/' });
        } catch (error) {
        }

        localStorage.clear();
        navigate('/login');
    }

    if (!token) {
        return navigate('/login');
    }

    return (
        <>
            <Box className="chat-container" id="chat-page">
                <Grid class="users-list">

                    <Grid className="users-list-container">
                        <Search chatUsers={chatUsers} setChatUsers={setChatUsers} searchUsers={searchUsers} setSearchUsers={setSearchUsers} setSelectedUserId={setSelectedUserId}></Search>
                        <h2>Chat</h2>

                        <ul id="connectedUsers">
                            {chatUsers.map((user, id) => (
                                <><div className={`user-item   ${selectedUserId == user ? 'active' : ''}`} key={id}>
                                    <img src={img} alt={user} />
                                    <li
                                        onClick={() => {
                                            updateSelectedUserId(user);
                                            console.log(selectedUserId); // log user.username directly instead of state

                                            removeStringFromArray(newMessageFromUser, user);

                                        }}
                                    >
                                        {user} {user == username ? "(You)" : ""}
                                    </li>
                                    <span className={newMessageFromUser.includes(user) ? 'green-dot' : ''}> </span>
                                </div>

                                </>
                            ))}
                        </ul>
                    </Grid>
                    <Grid>
                        <p id="connected-user-fullname">
                            {username}
                        </p>
                        <a
                            className="logout"
                            onClick={() => onLogout()}
                            id="logout"
                        >
                            Logout
                        </a>
                    </Grid>
                </Grid>

                <Grid class="chat-area">
                    <div ref={scrollRef} class="chat-area" id="chat-messages">
                        {selectedUserMessages.map(user => user.senderId === username ? (
                            <div className="sender message" key={user.id}>
                                <p>{user.content}</p>
                            </div>
                        ) : (
                            <div className="receiver message" key={user.id}>
                                <p>{user.content}</p>
                            </div>
                        )
                        )}
                    </div>
                    <div className="message-input ">
                        <TextField
                            id="message"
                            label="message"
                            variant="outlined"
                            name="message"
                            placeholder="Type your message..."
                            value={unsentMessage}
                            fullWidth
                            onChange={handleMessageChange} />
                        <Button className="message-input-button " onClick={handleSendMessage}
                            disabled={unsentMessage === ''}>
                            Send
                        </Button>
                    </div>
                </Grid>
            </Box>
        </>
    );

}

export default ChatPage