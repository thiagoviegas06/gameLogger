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


// need to check database to see if user exists and password is correct 
app.post("/api-login", (req, res) => {
    const {username, password} = req.body;
    console.log("Received user data:", { username, password });
  
    // Simple check
    if (!username || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }
    
    const text = "SELECT * FROM users WHERE username = $1 AND password_hash = $2";
    const params = [username, password];

    console.log("Executing query:", text, params);

    pool.query(text, params)
        .then(result => {
            console.log("Query result:", result);
            if (result.rows.length > 0) {
                console.log("User found:", result.rows[0]);
                res.status(200).json({ response: ["ok"] });
            } else {
                console.log("User not found");
                res.status(401).json({ error: "Invalid username or password" });
            }
        })
        .catch(err => {
            console.error("Error executing query", err.stack);
            res.status(500).json({ error: "Internal server error" });
        });
  
});

app.post("/api-create", (req, res) => {
    const { email, username, password } = req.body;
    console.log("----- create =====Received user data:", { email, username, password });
  
    // Simple check
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const text = "INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3)";
    const params = [email, username, password];
    pool.query(text, params)
        .then(result => {
          console.log("Query result:", result);
          console.log("User created:", result);
          res.status(200).json({ response: ["ok"] });
        })
        .catch(err => {
          console.error("Error executing query", err.stack);
          res.status(500).json({ error: "Internal server error" });
        });

  }
);
  

app.listen(port, () =>{
    console.log("Server started on port 8080");
});