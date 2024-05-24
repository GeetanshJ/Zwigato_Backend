const express = require("express");
const router = express.Router();
const db = require("../utils/Database")
const bcrypt = require("bcrypt")

router.post("/",(req,res) => {
    const {username,password} = req.body;

    try {
        const query = "SELECT * FROM users WHERE username = ?";
        db.query(query, [username], async (err, result) => {

            if (result.length === 0) {
                return res.status(404).send({ error: "User not found" });
            }

            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).send({ error: "Incorrect password" });
            }

            res.status(200).send({ login:user });
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
})

module.exports = router;