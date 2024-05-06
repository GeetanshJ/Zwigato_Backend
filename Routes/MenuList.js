// routes/MenuList.js

const express = require("express");
const router = express.Router();
const db = require("../utils/Database");

router.get('/:hotelID', (req, res) => {
    let hotelID = req.params.hotelID;
    console.log(hotelID);
    let menu_query = `SELECT * FROM menuList WHERE hotelID = ?`;

    db.query(menu_query, [hotelID], (err, result) => {
        if (err) {
            console.error("Error fetching menu:", err);
            res.status(500).json({ error: "Error fetching menu" });
        } else {
            res.json({ menu: result });
        }
    });
});

module.exports = router;
