
import axios from "axios";
import React, { useState } from 'react';
import "./SearchResult.css";

const SearchResult = ({ result,chatUsers, searchUsers ,setChatUsers, setSelectedUserId , setSearchUsers }) => {

  function addToChatUsers(result){


    if (!chatUsers.includes(result.username)) {  // Trim newString before comparison
      setChatUsers(prevStrings => [...prevStrings, result.username]);
      
    }

    // console.log(searchUsers.includes(result.username))
    // if(searchUsers.includes(result.username)==false)
    // setChatUsers(prevArray => [...prevArray, result.username]);
  }


  return (
    <div className="search-result"
      onClick={(e) => {
        addToChatUsers(result)
        setSelectedUserId(result.username)
        setSearchUsers([])
        console.log(searchUsers)
      }
      }

    >{result.username}</div>
  );
}


export default SearchResult