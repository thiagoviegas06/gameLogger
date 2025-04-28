import { useState, useEffect } from 'react'
import './App.css'
import Account from './Account'
import Profile from './Profile';
import AddForm from './AddForm';
import CreateProfile from './CreateProfile';
import axios from "axios";

const backend = "http://localhost:8080/api";
const profileData = "http://localhost:8080/api/get-profile-data";

function App() {

  const fetchAPI = async () => {
    const response = await axios.get(backend); 
    console.log(response.data.fruits);
  }

  useEffect(()=>{
    fetchAPI();
  }, []);

  let status = false;
  let create = false;

  let currentHTML = <div>
    <Account status create/>
  </div>; 

  useEffect(()=>{

    if(create){
      currentHTML = <div>
        <CreateProfile></CreateProfile>
      </div>
    }
    
  }, [status]);


  let profileMenu = <div>
    
  </div>

  return (
      currentHTML
    )
}

export default App
