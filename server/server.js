const express = require('express');
const app = express();
const { Pool } = require('pg');
const { Resend } = require('resend');
const port = 8080; 

const env = require("./env.json");
const crypto = require('crypto');

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

app.post("/api-create", async (req, res) => {
  const { email, username, password } = req.body;
  console.log("----- create ===== Received user data:", { email, username, password });

  if (!email || !username || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const check = "SELECT 1 FROM users WHERE username = $1";
    const checkParams = [username];
    const checkResult = await pool.query(check, checkParams);

    if (checkResult.rowCount !== 0) {
      return res.status(500).json({ error: "User already exists" });
    }

    const text = "INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING user_id";
    const params = [email, username, password];
    const result = await pool.query(text, params);

    const user_id = result.rows[0].user_id;
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const status = await insertIntoVerify(user_id, verificationToken);

    if (status) {
      let verify = `http://localhost:8080/verify?token=${verificationToken}`;
      await sendUserVerificationEmail(email, verify);

      res.status(200).json({
        response: ["ok"],
      });
    } else {
      res.status(500).json({ error: "Verification DB error" });
    }

  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function insertIntoVerify(user_id, token) {
  const verifyText = 'INSERT INTO verifications (user_id, verification_token) VALUES ($1, $2)';
  const parameters = [user_id, token];
  try {
    await pool.query(verifyText, parameters);
    console.log("insertion into verify made");

    return true;
  } catch (err) {
    console.error("Error inserting verification token", err.stack);
    return false;
  }
}

async function sendUserVerificationEmail(email, link) {
  const resend = new Resend('your_resend_api_key');
  try {
    await resend.emails.send({
      from: 'GameLogger <gameloggerverify@gmail.com>',
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Click <a href="${link}">here</a> to verify your account!</p>`,
    });
    console.log("email sent"); 
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw new Error('Failed to send verification email.');
  }
}

app.post("/api-set-up-profile", (req, res) => {

});

app.get("/verify", async (req, res) => {
  const token = req.query.token;
  const text = "SELECT * FROM verifications WHERE verification_token = $1";

  try {
    const result = await pool.query(text, [token]);

    if (result.rowCount === 0) {
      return res.send(`
        <div>
          <h1>User already verified or user does not exist</h1>
        </div>
      `);
    }

    const userID = result.rows[0].user_id;

    await userVerified(token, userID);

    return res.send(`
      <div>
        <h1>Email verified successfully!</h1>
      </div>
    `);

  } catch (err) {
    console.error("Verification error:", err);
    return res.status(500).send(`
      <div>
        <h1>Internal server error during verification.</h1>
      </div>
    `);
  }
});

async function userVerified(token, userID) {
  const deleteQuery = "DELETE FROM verifications WHERE verification_token = $1";
  const updateQuery = "UPDATE users SET verified = TRUE WHERE user_id = $1";

  await pool.query(deleteQuery, [token]);
  await pool.query(updateQuery, [userID]);
}




app.listen(port, () =>{
    console.log("Server started on port 8080");
});