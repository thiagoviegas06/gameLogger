
import { useState, useEffect, JSX } from 'react'
import './App.css'
import Account from './Account'
import Profile from './Profile';
import AddForm from './AddForm';

function App() {
  const [userData, setUserData] = useState<{
    email: string;
    username: string;
    password: string;
    passwordConfirmed: string;
  } | null>(null);

  const [submittedAccount, setSubmittedAccount] = useState(false);
  const [currentHTML, setCurrentHTML] = useState<JSX.Element>(
    <Account func={handleUserData} />
  );
  

  function handleUserData(email: string, username: string, password: string, passwordConfirmed: string, submmission: boolean) {
    setUserData({
      email,
      username,
      password,
      passwordConfirmed
    });

    setSubmittedAccount(submmission);

    return void 0; // Explicitly return void to indicate no value is returned
  }

  useEffect(() => {
    console.log("User Data Updated:");
    if (submittedAccount && userData) {
      // Here you can handle the submitted account data, e.g., send it to a server
      console.log("Submitted Account Data:", userData);
      setCurrentHTML(
        <div>
          <Profile username={userData.username} profilePicture="joel.webp" bio="This is a placeholder bio." />
          <AddForm />
        </div>
      );
      
    }
  },[userData]);

  return (
    currentHTML
    )
}

export default App
