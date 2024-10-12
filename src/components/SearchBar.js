
import axios from "axios";
import React, { useState } from 'react';
import "./SearchBar.css";
import config from "./backendConfig.json";

import { FaSearch } from "react-icons/fa";

const SearchBar = ({setSearchUsers}) => {


 const [input , setInput] = useState("")

 const fetchData=(value)=>{
    fetch(`${config.domain}${config.port}/user?name=${value}`)
    .then((response) =>response.json())
    .then((json) =>{
      setSearchUsers(json);
    })
 }

 const handleChange =(value) =>{
  setInput(value);
  fetchData(value)
 }

  return (

      <div className="input-wrapper">
        <FaSearch id = "search-icon"/>
        <input placeholder="type to search user"
         value={input}
          onChange={(e)=>handleChange(e.target.value)}/>
      </div>
   


  )
}

export default SearchBar