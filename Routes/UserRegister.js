const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../utils/Database");

// Endpoint to fetch all existing users
router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUsersQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
        db.query(existingUsersQuery, [username, email], async (error, results) => {
            if (error) {
                console.error("Error checking existing users:", error);
                return res.status(500).send({ error: "Internal Server Error" });
            }

            if (results.length > 0) {
                const existingUser = results[0];
                if (existingUser.username === username) {
                    return res.status(400).send({ error: "Username already taken" });
                } else if (existingUser.email === email) {
                    return res.status(400).send({ error: "Email already registered" });
                }
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user
            const insertUserQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            db.query(insertUserQuery, [username, email, hashedPassword], (error, result) => {
                if (error) {
                    console.error("Error registering user:", error);
                    return res.status(500).send({ error: "Internal Server Error" });
                } else {
                    return res.status(201).send({ error: "User registered successfully" });
                }
            });
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
