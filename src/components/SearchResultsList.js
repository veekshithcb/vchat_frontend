
import axios from "axios";
import React, { useState } from 'react';
import "./SearchResultsList.css";
import SearchResult from "./SearchResult";

const SearchResultsList = ({ chatUsers ,searchUsers , setChatUsers , setSelectedUserId  , setSearchUsers}) => {

  return (
    <div className="results-list">
      {searchUsers.map((result, id) => {
        return <SearchResult result={result} chatUsers={chatUsers} searchUsers={searchUsers} setChatUsers={setChatUsers}   setSelectedUserId={setSelectedUserId}  setSearchUsers = {setSearchUsers} key={id} />;
      })}
 
    </div>
  );
}

export default SearchResultsList