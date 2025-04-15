import React, { useEffect } from "react";
import { useState, useRef } from "react";
import "./Account.css"; 
import axios from "axios";

const loginApi = "http://localhost:8080/api-login";

interface AccountProps {
    func: (email: string, username: string, password: string, create: boolean) => void;
}

function Account(AccountProps : AccountProps) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");
    const [createBool, setCreateBool] = useState(false);
    const messageRef = useRef<HTMLInputElement>(null);
    
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const [titleOfPage, setTitle] = useState("Welcome to GameLog");

    const handleSubmit = (e: React.FormEvent) => {
        event?.preventDefault();
        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("Confirmed Password: ", passwordConfirmed);
    
    }

    function validatePassword(comfirmedPass : string) {
        return password === comfirmedPass;
    }

    function assignValues(){
        AccountProps.func(email, username, password, createBool);
        console.log("Values assigned: ", email, username, password, passwordConfirmed, createBool);
    }

    function createAccountSubmit(){
        if(validatePassword(passwordConfirmed)){
            let size = password.length;
            if(size < 8){
                if (messageRef.current) {
                    messageRef.current.innerText = "Password must be at least 8 characters long!";
                }
            } else {
                if (messageRef.current) {
                    setCreateBool(true);
                    messageRef.current.innerText = "Password is valid!";
                    assignValues();
                }
            }
        } else {
            if (messageRef.current) {
                messageRef.current.innerText = "Passwords do not match!";
            }
        }
    }

    function createHandler(){
      setCreateBool(true); 
      setShowCreateForm(true);
      setShowButtons(false);
      setTitle("Create Account");

    }

    function logInHandler(){
      setShowLoginForm(true);
      setShowButtons(false);
      setTitle("Log In");
    }

    function loginSubmissionHandler(){
      AccountProps.func("email", username, password, false);
      console.log("User Logging in");
     
    }

    async function sendLogInData(){
      try{

        //finish 
        //const response = axios.post(loginApi, )
      }catch{

      }
    }

    function setMain(login: boolean){
      setTitle("Welcome to GameLog");
      setShowButtons(true);
      if(login){
        setShowLoginForm(false);
      }else{
        setShowCreateForm(false);
      }
    }

    useEffect(() => {
      if(showLoginForm || showCreateForm){
        if(messageRef.current){
          messageRef.current.innerText = "";
        }
      }
    }, [showLoginForm, showCreateForm]);
    
    
  return (
    <div>
      <h1 id="title">{titleOfPage}</h1>
      {showButtons && 
      <div id ="buttons">
        <button onClick={createHandler} >
          Create Account
        </button>
        <button onClick={logInHandler} >
          Log in
        </button>
      </div>
      }
      {
        showCreateForm && 
        <form onSubmit={handleSubmit} className="form">
          <label>
            Email:
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <br />
          <label>
            Username:
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <br />
          <label>
            Confirm Password:
            <input type="password" name="passwordConfirmed" value={passwordConfirmed} onChange={(e) =>setPasswordConfirmed(e.target.value)} />
          </label>
          <br />
          <div id="buttons">
            <button type="submit" onClick={createAccountSubmit}>Submit</button> 
            <button onClick={() => setMain(false)}>Back</button>
          </div>
          
        </form>

      } 
      {showLoginForm && 
        <form className="form">
          <label>
            Username:
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <br />
          <div id="buttons">
            <button type="submit" onClick={loginSubmissionHandler}>Submit</button> 
            <button onClick={() => setMain(true)}>Back</button>
          </div>
        </form>

      }
      <h4 ref={messageRef} color="red"></h4>
    </div>
  );
}

export default Account;