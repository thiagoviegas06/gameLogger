import { useState, useEffect } from 'react'
import './App.css'
import Account from './Account'
import axios from "axios";

const backend = "http://localhost:8080/api";
const send = "http://localhost:8080/api-sendUserData";

function App() {
  const [userData, setUserData] = useState<{
    email: string;
    username: string;
    password: string;
    create: boolean;
  } | null>(null);


  const fetchAPI = async () => {
    const response = await axios.get(backend); 
    console.log(response.data.fruits);
  }

  useEffect(()=>{
    fetchAPI();
  }, []);


  async function sendUserData (){
    try{
      const response = await axios.post(send, userData);
      console.log(response.data);
    } catch(error){
      console.log("send error");
    }
  }
  
  useEffect(() => {
    //making sure it doesnt send when it is null
    if(userData){
      console.log(userData);
      sendUserData();
    }
  }, [userData])

  const [submittedAccount, setSubmittedAccount] = useState(false);


  function handleUserData(email: string, username: string, password: string, create: boolean) {
    setUserData({
      email,
      username,
      password,
      create
    });

    setSubmittedAccount(true);

    return void 0; // Explicitly return void to indicate no value is returned
  }

  useEffect(() => {
    console.log("User Data Updated:");
    if (userData && submittedAccount) {
      // Here you can handle the submitted account data, e.g., send it to a server
      console.log("Submitted Account Data:", userData);
    }
  },[userData]);

  return (
    <Account func={handleUserData} />
    )
}

export default App
