const express = require("express");
const router = express.Router();
const db = require("../utils/Database")

router.get("/hotel",(req,res) => {
    let locationID = req.query.locationID;
    let hotel_query = `select * from hotels where locationID = ?`;
    // console.log(locationID);

    db.query(hotel_query,[locationID],(err,result) => {
        if(err) throw err;

        else{
            res.send({hotel:result});
        }
    })
})

module.exports = router;