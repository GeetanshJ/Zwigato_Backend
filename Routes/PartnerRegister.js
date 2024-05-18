const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../utils/Database");



router.post("/", async (req, res) => {
    try {
        const { owner,password } = req.body;

        const existingUsers = await new Promise((resolve, reject) => {
            db.query(`SELECT * from partners `, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }

            });
        });

        const isUsernameTaken = existingUsers.some(user => {

            const isOwnerMatch = user.hotel_owner === owner;
            return isOwnerMatch ;
        });
        
                if (isUsernameTaken) {
            return res.status(400).send({ error: "Username already taken" });
        }
    

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUserQuery = "INSERT INTO partners (hotel_owner,password) VALUES ( ?,?)";
        db.query(insertUserQuery, [owner,hashedPassword], (error, result) => {
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
