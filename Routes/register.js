const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../utils/Database");

// Endpoint to fetch all existing users
router.get("/users", (req, res) => {
    const getUsersQuery = "SELECT username, email FROM users";
    db.query(getUsersQuery, (error, results) => {
        if (error) {
            console.error("Error fetching existing users:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(200).json(results);
        }
    });
});

router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUsers = await new Promise((resolve, reject) => {
            db.query("SELECT username, email FROM users", (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        const isUsernameTaken = existingUsers.some(user => user.username === username);
        const isEmailTaken = existingUsers.some(user => user.email === email);
        if (isUsernameTaken) {
            return res.status(400).send({ error: "Username already taken" });
        }
        if (isEmailTaken) {
            return res.status(400).send({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUserQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(insertUserQuery, [username, email, hashedPassword], (error, result) => {
            if (error) {
                console.error("Error registering user:", error);
                res.status(500).send({ error: "Internal Server Error" });
            } else {
                res.status(201).send({ message: "User registered successfully" });
            }
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

module.exports = router;
