import React from "react";
import { useState, useRef } from "react";
import "./Account.css"; 

interface AccountProps {
    func: (email: string, username: string, password: string, passwordConfirmed: string, submit: boolean) => void;
}

function Account(AccountProps : AccountProps) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");
    const messageRef = useRef<HTMLInputElement>(null);

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
        AccountProps.func(email, username, password, passwordConfirmed, true);
        console.log("Values assigned: ", email, username, password, passwordConfirmed);
    }

    function buttonEventHandler(){
        if(validatePassword(passwordConfirmed)){
            let size = password.length;
            if(size < 8){
                if (messageRef.current) {
                    messageRef.current.innerText = "Password must be at least 8 characters long!";
                }
            } else {
                if (messageRef.current) {
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

  return (
    <div>
      <h1 id="title">Welcome to GameLog</h1>
      <form onSubmit={handleSubmit} id="form">
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
        <button type="submit" onClick={buttonEventHandler}>Submit</button>
      </form>
      <h4 ref={messageRef} color="red"></h4>
    </div>
  );
}

export default Account;