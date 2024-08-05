import "./ChatPage.css";
import React from "react";
import Cookie from "universal-cookie";
import { useHistory,Navigate,Link } from "react-router-dom";
import { Box, Grid, Paper } from "@mui/material";



function ChatPage() {
    var cookie = new Cookie();

    const socket = new WebSocket("ws://localhost:8080")

    const sessionId = cookie.get("JSESSIONID");

    if(!sessionId){
    
        return (
          <Navigate
            to={{
              pathname: "/"
            }}
          />
        );
      }

    // cookie.set("user", "Da Cookie Monster User", {
    //   sameSite: "none",
    //   secure: true
    // });


    function connect(event) {
        nickname = document.querySelector('#nickname').value.trim();
        fullname = document.querySelector('#fullname').value.trim();
    
        if (nickname && fullname) {
            usernamePage.classList.add('hidden');
            chatPage.classList.remove('hidden');
    
            const socket = new SockJS('/ws');
            stompClient = Stomp.over(socket);
    
            stompClient.connect({}, onConnected, onError);
        }
        event.preventDefault();
    }

    return (

        <Box class="chat-container " id="chat-page">
           
            <Grid class="users-list">
                <Grid class="users-list-container">
                    <h2>Online Users</h2>
                    <ul id="connectedUsers">
                    </ul>
                </Grid>
                <Grid>
                    <p id="connected-user-fullname"></p>
                    <Link class="logout" href="javascript:void(0)" id="logout">Logout</Link>
                </Grid>
            </Grid>

            <Grid class="chat-area">
                <Grid class="chat-area" id="chat-messages"></Grid>


                <form id="messageForm" name="messageForm" class="hidden">
                    <div class="message-input">
                        <input autocomplete="off" type="text" id="message" placeholder="Type your message... " required />
                    </div>
                </form>
            </Grid>
        </Box>

    )
}

export default ChatPage