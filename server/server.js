const express = require('express');
const app = express();
const { Pool } = require('pg');
const port = 8080; 

const env = require("./env.json");

const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions)); 
app.use(express.json());  

const pool = new Pool(env);
pool.connect().then(function () {
  console.log(`Connected to database ${env.database}`);
});

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
  });

//api entry point

app.get("/api", (req, res) =>{
    res.json({fruits: ["apple", "banana", "orange"]})
});

//make sure that email does not exist already ---> if not check username does not exist 
app.post("/api-create", (req, res) => {
    const { email, username, password } = req.body;
    console.log("Received user data:", { email, username, password });
  
    // Simple check
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    res.status(200).json({ response: ["ok"] });
});


// need to check database to see if user exists and password is correct 
app.post("/api-login", (req, res) => {
    const {username, password} = req.body;
    console.log("Received user data:", { username, password });
  
    // Simple check
    if (!username || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }
  
    res.status(200).json({ response: ["ok"] });
});

app.get("api")
  

app.listen(port, () =>{
    console.log("Server started on port 8080");
});