const express = require("express");
const router = express.Router();
const db = require("../utils/Database")

router.get("/",(req,res) => {
    let id = req.query.locationID;
    let sql = `select * from categories where categoryID in (select categoryID from categories_location where locationID = ?)  `;

    db.query(sql,[id],(err,result) => {
        if(err) throw err;

        else{
            res.status(200).send({categories:result});
        }
    })
})

module.exports = router;