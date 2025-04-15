const express = require('express');
const app = express();
const pool = require('pg'); 
const port = 8080; 

const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions)); 
app.use(express.json());  

//api entry point

app.get("/api", (req, res) =>{
    res.json({fruits: ["apple", "banana", "orange"]})
});

app.post("/api-sendUserData", (req, res) => {
    const { email, username, password, passwordConfirmed } = req.body;
  
    console.log("Received user data:", { email, username });
  
    // Simple check
    if (!email || !username || !password || !passwordConfirmed) {
      return res.status(400).json({ error: "Missing fields" });
    }
  
    res.status(200).json({ response: ["ok"] });
});

app.post("/api-login", (req, res) => {

});
  

app.listen(port, () =>{
    console.log("Server started on port 8080");
});