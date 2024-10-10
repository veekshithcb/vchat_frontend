
import axios from "axios";
import React, { useState } from 'react';
import "./Search.css";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";


const Search= ({chatUsers, setChatUsers ,searchUsers , setSearchUsers  , setSelectedUserId}) => {



  return (
    <div className="search-bar-container">
      <SearchBar setSearchUsers ={setSearchUsers}/>
      <SearchResultsList  className="searchResult"  chatUsers={chatUsers} searchUsers = {searchUsers}    setChatUsers = {setChatUsers}  setSelectedUserId={setSelectedUserId}  setSearchUsers ={setSearchUsers}   />
    </div>
  )
}

export default Search